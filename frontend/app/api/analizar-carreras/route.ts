// Coloca este archivo en: app/api/analizar-carreras/route.ts
// (crea la carpeta app/api/analizar-carreras/ si no existe)

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { intereses, carreras } = body;

    if (!intereses || intereses.length === 0) {
      return NextResponse.json({ error: "No se enviaron intereses" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY no está definida en las variables de entorno");
      return NextResponse.json({ error: "API key no configurada" }, { status: 500 });
    }

    // Prompt más corto: solo id, title y skills para no exceder tokens
    const listaCorta = (carreras as { id: string; title: string; skills: string[] }[])
      .map((c) => `${c.id}: ${c.title} (${c.skills.slice(0, 4).join(", ")})`)
      .join("\n");

    const prompt = `Eres un orientador vocacional. El estudiante le gustan: ${intereses.join(", ")}.

Carreras disponibles en la UTP:
${listaCorta}

Devuelve las 5 carreras más compatibles con los intereses del estudiante.
Responde ÚNICAMENTE con un array JSON válido, sin texto extra, sin markdown:
[{"id":"id_exacto","porcentaje":85,"razon":"Una oración breve en español"},...]`;

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_tokens: 600,
        messages: [
          {
            role: "system",
            content: "Eres un orientador vocacional. Responde SOLO con JSON válido, sin explicaciones ni markdown.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    const groqText = await groqRes.text();

    if (!groqRes.ok) {
      console.error("Groq respondió con error:", groqRes.status, groqText);
      return NextResponse.json(
        { error: `Groq error ${groqRes.status}: ${groqText}` },
        { status: 500 }
      );
    }

    const groqData = JSON.parse(groqText);
    const raw = groqData.choices?.[0]?.message?.content ?? "";

    // Extrae el JSON aunque Groq ponga texto antes o después
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) {
      console.error("Respuesta de Groq no contiene JSON array:", raw);
      return NextResponse.json({ error: "Respuesta inesperada de la IA" }, { status: 500 });
    }

    const parsed = JSON.parse(match[0]);
    return NextResponse.json({ resultado: parsed });
  } catch (e) {
    console.error("Error inesperado en /api/analizar-carreras:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
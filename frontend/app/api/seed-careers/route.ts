import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { careers } from "@/lib/careers";

export async function GET() {
  try {
    const db = getAdminDb();
    const results: { id: string; status: string }[] = [];

    for (const c of careers) {
      try {
        await db.collection("Carreras").doc(c.id).set({
          title: c.title,
          area: c.area,
          emoji: c.emoji,
          color: c.color,
          lightBg: c.lightBg,
          description: c.description,
          salary: c.salary,
          salaryMin: c.salaryMin,
          skills: c.skills,
          skillRequirements: c.skillRequirements,
          dayInLife: c.dayInLife,
          universities: c.universities,
          outlook: c.outlook,
          duration: c.duration,
          nowDoing: c.nowDoing,
          scene: c.scene,
          tools: c.tools,
        });
        results.push({ id: c.id, status: "ok" });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`[seed] ${c.id}: ${msg}`);
        results.push({ id: c.id, status: msg });
      }
    }

    return NextResponse.json({ seeded: results.length, results });
  } catch (err: unknown) {
    const msg = err instanceof Error ? `${err.name}: ${err.message}\n${err.stack}` : String(err);
    console.error("[seed] FATAL:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

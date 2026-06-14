"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useTranslation } from "@/lib/i18n";

type Lab = {
  nameKey: string;
  descKey: string;
  img: string;
};

const BASE = "https://www.utp.edu.pe";

const LABS_BY_CAREER: Record<string, Lab[]> = {
  medicina: [
    {
      nameKey: "labs.medicina.hospitalSimulado.name",
      descKey: "labs.medicina.hospitalSimulado.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/HOSPITAL%20SIMULADO_1%202.jpg`,
    },
    {
      nameKey: "labs.medicina.labOrganizacion.name",
      descKey: "labs.medicina.labOrganizacion.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/LAB%20DE%20ORGANIZACI%C3%93N%20Y%20FUNCI%C3%93N%20DEL%20CUERPO%20HUMANO_1%202.jpg`,
    },
    {
      nameKey: "labs.medicina.salaSimulacion.name",
      descKey: "labs.medicina.salaSimulacion.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Sala%20de%20Simulaci%C3%B3n%20Compleja%20-%20%20Obestricia%201.jpg`,
    },
    {
      nameKey: "labs.medicina.salaDiseccion.name",
      descKey: "labs.medicina.salaDiseccion.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Saladedisecci%C3%B3nARyVR.webp`,
    },
  ],
  enfermeria: [
    {
<<<<<<< Updated upstream
      nameKey: "labs.arquitectura.tallerArquitectura.name",
      descKey: "labs.arquitectura.tallerArquitectura.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/TALLER%20DE%20ARQUITECTURA.jpg`,
    },
    {
      nameKey: "labs.arquitectura.salaBIM.name",
      descKey: "labs.arquitectura.salaBIM.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
=======
      name: "Hospital Simulado",
      desc: "Entorno innovador con simuladores avanzados para prácticas de enfermería y ciencias de la salud.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/HOSPITAL%20SIMULADO_1%202.jpg`,
    },
    {
      name: "Sala de Simulación Compleja Ginecobstetra",
      desc: "Espacio para practicar cuidado materno-infantil con simuladores reales de alta fidelidad.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Sala%20de%20Simulaci%C3%B3n%20Compleja%20-%20%20Obestricia%201.jpg`,
    },
    {
      name: "Lab. Organización y Función del Cuerpo Humano",
      desc: "Anatomía y fisiología con tecnología avanzada y disección virtual en 3D.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/LAB%20DE%20ORGANIZACI%C3%93N%20Y%20FUNCI%C3%93N%20DEL%20CUERPO%20HUMANO_1%202.jpg`,
    },
  ],
  odontologia: [
    {
      name: "Hospital Simulado",
      desc: "Entorno innovador con simuladores para prácticas odontológicas y diagnóstico bucal.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/HOSPITAL%20SIMULADO_1%202.jpg`,
    },
    {
      name: "Sala de Disección AR y VR",
      desc: "Realidad aumentada y virtual para el estudio detallado de la anatomía bucal.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Saladedisecci%C3%B3nARyVR.webp`,
    },
  ],
  obstetricia: [
    {
      name: "Sala de Simulación Compleja Ginecobstetra",
      desc: "Espacio para practicar ginecología, obstetricia y neonatología con simuladores reales de alta fidelidad.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Sala%20de%20Simulaci%C3%B3n%20Compleja%20-%20%20Obestricia%201.jpg`,
    },
    {
      name: "Hospital Simulado",
      desc: "Entorno innovador para la atención integral materno-infantil con simuladores avanzados.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/HOSPITAL%20SIMULADO_1%202.jpg`,
    },
  ],
  nutricion: [
    {
      name: "Laboratorio de Técnicas Dietéticas",
      desc: "Centro de innovación en seguridad alimentaria con tecnología avanzada para nutrición y dietética.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Laboratorio%20de%20Nutrici%C3%B3n%20y%20Diet%C3%A9tica%201.jpg`,
    },
    {
      name: "Laboratorio de Procesos Industriales",
      desc: "Entorno educativo con plantas de producción para el procesamiento y conservación de alimentos.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB%20DE%20PROCESOS%20INDUSTRIALES%203.jpg`,
    },
  ],
  psicologia: [
    {
      name: "Cámara Gesell",
      desc: "Sala diseñada para entrevistas psicológicas, evaluaciones clínicas e intervenciones terapéuticas.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20GESSEL%201.jpg`,
    },
    {
      name: "Sala Design Thinking",
      desc: "Espacio colaborativo para desarrollar soluciones innovadoras en salud mental y bienestar.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
  ],
  "psicologia-consumidor": [
    {
      name: "Cámara Gesell",
      desc: "Sala equipada para investigación del comportamiento del consumidor y estudios de mercado.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20GESSEL%201.jpg`,
    },
    {
      name: "Sala Design Thinking",
      desc: "Espacio colaborativo para desarrollar estrategias de marketing centradas en el consumidor.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para análisis de datos, investigación de mercados y segmentación de audiencias.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  veterinaria: [
    {
      name: "Hospital Simulado",
      desc: "Entorno con simuladores avanzados para diagnóstico y tratamiento de animales menores y mayores.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/HOSPITAL%20SIMULADO_1%202.jpg`,
    },
    {
      name: "Sala de Disección AR y VR",
      desc: "Tecnología de realidad aumentada y virtual para disección y estudio de anatomía animal.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Saladedisecci%C3%B3nARyVR.webp`,
    },
  ],
  "tecnologia-medica": [
    {
      name: "Hospital Simulado",
      desc: "Entorno con equipos de diagnóstico de última generación para la formación de tecnólogos médicos.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/HOSPITAL%20SIMULADO_1%202.jpg`,
    },
    {
      name: "Lab. Organización y Función del Cuerpo Humano",
      desc: "Espacio con tecnología avanzada y disección virtual en 3D para imágenes médicas.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/LAB%20DE%20ORGANIZACI%C3%93N%20Y%20FUNCI%C3%93N%20DEL%20CUERPO%20HUMANO_1%202.jpg`,
    },
  ],
  "ingenieria-biomedica": [
    {
      name: "Hospital Simulado",
      desc: "Entorno con equipos médicos avanzados para el diseño y prueba de dispositivos biomédicos.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/HOSPITAL%20SIMULADO_1%202.jpg`,
    },
    {
      name: "Laboratorio de Mecatrónica",
      desc: "Laboratorio multidisciplinario para el desarrollo de prótesis, dispositivos y sistemas médicos inteligentes.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
>>>>>>> Stashed changes
    },
  ],
  derecho: [
    {
      nameKey: "labs.derecho.salaAudiencias.name",
      descKey: "labs.derecho.salaAudiencias.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALADEAUDIENCIA%201.webp`,
    },
    {
      nameKey: "labs.derecho.salaDesignThinking.name",
      descKey: "labs.derecho.salaDesignThinking.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
  ],
  arquitectura: [
    {
<<<<<<< Updated upstream
      nameKey: "labs.gastronomia.labTecnicasDieteticas.name",
      descKey: "labs.gastronomia.labTecnicasDieteticas.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Laboratorio%20de%20Nutrici%C3%B3n%20y%20Diet%C3%A9tica%201.jpg`,
    },
    {
      nameKey: "labs.gastronomia.labProcesosIndustriales.name",
      descKey: "labs.gastronomia.labProcesosIndustriales.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB%20DE%20PROCESOS%20INDUSTRIALES%203.jpg`,
=======
      name: "Taller de Arquitectura",
      desc: "Ambiente especializado equipado para el diseño y realización de maquetas basadas en proyectos de clase.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/TALLER%20DE%20ARQUITECTURA.jpg`,
    },
    {
      name: "Sala BIM",
      desc: "Espacio con tecnología avanzada y modelos 3D para proyectos de construcción y diseño arquitectónico.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
>>>>>>> Stashed changes
    },
  ],
  "ingenieria-civil": [
    {
      nameKey: "labs.ingenieriaCivil.labConcretoSuelos.name",
      descKey: "labs.ingenieriaCivil.labConcretoSuelos.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Laboratorio%20de%20tecnolog%C3%ADa%20de%20concreto%20y%20resistencia%201.jpg`,
    },
    {
      nameKey: "labs.ingenieriaCivil.labHidraulica.name",
      descKey: "labs.ingenieriaCivil.labHidraulica.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20HIDR%C3%81ULICA%201.jpg`,
    },
    {
      nameKey: "labs.ingenieriaCivil.salaBIM.name",
      descKey: "labs.ingenieriaCivil.salaBIM.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
    },
  ],
  "ingenieria-minas": [
    {
      name: "Laboratorio de Procesos Industriales",
      desc: "Plantas de producción y procesamiento de minerales para prácticas de metalurgia extractiva.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB%20DE%20PROCESOS%20INDUSTRIALES%203.jpg`,
    },
    {
      name: "Sala BIM",
      desc: "Modelado 3D de operaciones mineras, tajo abierto y galerías subterráneas.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
    },
  ],
  "ingenieria-ambiental": [
    {
      name: "Laboratorio de Procesos Industriales",
      desc: "Plantas de tratamiento de aguas y procesos de remediación ambiental para prácticas sostenibles.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB%20DE%20PROCESOS%20INDUSTRIALES%203.jpg`,
    },
    {
      name: "Laboratorio de Mecatrónica",
      desc: "Sistemas de monitoreo ambiental automatizados con sensores y drones.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
    },
  ],
  "ingenieria-transporte": [
    {
      name: "Laboratorio Hidráulica",
      desc: "Estudio del comportamiento de fluidos en sistemas de drenaje y control de inundaciones.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20HIDR%C3%81ULICA%201.jpg`,
    },
    {
      name: "Sala BIM",
      desc: "Modelado de infraestructura vial, puentes y sistemas de transporte urbano.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
    },
  ],
  "ingenieria-electronica": [
    {
      name: "Laboratorio de Mecatrónica",
      desc: "Laboratorio para diseño de circuitos, sistemas embebidos y control electrónico avanzado.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambiente Apple para simulación de circuitos y diseño de PCB con software especializado.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  "ingenieria-mecanica": [
    {
      name: "Laboratorio de Mecatrónica",
      desc: "Laboratorio para diseño, simulación y prototipado de sistemas mecánicos avanzados.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
    },
    {
      name: "Laboratorio de Procesos Industriales",
      desc: "Plantas de producción y manufactura para prácticas de procesos mecánicos industriales.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB%20DE%20PROCESOS%20INDUSTRIALES%203.jpg`,
    },
  ],
  "ingenieria-mecatronica": [
    {
      name: "Laboratorio de Mecatrónica",
      desc: "Laboratorio multidisciplinario para el diseño y desarrollo de sistemas robóticos inteligentes.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para programación de robots, simulación y control embebido.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  "ingenieria-maritima": [
    {
      name: "Laboratorio Hidráulica",
      desc: "Estudio de dinámica de fluidos, olas y corrientes para diseño de infraestructura portuaria.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20HIDR%C3%81ULICA%201.jpg`,
    },
    {
      name: "Sala BIM",
      desc: "Modelado 3D de embarcaciones, puertos y estructuras marítimas.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
    },
  ],
  "ingenieria-naval": [
    {
      name: "Laboratorio Hidráulica",
      desc: "Simulación hidrodinámica de cascos de embarcaciones y estabilidad marítima.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20HIDR%C3%81ULICA%201.jpg`,
    },
    {
      name: "Sala BIM",
      desc: "Diseño asistido de buques, submarinos y estructuras oceánicas con tecnología 3D.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
    },
  ],
  "ingenieria-industrial": [
    {
      name: "Laboratorio de Procesos Industriales",
      desc: "Entorno educativo con plantas de producción para optimización de procesos industriales.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB%20DE%20PROCESOS%20INDUSTRIALES%203.jpg`,
    },
    {
      name: "Sala Design Thinking",
      desc: "Espacio colaborativo para innovación en mejora continua y gestión de calidad.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Laboratorio de Mecatrónica",
      desc: "Automatización industrial y robótica para lean manufacturing y optimización de producción.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
    },
  ],
  software: [
    {
      nameKey: "labs.software.salaMacs.name",
      descKey: "labs.software.salaMacs.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
    {
      nameKey: "labs.software.salaDesignThinking.name",
      descKey: "labs.software.salaDesignThinking.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
<<<<<<< Updated upstream
      nameKey: "labs.software.labMecatronica.name",
      descKey: "labs.software.labMecatronica.desc",
=======
      name: "Laboratorio de Mecatrónica",
      desc: "Laboratorio multidisciplinario para el desarrollo de software embebido y sistemas robóticos.",
>>>>>>> Stashed changes
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
    },
  ],
  "ciencia-computacion": [
    {
<<<<<<< Updated upstream
      nameKey: "labs.psicologia.camaraGesell.name",
      descKey: "labs.psicologia.camaraGesell.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20GESSEL%201.jpg`,
    },
    {
      nameKey: "labs.psicologia.salaDesignThinking.name",
      descKey: "labs.psicologia.salaDesignThinking.desc",
=======
      name: "Sala con Macs",
      desc: "Ambientes Apple para investigación en inteligencia artificial, machine learning y cómputo científico.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
    {
      name: "Sala Design Thinking",
      desc: "Espacio colaborativo para innovación en algoritmos y resolución de problemas complejos.",
>>>>>>> Stashed changes
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
  ],
  "ingenieria-ciberseguridad": [
    {
      name: "Sala con Macs",
      desc: "Ambiente para pruebas de penetración, análisis forense digital y seguridad en redes.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
    {
      name: "Laboratorio de Mecatrónica",
      desc: "Laboratorio para implementación de sistemas seguros de control y automatización.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
    },
  ],
  "ingenieria-sistemas-informacion": [
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para desarrollo de sistemas de información y gestión de bases de datos.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
    {
      name: "Sala Design Thinking",
      desc: "Espacio para diseño de soluciones tecnológicas centradas en el usuario empresarial.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
  ],
  "ingenieria-sistemas": [
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para administración de servidores, cloud computing y DevOps.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
    {
      name: "Sala Design Thinking",
      desc: "Espacio colaborativo para diseño de arquitecturas de sistemas empresariales.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
  ],
  "redes-telecomunicaciones": [
    {
      name: "Sala con Macs",
      desc: "Ambiente para simulación de redes, configuración de equipos Cisco y análisis de tráfico.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
    {
      name: "Laboratorio de Mecatrónica",
      desc: "Laboratorio para comunicaciones inalámbricas, IoT y sistemas de telecomunicaciones.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
    },
  ],
  administracion: [
    {
      name: "Sala Design Thinking",
      desc: "Espacio colaborativo para innovación empresarial y desarrollo de modelos de negocio.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para análisis de datos financieros, dashboards y business intelligence.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  contabilidad: [
    {
      name: "Sala Design Thinking",
      desc: "Espacio para innovación en procesos contables y soluciones financieras creativas.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para software contable, declaraciones tributarias y reporting financiero.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  economia: [
    {
      name: "Sala Design Thinking",
      desc: "Espacio para modelado económico y desarrollo de soluciones a problemas socioeconómicos.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para econometría, análisis de datos y modelos de proyección económica.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  marketing: [
    {
      nameKey: "labs.marketing.tallerAudiovisual.name",
      descKey: "labs.marketing.tallerAudiovisual.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/ESTUDIO%20DE%20TV%201.jpg`,
    },
    {
      nameKey: "labs.marketing.cabinaAudio.name",
      descKey: "labs.marketing.cabinaAudio.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Cabina%20de%20producci%C3%B3n%20de%20audio.jpg`,
    },
    {
      nameKey: "labs.marketing.salaMacs.name",
      descKey: "labs.marketing.salaMacs.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  gastronomia: [
    {
      name: "Laboratorio de Técnicas Dietéticas",
      desc: "Centro de innovación en seguridad alimentaria con tecnología avanzada para nutrición y dietética.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Laboratorio%20de%20Nutrici%C3%B3n%20y%20Diet%C3%A9tica%201.jpg`,
    },
    {
      name: "Laboratorio de Procesos Industriales",
      desc: "Entorno educativo con cuatro plantas de producción: cerveza artesanal, néctares, snacks y más.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB%20DE%20PROCESOS%20INDUSTRIALES%203.jpg`,
    },
  ],
  "administracion-negocios-internacionales": [
    {
      name: "Sala Design Thinking",
      desc: "Espacio para desarrollo de estrategias de internacionalización y modelos de negocio globales.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para gestión de comercio exterior y análisis de mercados internacionales.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  "ingenieria-economica-negocios": [
    {
      name: "Sala Design Thinking",
      desc: "Espacio para innovación en modelos financieros y evaluación de proyectos de inversión.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para modelamiento financiero, análisis de riesgos y simulación de escenarios.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  "ingenieria-empresarial": [
    {
      name: "Sala Design Thinking",
      desc: "Espacio colaborativo para innovación en procesos empresariales y transformación digital.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Laboratorio de Procesos Industriales",
      desc: "Plantas de producción para optimización de procesos y gestión de operaciones empresariales.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB%20DE%20PROCESOS%20INDUSTRIALES%203.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para business intelligence, KPIs y gestión estratégica.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  educacion: [
    {
      name: "Sala Design Thinking",
      desc: "Espacio colaborativo para innovación pedagógica y diseño de experiencias de aprendizaje.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para creación de contenido educativo digital y plataformas de aprendizaje.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  "educacion-inicial": [
    {
      name: "Sala Design Thinking",
      desc: "Espacio para diseñar materiales y métodos pedagógicos para la primera infancia.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Cámara Gesell",
      desc: "Sala de observación para estudiar el comportamiento infantil y técnicas de enseñanza inicial.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20GESSEL%201.jpg`,
    },
  ],
  "educacion-primaria": [
    {
      name: "Sala Design Thinking",
      desc: "Espacio para innovación en métodos de enseñanza y gamificación educativa.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para recursos educativos digitales y plataformas de aprendizaje interactivo.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  "diseno-ux": [
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para diseño de interfaces, prototipado en Figma y testing de usabilidad.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
    {
      name: "Sala Design Thinking",
      desc: "Espacio para design thinking, investigación de usuarios y co-creación de experiencias.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Taller de Producción Audiovisual",
      desc: "Estudio con ciclorama y chroma key para prototipado visual y diseño de interacción.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/ESTUDIO%20DE%20TV%201.jpg`,
    },
  ],
  "ingenieria-diseno-grafico": [
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple con software de diseño gráfico, ilustración y edición profesional.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
    {
      name: "Taller de Producción Audiovisual",
      desc: "Estudio profesional para diseño visual, fotografía y producción de contenido gráfico.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/ESTUDIO%20DE%20TV%201.jpg`,
    },
    {
      name: "Cabina de Producción de Audio",
      desc: "Espacio para postproducción de audio aplicada a proyectos de diseño multimedia.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Cabina%20de%20producci%C3%B3n%20de%20audio.jpg`,
    },
  ],
  periodismo: [
    {
      name: "Taller de Producción Audiovisual",
      desc: "Estudio profesional con ciclorama, chroma key y switcher para producción de noticieros y reportajes.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/ESTUDIO%20DE%20TV%201.jpg`,
    },
    {
      name: "Cabina de Producción de Audio",
      desc: "Cabina profesional para grabación de podcasts, entrevistas y contenido radiofónico.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Cabina%20de%20producci%C3%B3n%20de%20audio.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para edición de video, redacción digital y publicación multiplataforma.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  "ciencias-comunicacion": [
    {
      name: "Taller de Producción Audiovisual",
      desc: "Estudio profesional para producción de contenido audiovisual y comunicación corporativa.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/ESTUDIO%20DE%20TV%201.jpg`,
    },
    {
      name: "Cabina de Producción de Audio",
      desc: "Cabina de audio profesional para producción de contenido radial y podcasts corporativos.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Cabina%20de%20producci%C3%B3n%20de%20audio.jpg`,
    },
    {
      name: "Sala Design Thinking",
      desc: "Espacio para desarrollo de estrategias de comunicación y campañas de medios.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
  ],
  "comunicacion-publicidad": [
    {
      name: "Taller de Producción Audiovisual",
      desc: "Estudio profesional para producción de spots publicitarios, comerciales y contenido promocional.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/ESTUDIO%20DE%20TV%201.jpg`,
    },
    {
      name: "Cabina de Producción de Audio",
      desc: "Espacio para grabación de jingles, voiceovers y producción de audio publicitario.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Cabina%20de%20producci%C3%B3n%20de%20audio.jpg`,
    },
    {
      name: "Sala Design Thinking",
      desc: "Espacio colaborativo para desarrollo de campañas publicitarias y estrategias creativas.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
  ],
  turismo: [
    {
      name: "Sala Design Thinking",
      desc: "Espacio para diseño de experiencias turísticas innovadoras y desarrollo de destinos.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Laboratorio de Procesos Industriales",
      desc: "Plantas de producción para entender la cadena de valor de la industria turística y hotelera.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB%20DE%20PROCESOS%20INDUSTRIALES%203.jpg`,
    },
  ],
  "relaciones-internacionales": [
    {
      name: "Sala Design Thinking",
      desc: "Espacio para simulaciones diplomáticas, negociaciones internacionales y resolución de conflictos.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple para investigación geopolítica, análisis de política exterior y comercio global.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
  "biologia-marina": [
    {
      name: "Laboratorio de Procesos Industriales",
      desc: "Plantas para procesamiento de recursos hidrobiológicos y acuicultura sostenible.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB%20DE%20PROCESOS%20INDUSTRIALES%203.jpg`,
    },
    {
      name: "Laboratorio Hidráulica",
      desc: "Estudio de dinámica marina, circulación oceánica y ecosistemas acuáticos.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20HIDR%C3%81ULICA%201.jpg`,
    },
  ],
  "traduccion-interpretacion": [
    {
      name: "Sala con Macs",
      desc: "Ambientes Apple con software especializado de traducción asistida y herramientas CAT.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
    {
      name: "Cabina de Producción de Audio",
      desc: "Cabina profesional para práctica de interpretación simultánea y traducción audiovisual.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Cabina%20de%20producci%C3%B3n%20de%20audio.jpg`,
    },
  ],
};

const ALL_LABS: Lab[] = [
  {
    nameKey: "labs.all.hospitalSimulado.name",
    descKey: "labs.all.hospitalSimulado.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/HOSPITAL%20SIMULADO_1%202.jpg`,
  },
  {
    nameKey: "labs.all.salaAudiencias.name",
    descKey: "labs.all.salaAudiencias.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALADEAUDIENCIA%201.webp`,
  },
  {
    nameKey: "labs.all.tallerArquitectura.name",
    descKey: "labs.all.tallerArquitectura.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/TALLER%20DE%20ARQUITECTURA.jpg`,
  },
  {
    nameKey: "labs.all.salaDesignThinking.name",
    descKey: "labs.all.salaDesignThinking.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
  },
  {
    nameKey: "labs.all.salaBIM.name",
    descKey: "labs.all.salaBIM.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
  },
  {
    nameKey: "labs.all.labMecatronica.name",
    descKey: "labs.all.labMecatronica.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
  },
  {
    nameKey: "labs.all.camaraGesell.name",
    descKey: "labs.all.camaraGesell.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20GESSEL%201.jpg`,
  },
  {
    nameKey: "labs.all.tallerAudiovisual.name",
    descKey: "labs.all.tallerAudiovisual.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/ESTUDIO%20DE%20TV%201.jpg`,
  },
];

const CAREER_META: Record<string, { title: string; emoji: string; color: string; gradient: string }> = {
  software:          { title: "Ingeniería de Software",           emoji: "💻", color: "#166534", gradient: "linear-gradient(135deg,#052e16,#166534)" },
  medicina:          { title: "Medicina Humana",                  emoji: "🏥", color: "#0369a1", gradient: "linear-gradient(135deg,#0369a1,#0ea5e9)" },
  derecho:           { title: "Derecho",                          emoji: "⚖️", color: "#b45309", gradient: "linear-gradient(135deg,#78350f,#d97706)" },
  administracion:    { title: "Administración",                   emoji: "📊", color: "#7c3aed", gradient: "linear-gradient(135deg,#4c1d95,#7c3aed)" },
  contabilidad:      { title: "Contabilidad",                     emoji: "🧾", color: "#0891b2", gradient: "linear-gradient(135deg,#155e75,#0891b2)" },
  "ingenieria-civil":{ title: "Ingeniería Civil",                 emoji: "🏗️", color: "#92400e", gradient: "linear-gradient(135deg,#451a03,#b45309)" },
  arquitectura:      { title: "Arquitectura",                     emoji: "🏛️", color: "#1d4ed8", gradient: "linear-gradient(135deg,#1e3a8a,#3b82f6)" },
  psicologia:        { title: "Psicología",                       emoji: "🧠", color: "#6d28d9", gradient: "linear-gradient(135deg,#2e1065,#6d28d9)" },
  marketing:         { title: "Marketing",                        emoji: "📣", color: "#be185d", gradient: "linear-gradient(135deg,#4a044e,#be185d)" },
  "diseno-ux":       { title: "Diseño UX/UI",                     emoji: "🎨", color: "#db2777", gradient: "linear-gradient(135deg,#831843,#db2777)" },
  enfermeria:        { title: "Enfermería",                       emoji: "💉", color: "#0891b2", gradient: "linear-gradient(135deg,#155e75,#0891b2)" },
  "ingenieria-industrial": { title: "Ingeniería Industrial",      emoji: "⚙️", color: "#475569", gradient: "linear-gradient(135deg,#1e293b,#475569)" },
  economia:          { title: "Economía y Finanzas",               emoji: "💹", color: "#16a34a", gradient: "linear-gradient(135deg,#14532d,#16a34a)" },
  gastronomia:       { title: "Gastronomía",                      emoji: "🍳", color: "#c2410c", gradient: "linear-gradient(135deg,#7c2d12,#ea580c)" },
  periodismo:        { title: "Periodismo",                       emoji: "📰", color: "#1d4ed8", gradient: "linear-gradient(135deg,#1e3a8a,#2563eb)" },
  "ingenieria-minas":{ title: "Ingeniería de Minas",              emoji: "⛏️", color: "#92400e", gradient: "linear-gradient(135deg,#451a03,#d97706)" },
  odontologia:       { title: "Odontología",                      emoji: "🦷", color: "#0284c7", gradient: "linear-gradient(135deg,#075985,#0284c7)" },
  "ingenieria-ambiental":{ title: "Ingeniería Ambiental",         emoji: "🌿", color: "#16a34a", gradient: "linear-gradient(135deg,#14532d,#22c55e)" },
  educacion:         { title: "Educación & Pedagogía",            emoji: "📚", color: "#7c3aed", gradient: "linear-gradient(135deg,#4c1d95,#8b5cf6)" },
  nutricion:         { title: "Nutrición y Dietética",            emoji: "🥗", color: "#16a34a", gradient: "linear-gradient(135deg,#14532d,#4ade80)" },
  turismo:           { title: "Turismo y Hotelería",              emoji: "✈️", color: "#0891b2", gradient: "linear-gradient(135deg,#155e75,#22d3ee)" },
  "relaciones-internacionales":{ title: "Relaciones Internacionales", emoji: "🌐", color: "#1d4ed8", gradient: "linear-gradient(135deg,#1e3a8a,#60a5fa)" },
  veterinaria:       { title: "Medicina Veterinaria",             emoji: "🐾", color: "#d97706", gradient: "linear-gradient(135deg,#78350f,#f59e0b)" },
  "administracion-negocios-internacionales":{ title: "Administración y Negocios Internacionales", emoji: "🌍", color: "#2563eb", gradient: "linear-gradient(135deg,#1e3a8a,#3b82f6)" },
  "biologia-marina": { title: "Biología Marina",                  emoji: "🐠", color: "#0d9488", gradient: "linear-gradient(135deg,#115e59,#14b8a6)" },
  "ciencia-computacion":{ title: "Ciencia de la Computación",     emoji: "🖥️", color: "#6d28d9", gradient: "linear-gradient(135deg,#3b0764,#8b5cf6)" },
  "ciencias-comunicacion":{ title: "Ciencias de la Comunicación", emoji: "🎙️", color: "#0891b2", gradient: "linear-gradient(135deg,#155e75,#06b6d4)" },
  "comunicacion-publicidad":{ title: "Comunicación y Publicidad", emoji: "📢", color: "#e11d48", gradient: "linear-gradient(135deg,#881337,#fb7185)" },
  "educacion-inicial":{ title: "Educación Inicial",               emoji: "🧸", color: "#f43f5e", gradient: "linear-gradient(135deg,#9f1239,#fb7185)" },
  "educacion-primaria":{ title: "Educación Primaria",             emoji: "📚", color: "#eab308", gradient: "linear-gradient(135deg,#854d0e,#facc15)" },
  "ingenieria-biomedica":{ title: "Ingeniería Biomédica",         emoji: "🦾", color: "#0ea5e9", gradient: "linear-gradient(135deg,#075985,#38bdf8)" },
  "ingenieria-ciberseguridad":{ title: "Ingeniería de Ciberseguridad", emoji: "🔐", color: "#1e293b", gradient: "linear-gradient(135deg,#0f172a,#334155)" },
  "ingenieria-diseno-grafico":{ title: "Ingeniería de Diseño Gráfico", emoji: "🎨", color: "#db2777", gradient: "linear-gradient(135deg,#831843,#f472b6)" },
  "ingenieria-sistemas-informacion":{ title: "Ingeniería de Sistemas de Información", emoji: "🗄️", color: "#0891b2", gradient: "linear-gradient(135deg,#155e75,#22d3ee)" },
  "ingenieria-sistemas":{ title: "Ingeniería de Sistemas",        emoji: "⚙️", color: "#475569", gradient: "linear-gradient(135deg,#1e293b,#64748b)" },
  "ingenieria-transporte":{ title: "Ingeniería de Transporte",    emoji: "🚆", color: "#2563eb", gradient: "linear-gradient(135deg,#1e3a8a,#60a5fa)" },
  "ingenieria-economica-negocios":{ title: "Ingeniería Económica", emoji: "📈", color: "#16a34a", gradient: "linear-gradient(135deg,#14532d,#4ade80)" },
  "ingenieria-electronica":{ title: "Ingeniería Electrónica",     emoji: "⚡", color: "#d97706", gradient: "linear-gradient(135deg,#78350f,#f59e0b)" },
  "ingenieria-empresarial":{ title: "Ingeniería Empresarial",     emoji: "🏢", color: "#7c3aed", gradient: "linear-gradient(135deg,#4c1d95,#a78bfa)" },
  "ingenieria-maritima":{ title: "Ingeniería Marítima",           emoji: "🚢", color: "#0d9488", gradient: "linear-gradient(135deg,#115e59,#2dd4bf)" },
  "ingenieria-mecanica":{ title: "Ingeniería Mecánica",           emoji: "🔧", color: "#64748b", gradient: "linear-gradient(135deg,#1e293b,#94a3b8)" },
  "ingenieria-mecatronica":{ title: "Ingeniería Mecatrónica",     emoji: "🤖", color: "#0ea5e9", gradient: "linear-gradient(135deg,#075985,#38bdf8)" },
  "ingenieria-naval":{ title: "Ingeniería Naval",                 emoji: "⚓", color: "#1d4ed8", gradient: "linear-gradient(135deg,#1e3a8a,#60a5fa)" },
  obstetricia:       { title: "Obstetricia",                       emoji: "🤰", color: "#e11d48", gradient: "linear-gradient(135deg,#881337,#fb7185)" },
  "psicologia-consumidor":{ title: "Psicología del Consumidor",   emoji: "🛍️", color: "#f43f5e", gradient: "linear-gradient(135deg,#9f1239,#fb7185)" },
  "redes-telecomunicaciones":{ title: "Redes y Telecomunicaciones", emoji: "📡", color: "#0891b2", gradient: "linear-gradient(135deg,#155e75,#22d3ee)" },
  "tecnologia-medica":{ title: "Tecnología Médica",               emoji: "🔬", color: "#0ea5e9", gradient: "linear-gradient(135deg,#075985,#38bdf8)" },
  "traduccion-interpretacion":{ title: "Traducción e Interpretación", emoji: "🌐", color: "#7c3aed", gradient: "linear-gradient(135deg,#4c1d95,#a78bfa)" },
};

function LabGallery() {
  const { t } = useTranslation();
  const params = useSearchParams();
  const careerKey = params.get("career") ?? "";

  const labs = LABS_BY_CAREER[careerKey] ?? ALL_LABS;
  const meta = CAREER_META[careerKey];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f0f9ff_0%,#e0f2fe_100%)]">
      <Navbar />

      {/* Hero */}
      <div
        className="relative overflow-hidden px-6 py-14 text-center"
        style={{
          background: meta?.gradient ?? "linear-gradient(135deg,#1e3a8a,#3b82f6)",
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <p className="text-white/60 text-sm uppercase tracking-widest font-medium mb-2">
            {t("laboratorios.infraestructuraUtp")}
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            {meta ? `${meta.emoji} Laboratorios de ${meta.title}` : `${"🔬"} ${t("laboratorios.conoceNuestrosLaboratorios")}`}
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto">
            {t("laboratorios.instalacionesClaseMundial")}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs text-white/80 backdrop-blur-sm border border-white/20">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            {labs.length === 1
              ? t("laboratorios.unLaboratorioDisponible", { count: labs.length })
              : t("laboratorios.laboratoriosDisponibles", { count: labs.length })}
          </div>
        </motion.div>
      </div>

      {/* Gallery grid */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {labs.map((lab, i) => (
            <motion.div
              key={lab.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-52 bg-slate-100">
                <img
                  src={lab.img}
                  alt={lab.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="flex h-full items-center justify-center text-5xl">${meta?.emoji ?? "🔬"}</div>`;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div
                  className="mb-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                  style={{ background: meta?.color ?? "#1d4ed8" }}
                >
                  UTP
                </div>
                <h3 className="mt-1 text-base font-bold text-slate-900 leading-snug">
                  {t(lab.nameKey)}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {t(lab.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href={careerKey ? `/test` : "/carreras"}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            style={{ background: meta?.gradient ?? "linear-gradient(135deg,#1e3a8a,#3b82f6)" }}
          >
            ← {careerKey ? t("laboratorios.volverAlTest") : t("laboratorios.explorarCarreras")}
          </a>
          <p className="mt-4 text-xs text-slate-400">
            {t("laboratorios.infoOficial")}{" "}
            <a
              href="https://www.utp.edu.pe/descubre-utp/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600"
            >
              utp.edu.pe/descubre-utp
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  );
}

export default function LaboratoriosPage() {
  const { t } = useTranslation();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(180deg,#f0f9ff,#e0f2fe)]">
          <p className="text-slate-400">{t("laboratorios.cargandoLaboratorios")}</p>
        </div>
      }
    >
      <LabGallery />
    </Suspense>
  );
}

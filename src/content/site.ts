export type Lang = "es" | "en";

/** Un texto en los dos idiomas del sitio. */
export type L = Record<Lang, string>;

export const profile = {
  name: "Martín Israel",
  role: {
    es: "Frontend Developer y tecnólogo multimedial",
    en: "Frontend developer and multimedia technologist",
  } satisfies L,
  location: { es: "Buenos Aires, Argentina", en: "Buenos Aires, Argentina" } satisfies L,
  email: "martinisrael2005@gmail.com",
  phone: "+54 11 5174 7607",
  github: "https://github.com/MartinIsrael05",
  linkedin: "https://www.linkedin.com/in/martinisrael05",
  instagram: "https://instagram.com/martoisraa",
  avatar: "https://avatars.githubusercontent.com/u/108415576?v=4",
};

export const hero = {
  headline: {
    es: ["Interfaces", "que aguantan", "producción."],
    en: ["Interfaces", "that hold up", "in production."],
  },
  // Guion de no separación en "e-commerce" para que no se parta al final de línea.
  lede: {
    es: "Frontend developer en Buenos Aires. Más de 20 e‑commerce en producción con React, Next.js y Vue.",
    en: "Frontend developer in Buenos Aires. Over 20 e‑commerce sites in production, built with React, Next.js and Vue.",
  } satisfies L,
  primaryCta: { es: "Ver proyectos", en: "See projects" } satisfies L,
};

export const nav: { id: string; label: L }[] = [
  { id: "proyectos", label: { es: "Proyectos", en: "Projects" } },
  { id: "swim", label: { es: "Laboratorio", en: "Lab" } },
  { id: "diseno", label: { es: "Diseño", en: "Design" } },
  { id: "sobre", label: { es: "Sobre mí", en: "About" } },
  { id: "contacto", label: { es: "Contacto", en: "Contact" } },
];

export const ui = {
  contact: { es: "Contacto", en: "Contact" } satisfies L,
  watchFull: { es: "Ver completo", en: "Watch full piece" } satisfies L,
  visitSite: { es: "Ver sitio", en: "Visit site" } satisfies L,
  sourceCode: { es: "Código", en: "Source" } satisfies L,
  dragToCompare: { es: "Arrastrá para comparar", en: "Drag to compare" } satisfies L,
  before: { es: "Antes", en: "Before" } satisfies L,
  after: { es: "Después", en: "After" } satisfies L,
  themeToggle: { es: "Cambiar tema", en: "Toggle theme" } satisfies L,
  langToggle: { es: "Switch to English", en: "Cambiar a español" } satisfies L,
  closeVideo: { es: "Cerrar", en: "Close" } satisfies L,
  moveMouse: { es: "Mové el mouse", en: "Move your mouse" } satisfies L,
  dragHere: { es: "Tocá y arrastrá", en: "Touch and drag" } satisfies L,
  heroCaption: {
    es: "SWIM, sistema de partículas en vivo",
    en: "SWIM, live particle system",
  } satisfies L,
  tryIt: { es: "Probalo acá", en: "Try it here" } satisfies L,
  viewPiece: { es: "Ver pieza", en: "View piece" } satisfies L,
  closeImage: { es: "Cerrar imagen", en: "Close image" } satisfies L,
  openSite: { es: "Abrir sitio", en: "Open site" } satisfies L,
  ctrlDensity: { es: "Densidad", en: "Density" } satisfies L,
  ctrlSize: { es: "Tamaño", en: "Size" } satisfies L,
  ctrlTrail: { es: "Estela", en: "Trail" } satisfies L,
  ctrlForce: { es: "Fuerza", en: "Force" } satisfies L,
  ctrlColor: { es: "Color", en: "Colour" } satisfies L,
  reset: { es: "Reiniciar", en: "Reset" } satisfies L,
  pageOf: { es: "Página", en: "Page" } satisfies L,
  prevPage: { es: "Páginas anteriores", en: "Previous pages" } satisfies L,
  nextPage: { es: "Páginas siguientes", en: "Next pages" } satisfies L,
  videoUnsupported: {
    es: "Tu navegador no puede reproducir este video.",
    en: "Your browser cannot play this video.",
  } satisfies L,
};

export const sections = {
  proyectos: {
    title: { es: "Proyectos", en: "Projects" } satisfies L,
    lede: {
      es: "Aplicaciones web propias y académicas. Todas están desplegadas, son navegables y tienen el código abierto.",
      en: "Personal and academic web applications. All of them are deployed, browsable and open source.",
    } satisfies L,
  },
  swim: {
    title: { es: "Laboratorio", en: "Lab" } satisfies L,
    lede: {
      es: "Lo que estoy construyendo ahora. Un sistema de partículas que corre en esta misma página.",
      en: "What I am building right now. A particle system running on this very page.",
    } satisfies L,
  },
  diseno: {
    title: { es: "Diseño", en: "Design" } satisfies L,
    lede: {
      es: "Editorial y tipografía. Es de donde viene el criterio visual que después aplico a las interfaces.",
      en: "Editorial and typography. This is where the visual judgement I apply to interfaces comes from.",
    } satisfies L,
  },
  sobre: {
    title: { es: "Sobre mí", en: "About" } satisfies L,
  },
  contacto: {
    title: { es: "Trabajemos juntos", en: "Let's work together" } satisfies L,
    lede: {
      es: "Disponible para trabajo presencial, híbrido o remoto.",
      en: "Available for on-site, hybrid or remote work.",
    } satisfies L,
  },
};

export const about = {
  bio: {
    es: [
      "Soy desarrollador frontend y estudiante avanzado de la Licenciatura en Tecnología Multimedial en la Universidad Maimónides. Vengo de una formación técnica en informática en la ORT.",
      "Durante poco más de un año en SourcingUp construí y mantuve más de veinte tiendas online: catálogo, carrito y checkout en React, interfaces responsive a partir de prototipos de Figma, integración de APIs REST y trabajo en Scrum con code review. También resolvía los pedidos de diseño en Photoshop e Illustrator sin derivarlos al equipo gráfico.",
      "En paralelo construyo SWIM, una instalación que mezcla hardware, Python y gráficos en tiempo real, y sigo haciendo diseño editorial. Las dos cosas alimentan lo mismo: el criterio para decidir cuándo una interfaz está terminada y cuándo todavía no.",
    ],
    en: [
      "I am a frontend developer and a senior student of the Multimedia Technology degree at Universidad Maimónides, with an earlier technical background in computer science at ORT.",
      "Over a year at SourcingUp I built and maintained more than twenty online stores: catalogue, cart and checkout in React, responsive interfaces built from Figma prototypes, REST API integration, and Scrum delivery with code review. I also handled design requests directly in Photoshop and Illustrator instead of passing them to the graphics team.",
      "Alongside that I build SWIM, an installation that mixes hardware, Python and real time graphics, and I keep doing editorial design. Both feed the same thing: the judgement to tell when an interface is finished and when it is not.",
    ],
  },
  experience: [
    {
      role: { es: "Frontend Developer", en: "Frontend Developer" } satisfies L,
      org: "SourcingUp",
      period: { es: "Dic 2023 a Feb 2025", en: "Dec 2023 to Feb 2025" } satisfies L,
      note: {
        es: "Más de 20 e-commerce en producción. Performance, responsive mobile-first y APIs REST.",
        en: "Over 20 e-commerce sites in production. Performance, mobile-first responsive and REST APIs.",
      } satisfies L,
    },
    {
      role: { es: "Práctica pre-profesional", en: "Pre-professional internship" } satisfies L,
      org: "SourcingUp",
      period: { es: "Nov a Dic 2023", en: "Nov to Dec 2023" } satisfies L,
      note: {
        es: "Sitio institucional de una iniciativa solidaria, aprobado sin rondas de corrección.",
        en: "Institutional site for a non-profit initiative, approved with no correction rounds.",
      } satisfies L,
    },
    {
      role: { es: "Asistente contable", en: "Accounting assistant" } satisfies L,
      org: "Estudio Szterenlicht",
      period: { es: "May 2025 a hoy", en: "May 2025 to present" } satisfies L,
      note: {
        es: "Normalización de bases y validación cruzada de datos en presentaciones periódicas.",
        en: "Database normalisation and cross-validation of data in periodic filings.",
      } satisfies L,
    },
  ],
  education: [
    {
      title: {
        es: "Licenciatura en Tecnología Multimedial",
        en: "BA in Multimedia Technology",
      } satisfies L,
      org: "Universidad Maimónides",
      period: { es: "2024 a 2027 (75% cursado)", en: "2024 to 2027 (75% complete)" } satisfies L,
    },
    {
      title: {
        es: "Bachillerato en Informática con certificación en desarrollo móvil y web",
        en: "Technical degree in Computer Science with mobile and web development certification",
      } satisfies L,
      org: "Escuela Técnica ORT",
      period: { es: "2019 a 2023", en: "2019 to 2023" } satisfies L,
    },
  ],
  skills: [
    {
      group: { es: "Frontend", en: "Frontend" } satisfies L,
      items: ["TypeScript", "React", "Next.js", "Vue 3", "Tailwind", "SASS", "React Native", "WCAG"],
    },
    {
      group: { es: "Backend y datos", en: "Backend and data" } satisfies L,
      items: ["Node.js", "API REST", "MongoDB", "Mongoose", "Firebase", "SQL Server", "C#"],
    },
    {
      group: { es: "Multimedia", en: "Multimedia" } satisfies L,
      items: ["TouchDesigner", "Ableton Live", "After Effects", "Illustrator", "Photoshop", "Figma", "Maya"],
    },
  ],
  quickFacts: [
    {
      label: { es: "Ubicación", en: "Location" } satisfies L,
      value: { es: "Buenos Aires, Argentina", en: "Buenos Aires, Argentina" } satisfies L,
    },
    {
      label: { es: "Disponibilidad", en: "Availability" } satisfies L,
      value: {
        es: "Presencial, híbrido o remoto",
        en: "On-site, hybrid or remote",
      } satisfies L,
    },
    {
      label: { es: "Idiomas", en: "Languages" } satisfies L,
      value: {
        es: "Español nativo · Inglés C1 · Hebreo básico",
        en: "Native Spanish · English C1 · Basic Hebrew",
      } satisfies L,
    },
  ],
  languages: {
    es: "Español nativo. Inglés C1. Hebreo básico.",
    en: "Native Spanish. English C1. Basic Hebrew.",
  } satisfies L,
  leadership: {
    es: "Madrij en la comunidad Dor Jadash desde 2021: coordino un grupo de 20 adolescentes y curso el programa de liderazgo Nofim.",
    en: "Youth leader at the Dor Jadash community since 2021: I coordinate a group of 20 teenagers and attend the Nofim leadership programme.",
  } satisfies L,
};

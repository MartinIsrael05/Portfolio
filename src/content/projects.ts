import type { L } from "./site";

export type Discipline = "web" | "lab" | "design";

export interface StackGroup {
  group: L;
  items: string[];
}

export interface ProjectLink {
  label: L;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  discipline: Discipline;
  kind: L;
  summary: L;
  body: { es: string[]; en: string[] };
  /** Agrupado por rol para que se lea todo lo que entró en el proyecto. */
  stack: StackGroup[];
  facts?: { label: L; value: L }[];
  credits?: L;
  status?: L;
  links?: ProjectLink[];
  image?: string;
  gallery?: { src: string; alt: L; wide?: boolean }[];
}

const VISIT: L = { es: "Ver sitio", en: "Visit site" };
const CODE: L = { es: "Código", en: "Source" };

const LANG: L = { es: "Lenguajes", en: "Languages" };
const FRAME: L = { es: "Framework y UI", en: "Framework and UI" };
const DATA: L = { es: "Datos y servicios", en: "Data and services" };
const TOOLS: L = { es: "Herramientas", en: "Tooling" };

/* --------------------------------------------------------------------------
   Desarrollo web. Es el centro del sitio.
   -------------------------------------------------------------------------- */

export const devProjects: Project[] = [
  {
    slug: "teca",
    title: "TECA",
    year: "2026",
    discipline: "web",
    kind: { es: "Aplicación SaaS", en: "SaaS application" },
    summary: {
      es: "Control de suscripciones y gastos recurrentes, con aviso antes de cada cobro.",
      en: "Subscription and recurring expense tracking, with a warning before every charge.",
    },
    body: {
      es: [
        "Una persona promedio tiene entre seis y quince suscripciones activas y rara vez sabe cuánto suman. TECA centraliza los cobros, los proyecta en el tiempo y avisa por mail antes de que ocurran.",
        "Autenticación y base de datos en Firebase con reglas de seguridad por usuario, gráficos de evolución con Recharts, envío transaccional con Resend y exportación del historial a planilla.",
      ],
      en: [
        "An average person has between six and fifteen active subscriptions and rarely knows what they add up to. TECA centralises the charges, projects them over time and emails a warning before they happen.",
        "Firebase auth and database with per-user security rules, trend charts with Recharts, transactional delivery through Resend and spreadsheet export of the full history.",
      ],
    },
    stack: [
      { group: LANG, items: ["JavaScript", "JSX", "CSS"] },
      { group: FRAME, items: ["React 19", "Next.js App Router", "Tailwind CSS", "Framer Motion", "Recharts", "Lucide"] },
      { group: DATA, items: ["Firebase Auth", "Cloud Firestore", "firebase-admin", "Resend", "Nodemailer", "xlsx"] },
      { group: TOOLS, items: ["ESLint", "Git", "Vercel"] },
    ],
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "Desarrollo y diseño", en: "Development and design" } },
      { label: { es: "Equipo", en: "Team" }, value: { es: "2 personas", en: "2 people" } },
    ],
    credits: { es: "Con Luciano Neiman.", en: "With Luciano Neiman." },
    links: [
      { label: VISIT, href: "https://tp-5-saas-israel-neiman.vercel.app" },
      { label: CODE, href: "https://github.com/MartinIsrael05/TP-5-SaaS-Israel-Neiman" },
    ],
    image: "/media/dev/teca.webp",
  },
  {
    slug: "fragmente",
    title: "FRAGMENTE",
    year: "2026",
    discipline: "web",
    kind: { es: "E-commerce", en: "E-commerce" },
    summary: {
      es: "Tienda de perfumes con producto configurable, carrito persistente y órdenes numeradas.",
      en: "A perfume store with a configurable product, persistent cart and numbered orders.",
    },
    body: {
      es: [
        "E-commerce completo con API propia: catálogo, producto configurable, carrito y favoritos que sobreviven a la sesión, búsqueda con debounce y generación de órdenes con numeración secuencial.",
        "Los endpoints REST están escritos a mano sobre route handlers de Next, con MongoDB y Mongoose del lado de los datos y Context API para el estado compartido.",
      ],
      en: [
        "A complete e-commerce with its own API: catalogue, configurable product, cart and favourites that survive the session, debounced search and order generation with sequential numbering.",
        "The REST endpoints are hand-written on Next route handlers, with MongoDB and Mongoose on the data side and Context API for shared state.",
      ],
    },
    stack: [
      { group: LANG, items: ["JavaScript", "JSX", "CSS"] },
      { group: FRAME, items: ["React", "Next.js App Router", "React Compiler", "Tailwind CSS", "Context API"] },
      { group: DATA, items: ["Node.js", "API REST propia", "MongoDB", "Mongoose"] },
      { group: TOOLS, items: ["ESLint", "Git", "Vercel"] },
    ],
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "Full stack", en: "Full stack" } },
      { label: { es: "API", en: "API" }, value: { es: "REST propia", en: "Own REST layer" } },
    ],
    links: [
      { label: VISIT, href: "https://tp-4-ecommerce.vercel.app" },
      { label: CODE, href: "https://github.com/MartinIsrael05/TP-4-Ecommerce" },
    ],
    image: "/media/dev/fragmente.webp",
  },
  {
    slug: "movify",
    title: "MOVIFY",
    year: "2026",
    discipline: "web",
    kind: { es: "Aplicación de cine", en: "Film application" },
    summary: {
      es: "Explorador de películas sobre la API de TMDB, con favoritos y rutas dinámicas.",
      en: "A film explorer on top of the TMDB API, with favourites and dynamic routes.",
    },
    body: {
      es: [
        "Cinco categorías de películas, ficha completa por título, carrusel y sistema de favoritos. La arquitectura separa containers de componentes de presentación para que la capa de datos sea reemplazable.",
      ],
      en: [
        "Five film categories, a full detail view per title, a carousel and a favourites system. The architecture separates containers from presentational components so the data layer stays replaceable.",
      ],
    },
    stack: [
      { group: LANG, items: ["JavaScript", "JSX", "CSS"] },
      { group: FRAME, items: ["React", "Next.js 14", "Tailwind CSS", "Lucide"] },
      { group: DATA, items: ["API REST de TMDB", "Axios"] },
      { group: TOOLS, items: ["ESLint", "Git", "Vercel"] },
    ],
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "Frontend", en: "Frontend" } },
      { label: { es: "Datos", en: "Data" }, value: { es: "API externa", en: "External API" } },
    ],
    links: [
      { label: VISIT, href: "https://pmiii-tp-3.vercel.app" },
      { label: CODE, href: "https://github.com/MartinIsrael05/PMIII-TP3" },
    ],
    image: "/media/dev/movify.webp",
  },
  {
    slug: "gamma",
    title: "GAMMA",
    year: "2026",
    discipline: "web",
    kind: { es: "Gestor de finanzas", en: "Finance manager" },
    summary: {
      es: "Control de gastos con presupuestos por categoría, proyección y gráficos.",
      en: "Expense tracking with per-category budgets, projection and charts.",
    },
    body: {
      es: [
        "Aplicación en Vue 3 con Pinia para el estado y persistencia en localStorage. Incluye autenticación, presupuestos configurables por categoría, proyección mensual y comparación de gasto contra el límite fijado.",
      ],
      en: [
        "A Vue 3 application with Pinia for state and localStorage persistence. It includes authentication, configurable per-category budgets, monthly projection and spend comparison against the set limit.",
      ],
    },
    stack: [
      { group: LANG, items: ["JavaScript", "Vue SFC", "CSS", "HTML"] },
      { group: FRAME, items: ["Vue 3", "Composition API", "Pinia", "Vue Router"] },
      { group: DATA, items: ["localStorage"] },
      { group: TOOLS, items: ["Vite", "Git", "Vercel"] },
    ],
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "Frontend", en: "Frontend" } },
      { label: { es: "Estado", en: "State" }, value: { es: "Pinia + localStorage", en: "Pinia + localStorage" } },
    ],
    links: [{ label: VISIT, href: "https://gestor-de-finanzas-gamma.vercel.app" }],
    image: "/media/dev/gamma.webp",
  },
  {
    slug: "recetas",
    title: "Recetas",
    year: "2025",
    discipline: "web",
    kind: { es: "Sitio de recetas", en: "Recipe site" },
    summary: {
      es: "Buscador de recetas en React, reescrito desde una primera versión en HTML puro.",
      en: "A React recipe browser, rewritten from a first version in plain HTML.",
    },
    body: {
      es: [
        "Segunda versión del proyecto. La primera era maquetado puro; esta reescribe todo en componentes, con consumo de API y una ruta por receta. Sirve para ver el salto entre una etapa y la otra.",
      ],
      en: [
        "Second version of the project. The first was pure markup; this one rewrites everything in components, with API consumption and a route per recipe. It shows the jump between one stage and the next.",
      ],
    },
    stack: [
      { group: LANG, items: ["JavaScript", "JSX", "CSS"] },
      { group: FRAME, items: ["React", "Next.js", "React Compiler", "Tailwind CSS"] },
      { group: DATA, items: ["API REST", "Axios"] },
      { group: TOOLS, items: ["ESLint", "Git", "Vercel"] },
    ],
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "Frontend", en: "Frontend" } },
      { label: { es: "Versión", en: "Version" }, value: { es: "Reescritura en React", en: "React rewrite" } },
    ],
    links: [
      { label: VISIT, href: "https://tp-2-paginade-recetas-react-martin.vercel.app" },
      {
        label: CODE,
        href: "https://github.com/MartinIsrael05/TP-2-PaginadeRecetas-React-Martin-Israel",
      },
    ],
    image: "/media/dev/recetas.webp",
  },
  {
    slug: "maquetado",
    title: "SOFA",
    year: "2025",
    discipline: "web",
    kind: { es: "Sitio de producto", en: "Product site" },
    summary: {
      es: "Tienda de decoración maquetada a mano, sin frameworks ni librerías.",
      en: "A home decor storefront hand-coded with no frameworks or libraries.",
    },
    body: {
      es: [
        "Carrusel, grilla de producto, menú y modo oscuro resueltos solamente con HTML, CSS y JavaScript. Es la línea de base contra la que se mide todo lo que vino después.",
      ],
      en: [
        "Carousel, product grid, menu and dark mode solved with nothing but HTML, CSS and JavaScript. It is the baseline against which everything that came later is measured.",
      ],
    },
    stack: [
      { group: LANG, items: ["HTML5", "CSS3", "JavaScript ES6"] },
      { group: FRAME, items: ["Flexbox", "CSS Grid", "Custom properties", "Media queries"] },
      { group: TOOLS, items: ["Git", "Vercel"] },
    ],
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "Maquetado", en: "Markup" } },
      { label: { es: "Dependencias", en: "Dependencies" }, value: { es: "Ninguna", en: "None" } },
    ],
    links: [
      { label: VISIT, href: "https://proyecto-final-maquetado-web.vercel.app" },
      { label: CODE, href: "https://github.com/MartinIsrael05/Proyecto-Final-Maquetado-Web" },
    ],
    image: "/media/dev/maquetado.webp",
  },
];

/* --------------------------------------------------------------------------
   Proyecto en curso. Es un paréntesis dentro del sitio, no el centro.
   -------------------------------------------------------------------------- */

export const swim: Project = {
  slug: "swim",
  title: "SWIM",
  year: "2026",
  discipline: "lab",
  kind: { es: "Proyecto en curso", en: "Work in progress" },
  summary: {
    es: "Un sistema de partículas que responde al movimiento, en el navegador y en una sala.",
    en: "A particle system that answers to movement, in the browser and in a room.",
  },
  body: {
    es: [
      "Lo que estoy construyendo ahora, fuera del trabajo de cliente. Una superficie de agua generativa que se proyecta sobre el piso de una sala y se perturba cuando alguien se mueve encima.",
      "La entrada es una varita con un ESP32 y un magnetómetro GY-273. El firmware manda lecturas crudas por puerto serie y un módulo en Python las parsea, aprende el rango en vivo y lo mapea del círculo del sensor al cuadrado de la proyección.",
      "El panel de arriba es ese mismo motor portado a canvas: atracción radial más una componente tangencial, con una capa de feedback que deja la estela. Los controles son reales, tocalos.",
    ],
    en: [
      "What I am building right now, outside client work. A generative water surface projected onto the floor of a room, disturbed when somebody moves across it.",
      "The input is a wand built around an ESP32 and a GY-273 magnetometer. The firmware streams raw readings over serial, and a Python module parses them, learns the range live and maps it from the sensor's circle onto the projection's square.",
      "The panel above is that same engine ported to canvas: radial attraction plus a tangential component, with a feedback layer that leaves the wake. The controls are real, go ahead.",
    ],
  },
  stack: [
    { group: LANG, items: ["Python", "C++ (Arduino)", "JavaScript", "GLSL"] },
    { group: FRAME, items: ["TouchDesigner", "Canvas 2D", "GPU particles", "Optical Flow"] },
    { group: DATA, items: ["ESP32", "Magnetómetro GY-273", "Puerto serie 115200", "Kinect"] },
  ],
  facts: [
    { label: { es: "Python", en: "Python" }, value: { es: "833 líneas", en: "833 lines" } },
    { label: { es: "Latencia", en: "Latency" }, value: { es: "60 ms de suavizado", en: "60 ms smoothing" } },
  ],
  status: {
    es: "La varita y el sistema de partículas funcionan. Falta el montaje cenital en sala.",
    en: "The wand and the particle system work. The ceiling mount in the room is pending.",
  },
};

/* --------------------------------------------------------------------------
   Diseño gráfico y editorial.
   -------------------------------------------------------------------------- */

export const designProjects: Project[] = [
  {
    slug: "weeknd",
    title: "The Weeknd",
    year: "2024",
    discipline: "design",
    kind: { es: "Revista editorial", en: "Editorial magazine" },
    summary: {
      es: "Diez páginas sobre un artista que construyó su carrera en la oscuridad.",
      en: "Ten pages about an artist who built his career in the dark.",
    },
    body: {
      es: [
        "Revista de autor sobre The Weeknd, armada como ejercicio de grilla. Cada apertura toma su color de la portada del disco que trata: el verde de Kiss Land, el rojo de After Hours, el azul de Starboy.",
        "La estructura se mantiene fija y lo que cambia es el ritmo: cantidad de columnas, escala del titular, dirección de la lectura. Hay una página con el texto rotado noventa grados y otra a tres columnas de cuerpo chico, y las dos usan la misma caja.",
      ],
      en: [
        "A self-authored magazine about The Weeknd, built as a grid exercise. Every opening takes its colour from the album cover it deals with: the green of Kiss Land, the red of After Hours, the blue of Starboy.",
        "The structure stays fixed and what changes is the rhythm: column count, headline scale, reading direction. One page runs its text rotated ninety degrees and another sets three columns of small body copy, and both sit in the same box.",
      ],
    },
    stack: [
      { group: { es: "Disciplina", en: "Discipline" }, items: ["Diseño editorial", "Sistema de grilla", "Jerarquía tipográfica", "Color por sección"] },
      { group: TOOLS, items: ["InDesign", "Illustrator", "Photoshop"] },
    ],
    gallery: [
      { src: "/media/design/weeknd/p01.webp", alt: { es: "Tapa de la revista", en: "Magazine cover" } },
      { src: "/media/design/weeknd/p02.webp", alt: { es: "Página de apertura biográfica", en: "Biography opening page" } },
      { src: "/media/design/weeknd/p03.webp", alt: { es: "Página sobre las letras", en: "Page about the lyrics" } },
      { src: "/media/design/weeknd/p04.webp", alt: { es: "Página de los primeros discos", en: "Early albums page" } },
      { src: "/media/design/weeknd/p05.webp", alt: { es: "Página Beauty Behind the Madness", en: "Beauty Behind the Madness page" } },
      { src: "/media/design/weeknd/p06.webp", alt: { es: "Página Starboy", en: "Starboy page" } },
      { src: "/media/design/weeknd/p07.webp", alt: { es: "Página After Hours", en: "After Hours page" } },
      { src: "/media/design/weeknd/p08.webp", alt: { es: "Página Dawn FM", en: "Dawn FM page" } },
      { src: "/media/design/weeknd/p09.webp", alt: { es: "Página sobre su influencia", en: "Influence page" } },
      { src: "/media/design/weeknd/p10.webp", alt: { es: "Contratapa", en: "Back cover" } },
    ],
  },
  {
    slug: "blur",
    title: "blur",
    year: "2024",
    discipline: "design",
    kind: { es: "Sistema de afiches", en: "Poster system" },
    summary: {
      es: "Una palabra que se desenfoca al caer. Cuatro paletas, una sola regla.",
      en: "A word that blurs as it falls. Four palettes, one single rule.",
    },
    body: {
      es: [
        "Serie de afiches para una exposición. La idea es que la tipografía ilustre su propio significado: la palabra arranca sólida arriba y se disuelve hacia abajo hasta fundirse con el fondo.",
        "El efecto no es un blur de filtro, son capas desplazadas con transparencia creciente. Eso deja el borde superior nítido y le da al descenso una textura escalonada que un desenfoque real no tiene.",
      ],
      en: [
        "A poster series for an exhibition. The idea is for the type to illustrate its own meaning: the word starts solid at the top and dissolves downward until it merges with the background.",
        "The effect is not a filter blur but offset layers with increasing transparency. That keeps the top edge crisp and gives the descent a stepped texture a real blur would not have.",
      ],
    },
    stack: [
      { group: { es: "Disciplina", en: "Discipline" }, items: ["Tipografía", "Sistema de color", "Composición"] },
      { group: TOOLS, items: ["Illustrator", "Photoshop"] },
    ],
    gallery: [
      { src: "/media/design/blur/poster-rojo.webp", alt: { es: "Afiche blur en rojo y azul", en: "blur poster in red and blue" } },
      { src: "/media/design/blur/poster-azul.webp", alt: { es: "Afiche blur en azul y rosa", en: "blur poster in blue and pink" } },
      { src: "/media/design/blur/poster-menta.webp", alt: { es: "Afiche blur en menta y magenta", en: "blur poster in mint and magenta" } },
      { src: "/media/design/blur/poster-verde.webp", alt: { es: "Afiche blur en verde y lila", en: "blur poster in green and lilac" } },
      { src: "/media/design/blur/mockup-calle.webp", alt: { es: "Los tres afiches montados en la calle", en: "The three posters mounted on the street" }, wide: true },
      { src: "/media/design/blur/mockup-muro.webp", alt: { es: "Dos afiches sobre muro de hormigón", en: "Two posters on a concrete wall" }, wide: true },
    ],
  },
];

export const allProjects = [...devProjects, swim, ...designProjects];

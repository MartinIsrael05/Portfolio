# Portfolio — Martín Israel

Sitio personal de un frontend developer. El centro son las aplicaciones web;
el laboratorio y el diseño editorial acompañan.

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Stack

- **Next.js 15** (App Router) con React 19
- **Tailwind v4** vía `@tailwindcss/postcss`
- **Motion** (`motion/react`) para los revelados al hacer scroll
- **Phosphor Icons**
- Tipografías por `next/font`: Bricolage Grotesque (display), Geist, Geist Mono
- Canvas 2D a mano para el campo de partículas, sin librerías

## Estructura

```
src/
  app/
    layout.tsx        fuentes, metadata, script anti-flash de tema
    page.tsx          composición de secciones
    globals.css       tokens de color, tipografía display, grano
  content/
    site.ts           perfil, navegación, textos de sección, bio, experiencia
    projects.ts       proyectos, bilingüe
  lib/
    prefs.tsx         contexto de idioma y tema, con persistencia
  components/
    Nav · Hero · Projects · Swim · Design · About · Contact
    ParticleField     motor de SWIM en canvas + sus controles
public/media/         capturas y piezas de diseño
```

**Todo el texto vive en `src/content/`.** Cada cadena es un par `{ es, en }`.

## Secciones

1. **Hero**: el panel de la derecha corre el motor de partículas. Lo primero que
   se ve es código ejecutándose, no una captura.
2. **Proyectos**: seis aplicaciones web desplegadas, con repositorio. La captura
   entera es el enlace al sitio en producción. El stack va agrupado por rol
   (lenguajes, framework y UI, datos y servicios, herramientas) en vez de
   resumirse a dos etiquetas.
3. **Laboratorio**: SWIM, el proyecto en curso, con el campo de partículas
   jugable y cinco controles reales.
4. **Diseño**: la revista *The Weeknd* en un visor de a dos páginas y los
   afiches *blur*.
5. **Sobre mí** y **Contacto**.

## El campo de partículas

`ParticleField` es la parte que vale la pena leer. En la instalación, un sistema
de partículas GPU en TouchDesigner recibe una fuerza radial desde una varita con
ESP32 y magnetómetro, leída por puerto serie. En el navegador el principio es el
mismo:

- atracción radial hacia el puntero **más** una componente tangencial, que es la
  que convierte el imán en remolino;
- una capa de feedback (fondo translúcido en vez de limpiar) que deja la estela;
- bordes periódicos, para que el campo no tenga principio ni final.

El estado por partícula es un `Float32Array` y el bucle vive fuera de React:
mover un control muta un objeto, no dispara renders. Se pausa fuera de pantalla
y, con `prefers-reduced-motion`, pinta un cuadro fijo y no agenda nada. Da 60 fps
incluso con la densidad al máximo.

Dos cosas que no hay que repetir:

- Fijar `style.width` en el canvas lo hacía empujar el ancho de su columna, el
  `ResizeObserver` volvía a disparar y el campo se reiniciaba en bucle sin
  dibujarse nunca. Se dimensiona por atributo y va posicionado absoluto.
- `step()` se re-agendaba siempre, así que el arranque en movimiento reducido
  dejaba cientos de `requestAnimationFrame` encolados que `cancelAnimationFrame`
  no alcanzaba a matar. Ahora recibe si debe agendar o no.

## Decisiones

- **Tema**: oscuro por defecto, claro completo, persistido en `localStorage`. Un
  solo acento en todo el sitio. El panel de partículas queda oscuro en los dos
  temas, como cualquier material audiovisual.
- **Idioma**: español por defecto, inglés completo con toggle.
- **Movimiento**: todo degrada con `prefers-reduced-motion`.
- **Trabajo de cliente excluido**: sólo piezas propias y académicas.
- **Hover de las capturas**: velo oscuro y chip que entra desde abajo. Nada de
  escalar la imagen, que arrastra el texto que tiene al lado.

## De dónde salieron los assets

- **Capturas**: Playwright sobre los deploys en producción, 1600x1000 a densidad
  2x. De cada sitio se tomaron tres posiciones de scroll y se eligió la que
  mejor muestra el producto, no siempre la portada.
- **The Weeknd**: las diez páginas renderizadas del PDF con pdf.js y pasadas a
  WebP.
- **blur**: exportados del original y convertidos a WebP. De 700 KB a 27 KB cada
  uno, porque los degradados comprimen pésimo en JPEG.

## Lo que falta

| Dónde | Qué falta |
|---|---|
| **SWIM** | Fotos o video de la instalación montada en sala |

## Deploy

Pensado para Vercel. `public/media` pesa unos 2,7 MB.

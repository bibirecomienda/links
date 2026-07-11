# Guía de auditoría — Bibi Recomienda

> Escrita por Claude Fable 5 (julio 2026) tras la primera auditoría integral del proyecto.
> Sirve para que cualquier modelo (Sonnet, Opus, etc.) repita este tipo de auditoría
> sin redescubrir el proyecto desde cero.

---

## 1. Resumen ejecutivo de la auditoría 2026-07-11

### Qué se encontró

| Área | Hallazgo principal | Severidad |
|---|---|---|
| Estructura | Archivos de la semana 2026-06-21 con **productos inventados** (ASINs falsos, links `amzn.to/[TAG]`) sueltos en la raíz | Alta |
| Estructura | Docs obsoletos del flujo Cowork viejo (`CLAUDE-CODE.md`, `NEXT-STEPS.md`, `organize-weekly-carousel.js`) y template duplicado en la raíz | Media |
| HTML | Sin `rel="sponsored"` en links de afiliado; imágenes `_AC_SL1500_` (1500px) para thumbs de 90px; sin jerarquía h2/h3 | Media |
| Publicación | **Cero validación** de `links.js` antes de publicar; ya había un producto duplicado (ids 1 y 12) y campos faltantes (ids 1–5) | Alta |
| Comandos | Pasos desordenados en `agregar-link.md` (13 antes que 12); sin verificación del tag de afiliado; `CLAUDE.md` duplicaba el flujo con otra versión | Alta |

### Qué se cambió (commits `afc5d93`…)

1. **`scripts/validate-links.js`** + comando **`/validar-links`** — validación completa de `links.js`, corre con `osascript -l JavaScript` (la máquina no tiene Node).
2. **`links.js` normalizado** — campos faltantes completados en ids 1–5, esquema real documentado en la cabecera.
3. **Comandos corregidos** — renumeración, tag `bibirecomie02-20` forzado en SiteStripe, chequeo de duplicados, validación pre-commit en ambos, y regla explícita de **nunca inventar productos** en `/crear-carrusel`.
4. **`index.html`** — `rel="sponsored noopener"`, thumbnails `_AC_SX300_` (helper `thumb()`), h2/h3 semánticos, CSS duplicado eliminado, búsqueda por categoría. Verificado en preview sin regresión visual.
5. **Limpieza** — docs obsoletos y template duplicado eliminados del repo; los archivos inventados del 06-21 movidos a `descartados/` (gitignored).
6. **`CLAUDE.md` reescrito** — ya no duplica los flujos (remite a `.claude/commands/`), refleja la paleta y el estado real del deploy.

### Qué quedó pendiente y por qué

- **Integración de Mercado Libre** — fuera del alcance; requiere decisión de Bibiana sobre el programa de afiliados de ML. Patrones listos en §6.
- **Refresco de precios** — requiere re-navegar Amazon con sesión activa; no automatizable sin Chrome interactivo. El aviso "Visto el X · los precios pueden variar" lo mitiga.
- **Títulos >80 chars (ids 11 y 2)** — el validador los marca como advertencia; acortarlos cambia contenido publicado, decisión de Bibiana.
- **`admin.html`** — legacy con la paleta vieja; no se tocó porque es local (gitignored) y funcional. Decidir: restyle o retiro.
- **JSON-LD (schema.org ItemList)** — valor marginal para una página link-in-bio; anotado como opcional.

---

## 2. Metodología paso a paso

Orden de exploración recomendado (el que se siguió):

1. **Inventario**: `find . -type f -not -path "*/.git/*"` + `git log --oneline -20` + `git status`. Los archivos sin commitear y los nombres raros de la raíz suelen ser la primera pista.
2. **Leer el corazón**: los archivos que generan lo público (`index.html`, `links.js`) completos.
3. **Leer los flujos**: `.claude/commands/*.md` completos — aquí vive el proceso real de publicación.
4. **Leer el soporte**: docs (`CLAUDE.md` vs. realidad), scripts, configs (`.gitignore`, `.claude/settings.local.json`, `launch.json`).
5. **Verificar el mundo exterior**: `git remote -v`, `git ls-files` (qué está trackeado vs. gitignored), `curl` al sitio publicado para confirmar que el deploy está vivo y al día.
6. **Cruzar fuentes**: cada dato que aparezca en dos lugares (CLAUDE.md vs. comando, doc vs. código, template raíz vs. templates/) es un candidato a divergencia. Diffear.

Preguntas clave por área:

- **Estructura**: ¿Qué archivos no referencia nadie? ¿Qué docs describen un flujo que ya no existe? ¿Qué está duplicado byte a byte? ¿Los datos "de verdad" (links, precios) provienen de fuentes reales o hay señales de invención (placeholders, ASINs que no cruzan con links.js)?
- **HTML**: ¿Los links de afiliado llevan `rel="sponsored"`? ¿Las imágenes se piden al tamaño que se muestran? ¿Hay jerarquía de encabezados? ¿El escapado (`esc()`) se aplica en todos los renders? ¿El disclaimer de afiliados existe?
- **Publicación**: ¿Qué impide que un dato malo llegue a producción? (si la respuesta es "nada", esa es la mejora #1). ¿Cómo se detectan duplicados? ¿Qué pasos manuales se repiten cada semana?
- **Comandos**: ¿Los pasos están en orden y son ejecutables tal cual? ¿Coinciden con lo que dice CLAUDE.md? ¿Qué comando falta dado lo que se hace a mano? ¿Las herramientas que invocan existen en esta máquina? (aquí: no hay Node; hay `osascript`, `python3` y Chrome).

**Regla de oro del proyecto**: `git push` a `main` = publicar a producción. Verificar en preview local antes de pushear cualquier cambio de `index.html`/`links.js`.

---

## 3. Criterios de severidad

- **Alta** — puede publicar información falsa o rota a las seguidoras, perder comisiones (tag de afiliado incorrecto), o corromper `links.js`. Se arregla sí o sí.
- **Media** — costo real pero acotado: performance, SEO, docs que inducen a error a un modelo futuro, duplicación que va a divergir. Se arregla si el riesgo de romper algo es bajo.
- **Baja** — cosmético o marginal (contraste, títulos largos, campos de estilo). Se anota; solo se arregla si no toca contenido publicado sin permiso.

Priorización dentro de la Fase 2: primero lo que **previene** errores futuros (validador), luego lo que corrige datos existentes, luego flujos/comandos, luego lo cosmético, y la limpieza/borrados al final (siempre con confirmación explícita de Bibiana para borrar).

---

## 4. Checklists reutilizables

### Estructura
- [ ] `git status` limpio (nada suelto en la raíz sin explicación)
- [ ] Ningún archivo duplicado (diffear templates/copias sospechosas)
- [ ] Docs describen el flujo actual (comparar con `.claude/commands/`)
- [ ] Datos de productos cruzan contra `links.js` (sin ASINs/links huérfanos o placeholder)
- [ ] `.gitignore` cubre lo privado (admin, estrategia, descartados, settings)

### HTML (`index.html`)
- [ ] `osascript -l JavaScript scripts/validate-links.js` pasa
- [ ] Links de producto con `rel="sponsored noopener"` y `target="_blank"`
- [ ] Imágenes con `loading="lazy"`, `alt`, y sufijo `_AC_SX300_` (helper `thumb()`)
- [ ] Todo dato de `links.js` pasa por `esc()` al renderizar
- [ ] h1 único (marca), h2 secciones, h3 títulos de producto
- [ ] Disclaimer de afiliados visible en el footer
- [ ] Verificar en preview (servidor: `python3 -m http.server` vía Bash — el sandbox del preview no lee Documents; navegar el preview a ese puerto) y comparar visualmente antes de pushear

### Flujo de publicación
- [ ] El validador corre antes de cada commit que toca `links.js`
- [ ] Un solo `featured: true`; `highlight: true` solo en el carrusel vigente
- [ ] Duplicados: buscar el ID de media de la imagen y el título en `links.js` antes de agregar
- [ ] Tag `bibirecomie02-20` verificado en el dropdown de SiteStripe antes de copiar
- [ ] El deploy quedó al día: `curl -s https://bibirecomienda.github.io/links/links.js | grep "id: <nuevo>"`

### Skills y comandos
- [ ] Pasos numerados en orden y ejecutables literalmente
- [ ] Sin contradicciones con CLAUDE.md (CLAUDE.md remite, no duplica)
- [ ] Las herramientas invocadas existen (⚠️ esta máquina no tiene Node)
- [ ] Reglas anti-invención y anti-screenshot presentes en los comandos de Chrome

---

## 5. Mapa de comandos y skills vigentes

| Comando | Cuándo usarlo |
|---|---|
| `/agregar-link URL` | Bibiana pasa un link de Amazon y quiere publicarlo (producto suelto + historia IG) |
| `/crear-carrusel [fecha]` | Domingo/semanal: carrusel IG de 6 ofertas ≥30% con capturas y caption |
| `/validar-links` | Antes de cualquier commit que toque `links.js`; también para diagnosticar el estado |

Eliminados en esta auditoría (no buscar): `organize-weekly-carousel.js`, flujo "Cowork + outputs/", `update-links.js` (nunca existió).

---

## 6. Recomendaciones para integrar Mercado Libre

1. **No tocar la capa de datos ni el render.** `links.js` y `index.html` ya soportan `platform: "mercadolibre"` (badge "ML", label "Mercado Libre"). Un producto de ML es el mismo objeto con otra `platform` y su link de afiliado de ML en `url`.
2. **Clonar solo la etapa de extracción.** Crear `/agregar-link-ml` copiando la estructura de `agregar-link.md` y reemplazando únicamente los pasos 1–8 (navegación, selectores DOM, generación del link de afiliado de ML). Los pasos de normalización, badge, alta en `links.js`, validación, historia y git son idénticos — referenciarlos, no reescribirlos.
3. **Extender el validador, no bifurcarlo.** En `validate-links.js`, agregar al bloque de URL un caso `platform === 'mercadolibre'`: dominio esperado (`mercadolibre.com.co` o el acortador del programa de afiliados) y el equivalente del tag de afiliado. Todo lo demás (precios COP, duplicados, featured) ya aplica.
4. **Mismo formato COP** — ML ya muestra pesos colombianos; no hay conversión.
5. **Campañas**: los Hot Sale/Días Naranja de ML van en `BIBI_CAMPANAS` (ya hay un ejemplo comentado en `links.js`), no como productos.
6. **Antes de escribir el comando**, confirmar con Bibiana: cuenta del programa de afiliados de ML, formato del link generado, y si existe un equivalente de SiteStripe (si es manual, el comando debe pedir el link a Bibiana en vez de inventarlo).

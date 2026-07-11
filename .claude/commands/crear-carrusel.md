# Crear carrusel semanal

Crea el carrusel de Instagram de la semana: busca 6 productos en Amazon con ≥30% de descuento, genera el HTML de 8 slides, actualiza `links.js` y organiza los archivos.

**Uso:** `/crear-carrusel YYYY-MM-DD`

Si no se pasa fecha, calcular el próximo domingo desde hoy (para nombre de carpeta y commit). La **fecha que aparece visible en el slide de portada** es siempre la fecha actual (hoy), no la fecha del domingo.

---

## REGLAS ABSOLUTAS DE HERRAMIENTAS

> ⛔ **PROHIBIDO tomar screenshots** (`mcp__computer-use__screenshot` y cualquier otra herramienta de captura de pantalla). NUNCA se usan en este flujo.
>
> ⛔ **PROHIBIDO usar `WebFetch` o `web_fetch`** para ningún URL. Amazon requiere sesión activa.
>
> ⛔ **PROHIBIDO usar `mcp__computer-use__*`** para nada en este flujo — ni para ver la pantalla, ni para hacer clic, ni para nada.
>
> ✅ **Para navegar:** `mcp__Claude_in_Chrome__navigate`
> ✅ **Para leer datos de la página:** `mcp__Claude_in_Chrome__javascript_tool` (ejecuta JS en el DOM)
> ✅ **Para hacer clic en elementos:** `mcp__Claude_in_Chrome__javascript_tool` (con `.click()` en JS)
>
> Si un campo del DOM devuelve `undefined` o `null`, ese dato no está disponible — usar `""`. **Nunca tomar un screenshot como fallback.**
>
> ⛔ **PROHIBIDO inventar productos, precios, ASINs o links.** Cada producto del carrusel debe salir de una página real de Amazon navegada en Chrome, con su link `amzn.to/...` real capturado vía SiteStripe. Si Chrome no está disponible o SiteStripe no aparece, **detener el flujo y avisar a Bibiana** — nunca generar el carrusel con datos placeholder tipo `amzn.to/[TAG]`.

---

## Paso 0 — Preparar la fecha y rutas

- `FECHA` = argumento recibido o próximo domingo (formato `YYYY-MM-DD`) — usada para nombre de carpeta y commit
- `FECHA_HOY` = fecha real de hoy (formato `D de mes · YYYY`, ej: "25 de mayo · 2026") — **es la que aparece visible en el slide de portada**
- `CARPETA` = `carruseles/FECHA/`
- `HTML_DEST` = `carruseles/FECHA/carousel-instagram.html`
- `MD_DEST` = `carruseles/FECHA/ofertas-semana.md`
- Crear la carpeta si no existe: `mkdir -p "carruseles/FECHA/capturas"`

> ⚠️ **Regla de fecha visible:** La `cover-subtitle` del slide 1 siempre muestra `FECHA_HOY` (hoy), no `FECHA`. El carrusel se publica el día que se crea, no el domingo.

---

## Paso 1 — Abrir Chrome y buscar candidatos en Amazon

Abrir un tab con **`mcp__Claude_in_Chrome__tabs_context_mcp`** (createIfEmpty: true). Guardar el `tabId`.

Navegar a la página de deals con **`mcp__Claude_in_Chrome__navigate`**:
```
https://www.amazon.com/s?k=deals&rh=p_n_specials_match%3A2617333011&language=es_US
```

Alternativas por categoría (rotar cada semana):
- `https://www.amazon.com/s?k=hogar+descuento&language=es_US`
- `https://www.amazon.com/s?k=belleza+oferta&language=es_US`
- `https://www.amazon.com/s?k=cocina+amazon+deals&language=es_US`
- `https://www.amazon.com/s?k=moda+mujer+descuento&language=es_US`

**Leer los resultados de búsqueda con `mcp__Claude_in_Chrome__javascript_tool`** (no tomar screenshot):

```js
Array.from(document.querySelectorAll('[data-asin]'))
  .filter(el => el.dataset.asin && el.dataset.asin.length > 0)
  .slice(0, 15)
  .map(el => ({
    asin: el.dataset.asin,
    title: el.querySelector('h2 a span, .a-size-medium, .a-size-base-plus')?.innerText?.trim() || '',
    price: el.querySelector('.a-price .a-offscreen')?.innerText?.trim() || '',
    originalPrice: el.querySelector('.a-text-price .a-offscreen')?.innerText?.trim() || '',
    rating: el.querySelector('.a-icon-star-small .a-icon-alt, .a-icon-star .a-icon-alt')?.innerText?.trim() || '',
    url: el.querySelector('h2 a')?.href || '',
    image: el.querySelector('.s-image')?.src || ''
  }))
  .filter(p => p.title && p.price && p.asin)
```

Con la lista de candidatos, seleccionar 8–10 que parezcan tener descuento (originalPrice presente). Luego navegar a cada uno para verificar.

---

## Paso 2 — Extraer datos de cada producto (repetir hasta tener 6 con ≥30% descuento)

Para cada candidato, navegar con **`mcp__Claude_in_Chrome__navigate`**:
```
https://www.amazon.com/dp/ASIN?language=es_US
```

Luego extraer datos con **`mcp__Claude_in_Chrome__javascript_tool`**:

```js
const imgEl = document.querySelector('#landingImage, #imgBlkFront');
const deliveryEl = document.querySelector(
  '#deliveryBlockMessage, #mir-layout-DELIVERY_BLOCK, #deliveryMessage, #price-shipping-message'
);
({
  title:         document.querySelector('#productTitle')?.innerText?.trim() || '',
  price:         document.querySelector('.a-price .a-offscreen')?.innerText?.trim() || '',
  priceWhole:    document.querySelector('.a-price-whole')?.innerText?.trim() || '',
  originalPrice: document.querySelector('.a-text-price .a-offscreen')?.innerText?.trim() || '',
  rating:        document.querySelector('#acrPopover')?.title?.trim() || '',
  reviews:       document.querySelector('#acrCustomerReviewText')?.innerText?.trim() || '',
  breadcrumb:    document.querySelector('#wayfinding-breadcrumbs_feature_div')?.innerText?.trim() || '',
  coupon:        document.querySelector('.couponBadge, .promoPriceBlockMessage, [data-csa-c-type="coupon"], .vpcButton')?.innerText?.trim() || '',
  image:         imgEl?.getAttribute('data-old-hires') || imgEl?.src || '',
  shipping:      deliveryEl?.innerText?.trim() || '',
  siteStripe:    !!document.querySelector('#amzn-ss-wrap')
})
```

Si `shipping` quedó vacío, ejecutar con **`mcp__Claude_in_Chrome__javascript_tool`**:
```js
document.querySelector('#price-shipping-message, .a-color-secondary')?.innerText?.trim() || ''
```

> Si algún campo devuelve `''`, ese dato no existe — usar `""`. No tomar screenshot.

### Calcular descuento

```
descuento% = round((originalPrice - price) / originalPrice * 100)
```

Si el descuento es < 30%, descartar y pasar al siguiente candidato.

### Obtener link de afiliado via SiteStripe

Ejecutar con **`mcp__Claude_in_Chrome__javascript_tool`**:
```js
// 1. Abrir panel SiteStripe
const btn = Array.from(document.querySelectorAll('#amzn-ss-wrap a, #amzn-ss-wrap button'))
  .find(el => el.innerText?.includes('Obtener enlace'));
if (btn) { btn.click(); 'clicked'; } else 'not found';
```

Ejecutar con **`mcp__Claude_in_Chrome__javascript_tool`**:
```js
// 2. Verificar y forzar tag bibirecomie02-20
const sd = Array.from(document.querySelectorAll('[role="dialog"], dialog'))
  .find(d => d.innerText?.includes('Enlace'));
const sel = sd?.querySelector('select[name="amzn-ss-store-dropdown-text"]');
if (sel && sel.value !== 'bibirecomie02-20') sel.value = 'bibirecomie02-20';
sel?.value || 'no dialog';
```

Ejecutar con **`mcp__Claude_in_Chrome__javascript_tool`**:
```js
// 3. Seleccionar "Enlace corto" y leer el link del input
const sd = Array.from(document.querySelectorAll('[role="dialog"], dialog'))
  .find(d => d.innerText?.includes('Enlace'));
const shortOpt = Array.from(sd?.querySelectorAll('input, label, span, div') || [])
  .find(el => el.innerText?.trim() === 'Enlace corto' || el.textContent?.trim() === 'Enlace corto');
if (shortOpt) shortOpt.click();
const inp = sd?.querySelector('input[type="text"], textarea');
inp?.value || 'no input found';
```

### Mapeo de categoría desde breadcrumb

| Breadcrumb contiene | Categoría |
|---|---|
| Animales / Mascotas / Pet | `mascotas` |
| Electrónica / Computadora / Teléfono | `tecnologia` |
| Belleza / Cuidado / Maquillaje | `belleza` |
| Ropa / Moda / Zapatos / Bolso | `moda` |
| Hogar / Decoración / Jardín | `hogar` |
| Cocina / Alimentos / Utensilios | `cocina` |
| Deportes / Fitness / Exterior | `deporte` |
| Juguetes / Bebés / Niños | `ninos` |
| Otro / no coincide | `otros` |

### Interpretar envío

| Texto detectado | Valor `shipping` |
|---|---|
| "Envío GRATIS", "FREE delivery", "gratis con Prime" | `"gratis"` |
| "Gratis con pedidos de COP $XX" | `"gratis"` |
| "+COP $X.XXX de envío" | `"COP $X.XXX"` |
| Sin texto | `""` |

---

## Paso 3 — Generar el carousel HTML

Con los 6 productos extraídos, crear el archivo HTML en `HTML_DEST`. **COPIAR EXACTAMENTE** la estructura de `templates/carousel-instagram-template.html`:

**Especificaciones:**
- **Tamaño:** 1080×1350px (formato 4:5, resolución nativa de Instagram — NO 520×520)
- **Paleta de colores:**
  - Primario: #A04A36 (terracota/marrón)
  - Secundario: #C9985E (dorado)
  - Neutro: #9C7A6F (beige oscuro)
  - Fondo: #FAF1E8 (crema)
- **Tipografía:**
  - Títulos: Cormorant Garamond (serif)
  - Body: Inter (sans-serif)
- **Estructura de 8 slides:**
  1. **Portada:** Logo "Bibi", tagline "recomienda", `FECHA_HOY` en `cover-subtitle` (ej. "25 de mayo · 2026") — **nunca la fecha del domingo**, máximo descuento en `cover-pill` (ej. "Hasta −42% en Amazon")
  2-7. **Productos:** Imagen (área de 760px), badge plataforma (arriba izq.) y badge descuento o rating (arriba der.), kicker de categoría (texto dorado, NO badge sobre la foto), nombre serif grande, copy cálido de **máximo 2 oraciones**, precio tachado + precio actual, pill `📦 Envío gratis` solo si `shipping: "gratis"`
  8. **CTA:** "¿Cuál te enamoró?" + "links en mi bio" + "@bibi.recomienda" + disclaimer de precios/afiliados. **Sin hashtags** (van solo en ofertas-semana.md)

**Copy de productos:** Tono Bibiana — directo, cálido, con detalle específico que enamore. **Máximo 2 oraciones** (a 1080px el espacio es generoso pero el copy corto vende más).

**Imágenes:** URLs de Amazon con patrón SX679 (ej. `https://m.media-amazon.com/images/I/71rK6qZJDDL._AC_SX679_.jpg`)

**Template de referencia:** `templates/carousel-instagram-template.html` (copiar estilos CSS exactamente)

---

## Paso 4 — Generar ofertas-semana.md

Crear `MD_DEST` con este formato:

```markdown
# Ofertas semana YYYY-MM-DD

## Productos

| # | Producto | Precio | Descuento | Categoría | Link |
|---|---|---|---|---|---|
| 1 | Nombre | COP $XXX | -XX% | categoria | https://amzn.to/... |
...

## Caption Instagram

✨ [TÍTULO ATRACTIVO que enganche en la primera línea] ✨

[1-2 oraciones de intro presentando la selección, tono Bibi — directo y cálido]

[Para cada producto, una línea con emoji relevante + descripción de 1 oración que aluda a lo que lo hace especial + % de descuento]

🛍️ Los links están en mi bio ❤️

💬 ¿Cuál te enamoró? Cuéntame abajo 👇

**Hashtags — reglas:**
- Siempre incluir: `#bibirecomienda`
- Agregar 8-10 hashtags de buen posicionamiento relevantes a los productos de esa semana (moda, hogar, tecnología, etc.)
- NO usar hashtags genéricos de bajo impacto como #deals #ahorra #finds
- Ejemplos de hashtags de buen alcance por categoría:
  - Moda: #modaverano #vestidofloral #outfitideas #accesoriosmujer #fashionlatina
  - Hogar: #organizacionhogar #decoracionhogar #hogarboho #homeinspo
  - Tecnología: #auricularesbluetooth #techdeals #gadgets #tecnologialatina
  - Niños: #mamascolombia #mamasbloggeras #kidsfashion #escuelacolombia
  - Viaje: #viajesColombia #travellatam #equipajedeviaje
```

---

## Paso 5 — Actualizar links.js

Leer el archivo `links.js` actual. Obtener el `id` máximo existente.

Para cada uno de los 6 productos, agregar al inicio del array `BIBI_LINKS` un objeto con:
- `id`: max + posición (1 al 6)
- `title`: título corto (máx 60 chars)
- `platform`: `"amazon"`
- `category`: categoría detectada
- `url`: link `amzn.to/...` capturado
- `image`: URL de imagen principal
- `price`: en COP con punto como separador (ej. `"COP $549.674"`)
- `originalPrice`: precio tachado si existe, `""` si no
- `badge`: elegir según prioridad:
  - Descuento ≥ 40% → `"🔥 XX% OFF"`
  - Descuento 15–39% → `"🏷️ XX% OFF"`
  - Envío gratis como dato destacado → `"📦 Envío gratis"`
  - Sin descuento, con rating → `"⭐ X.X · Xk+ opiniones"`
  - Top de categoría → `"🏆 #1 en [categoría]"`
  - Sin datos suficientes → `"✨ Nuevo"`
- `coupon`: texto del cupón detectado o `""`
- `shipping`: valor calculado en Paso 2
- `featured`: `false` (solo uno puede ser `true` a la vez)
- `active`: `true`
- `highlight`: `true`
- `date`: FECHA

Cambiar `highlight: true` a `highlight: false` en todos los productos anteriores que lo tenían.

---

## Paso 6 — Cerrar el tab de Chrome

```
mcp__Claude_in_Chrome__tabs_close_mcp (tabId usado)
```

---

## Paso 7 — Generar capturas PNG automáticamente

El carousel HTML soporta el parámetro `?s=N` para mostrar un solo slide. Se usa Chrome headless (igual que las historias de `/agregar-link`) sin ningún servidor especial.

> ⚠️ **IMPORTANTE:** El HTML del carrusel DEBE incluir el siguiente script al final del `<body>` para que `?s=N` funcione. Ya está incluido en la plantilla — no eliminarlo:
> ```html
> <script>
> (function() {
>   const s = new URLSearchParams(location.search).get('s');
>   if (!s) return;
>   document.body.style.cssText = 'margin:0;padding:0;background:transparent;';
>   document.querySelectorAll('.page-title, .slide-label').forEach(el => el.remove());
>   const outers = document.querySelectorAll('.slide-outer');
>   outers.forEach((el, i) => { el.style.display = (i + 1 === +s) ? 'flex' : 'none'; });
>   const target = outers[+s - 1];
>   if (target) { target.style.margin = '0'; target.style.justifyContent = 'center'; }
> })();
> </script>
> ```

### 7a — Levantar servidor de archivos

```bash
kill $(lsof -ti:8765) 2>/dev/null
cd "/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda" && python3 -m http.server 8765 &
sleep 1
```

### 7b — Capturar cada slide con Chrome headless

Reemplazar `FECHA` con la fecha real y `N_SLIDES` con el número total de slides (portada + productos + CTA):

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="http://localhost:8765/carruseles/FECHA/carousel-instagram.html"
OUT="/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda/carruseles/FECHA/capturas"

for i in $(seq 1 N_SLIDES); do
  "$CHROME" \
    --headless=new \
    --screenshot="$OUT/bibi-slide-$i.png" \
    --window-size=1080,1350 \
    --hide-scrollbars \
    --disable-gpu \
    "${BASE}?s=${i}" 2>/dev/null
done

kill $(lsof -ti:8765) 2>/dev/null
```

---

## Paso 8 — Validar y commit a Git

**Validar antes de commitear** (si sale con error, corregir `links.js` y repetir):

```bash
cd "/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda"
osascript -l JavaScript scripts/validate-links.js
```

Solo si la validación pasa:

```bash
git add carruseles/FECHA/ links.js
git commit -m "Carrusel semanal FECHA

- 6 productos nuevos con highlight: true
- Descuentos entre XX% y XX%
- Carousel HTML generado (8 slides, portada con fecha HOY)
- 8 capturas PNG 1080×1350px en capturas/
- Caption Instagram listo

Co-Authored-By: Claude <noreply@anthropic.com>"
git push
```

---

## Resultado esperado

Al terminar, mostrar un resumen:

```
✅ Carrusel FECHA listo

Productos:
  1. [título] — COP $XXX (-XX%) → amzn.to/...
  2. ...
  6. ...

Archivos:
  📄 carruseles/FECHA/carousel-instagram.html (1080×1350px 4:5, 8 slides)
  📝 carruseles/FECHA/ofertas-semana.md (tabla + caption Instagram)
  🖼️  carruseles/FECHA/capturas/ (8 PNGs generados automáticamente)

Siguiente paso:
  Subir los 8 PNGs de capturas/ a Instagram como carrusel
  Copiar el caption de ofertas-semana.md
```

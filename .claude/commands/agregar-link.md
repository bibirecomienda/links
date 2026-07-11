# Agregar link de Amazon

Agrega un producto de Amazon a `links.js`: navega al producto en Chrome, extrae los datos, genera el link de afiliado con SiteStripe y sube los cambios a GitHub.

**Uso:** `/agregar-link URL_DEL_PRODUCTO`

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

---

## Paso 1 — Preparar el URL

Si el URL es largo (>2000 chars) o tiene parámetros de rastreo, extraer el ASIN y construir:
```
https://www.amazon.com/dp/ASIN?language=es_US
```

---

## Paso 2 — Abrir Chrome y navegar al producto

```
mcp__Claude_in_Chrome__tabs_context_mcp (createIfEmpty: true)
```
Guardar el `tabId`. Luego navegar:
```
mcp__Claude_in_Chrome__navigate → URL preparado en Paso 1
```

Esperar a que la página cargue completamente antes de continuar.

---

## Paso 3 — Extraer información del producto

Ejecutar con **`mcp__Claude_in_Chrome__javascript_tool`**:

```js
const imgEl = document.querySelector('#landingImage, #imgBlkFront');
const deliveryEl = document.querySelector(
  '#deliveryBlockMessage, #mir-layout-DELIVERY_BLOCK, #deliveryMessage, #price-shipping-message'
);
const deliveryText = deliveryEl?.innerText?.trim() || '';
({
  title:         document.querySelector('#productTitle')?.innerText?.trim() || '',
  price:         document.querySelector('.a-price .a-offscreen')?.innerText?.trim() || '',
  originalPrice: document.querySelector('.a-text-price .a-offscreen')?.innerText?.trim() || '',
  rating:        document.querySelector('#acrPopover')?.title?.trim() || '',
  reviews:       document.querySelector('#acrCustomerReviewText')?.innerText?.trim() || '',
  category:      document.querySelector('#wayfinding-breadcrumbs_feature_div')?.innerText?.trim() || '',
  coupon:        document.querySelector('.couponBadge, .promoPriceBlockMessage, [data-csa-c-type="coupon"], .vpcButton')?.innerText?.trim() || '',
  image:         imgEl?.getAttribute('data-old-hires') || imgEl?.src || '',
  siteStripe:    !!document.querySelector('#amzn-ss-wrap'),
  shipping:      deliveryText
})
```

Si `shipping` quedó vacío, intentar con **`mcp__Claude_in_Chrome__javascript_tool`**:
```js
document.querySelector('#price-shipping-message, .a-color-secondary')?.innerText?.trim() || ''
```

> Si algún campo devuelve `''` o `undefined`, ese dato no existe en la página — continuar con `""`. No tomar screenshot.

---

## Paso 4 — Abrir SiteStripe

Ejecutar con **`mcp__Claude_in_Chrome__javascript_tool`**:
```js
const btn = Array.from(document.querySelectorAll('#amzn-ss-wrap a, #amzn-ss-wrap button'))
  .find(el => el.innerText?.includes('Obtener enlace'));
if (btn) { btn.click(); 'clicked'; } else 'not found';
```

---

## Paso 5 — Capturar el link corto de afiliado

**Primero verificar y forzar el tag `bibirecomie02-20`** con **`mcp__Claude_in_Chrome__javascript_tool`**:
```js
const sd = Array.from(document.querySelectorAll('[role="dialog"], dialog'))
  .find(d => d.innerText?.includes('Enlace'));
const sel = sd?.querySelector('select[name="amzn-ss-store-dropdown-text"]');
if (sel && sel.value !== 'bibirecomie02-20') sel.value = 'bibirecomie02-20';
sel?.value || 'no dialog';
```

Luego capturar el link con **`mcp__Claude_in_Chrome__javascript_tool`**:
```js
const sd = Array.from(document.querySelectorAll('[role="dialog"], dialog'))
  .find(d => d.innerText?.includes('Enlace'));
const shortOpt = Array.from(sd?.querySelectorAll('input, label, span, div') || [])
  .find(el => el.innerText?.trim() === 'Enlace corto' || el.textContent?.trim() === 'Enlace corto');
if (shortOpt) shortOpt.click();
const inp = sd?.querySelector('input[type="text"], textarea');
inp?.value || 'no input found';
```

El resultado debe ser algo como `"https://amzn.to/XXXXXX"`. Ese es el link de afiliado.

---

## Paso 6 — Detectar categoría

Usar el campo `category` (breadcrumb) obtenido en el Paso 3:

| Breadcrumb contiene | Categoría |
|---|---|
| Animales / Mascotas / Pet | `mascotas` |
| Electrónica / Computadora / Teléfono / Mouse / Teclado | `tecnologia` |
| Belleza / Cuidado / Maquillaje | `belleza` |
| Ropa / Moda / Zapatos / Bolso | `moda` |
| Hogar / Decoración / Jardín | `hogar` |
| Cocina / Alimentos / Utensilios | `cocina` |
| Deportes / Fitness / Exterior | `deporte` |
| Juguetes / Bebés / Niños | `ninos` |
| Otro / no coincide | `otros` |

---

## Paso 7 — Formatear el precio

- Formato siempre en COP: `COP $549.674` (punto como separador de miles, sin decimales)
- La cuenta ya tiene COP configurado — el precio aparece directo en pesos colombianos
- Si hay precio tachado: llenar `originalPrice` también en COP
- **Si el precio aparece en USD:** cambiar la moneda directamente en Amazon navegando a la página de preferencias de moneda y seleccionando COP, luego volver al producto para leer el precio correcto. Ejecutar con **`mcp__Claude_in_Chrome__javascript_tool`**:
```js
// Paso 1 — Abrir el selector de moneda en la misma página
const currencyLink = document.querySelector('#icp-touch-link-cop, a[href*="currency=COP"], #nav-global-location-popover-link');
if (currencyLink) currencyLink.click();
'abierto';
```
Si no funciona, navegar directamente a la página de cambio de moneda:
```
mcp__Claude_in_Chrome__navigate → https://www.amazon.com/gp/customer-preferences/select-language/ref=topnav_lang?preferencesReturnUrl=%2Fdp%2FASIN
```
Una vez en COP, volver al producto (`mcp__Claude_in_Chrome__navigate → https://www.amazon.com/dp/ASIN?language=es_US`) y releer el precio con el JS del Paso 3.
> **Nunca calcular manualmente la conversión USD → COP.** Siempre obtener el precio real en COP directamente desde la página de Amazon.

---

## Paso 8 — Interpretar el envío

| Texto detectado | Valor `shipping` |
|---|---|
| "Envío GRATIS" / "FREE delivery" / "gratis con Prime" | `"gratis"` |
| "Gratis con pedidos de COP $XX" (umbral) | `"gratis"` |
| "+COP $X.XXX de envío" / "COP X.XXX de envío" | `"COP $X.XXX"` (formateado) |
| Sin texto detectado | `""` |

---

## Paso 9 — Elegir el badge

| Situación | Badge |
|---|---|
| Descuento ≥ 40% | `🔥 XX% OFF` |
| Descuento 15–39% | `🏷️ XX% OFF` |
| Envío gratis como dato destacado | `📦 Envío gratis` |
| Sin descuento, con rating | `⭐ X.X · Xk+ opiniones` |
| Producto top de categoría | `🏆 #1 en [categoría]` |
| Sin datos suficientes | `✨ Nuevo` |

---

## Paso 10 — Agregar a links.js

**Chequear duplicados primero:** buscar en `links.js` el ID de media de la imagen (ej. `616zZxB0g1L` de la URL de imagen) y palabras clave del título. Si el producto ya existe:
- Si está `active: true` → avisar a Bibiana y **no agregarlo de nuevo** (ofrecer actualizar precio/datos del existente).
- Si está `active: false` → reactivarlo actualizando sus datos en lugar de crear otro.

Si no existe, leer `links.js`, obtener el `id` máximo y agregar al **inicio** del array `BIBI_LINKS`:

```js
{
  id: MAX_ID + 1,
  title: "Título corto (máx 60 chars)",
  platform: "amazon",
  category: "categoria",
  url: "https://amzn.to/XXXXXX",
  image: "https://m.media-amazon.com/...",
  price: "COP $XXX.XXX",
  originalPrice: "",           // solo si hay descuento
  badge: "...",
  coupon: "",                  // texto del cupón o ""
  shipping: "gratis",          // "gratis" | "COP $X.XXX" | ""
  highlight: false,
  featured: false,
  active: true,
  date: "YYYY-MM-DD"          // fecha de hoy
}
```

---

## Paso 11 — Cerrar el tab de Chrome

```
mcp__Claude_in_Chrome__tabs_close_mcp (tabId usado)
```

---

## Paso 12 — Generar historia de IG

Crear el archivo HTML de la historia y capturarlo como PNG listo para subir.

### 12a — Crear el HTML de la historia

Leer la plantilla **`templates/historia-ig-template.html`** (1080×1920, con zonas seguras de IG ya resueltas: nada importante en el top 250px ni en el bottom 280px) y escribir `story-export/historia-[SLUG].html` reemplazando las variables `{{ }}`:

- `[SLUG]` = título simplificado en minúsculas con guiones, máx 30 chars (ej: `hervidor-koios`)

| Variable | Valor |
|---|---|
| `{{ CATEGORIA_LABEL }}` | Categoría legible con emoji (ej: `🐱 Mascotas`, `🍳 Cocina`, `👗 Moda`) |
| `{{ IMAGE_URL }}` | URL de la imagen principal del producto |
| `{{ TITLE_CORTO }}` | Título corto (para el `alt`) |
| `{{ RATING_BADGE }}` | Rating (ej: `4.3 / 5 · 927 opiniones`); si no hay, usar `✨ Nuevo` |
| `{{ DISCOUNT_BADGE_HTML }}` | Con descuento: `<div class="discount-badge">🔥 XX% OFF</div>` — sin descuento: `""` |
| `{{ TITULO_DISPLAY }}` | 2-4 palabras clave del producto + emoji de categoría (ej: `Hervidor Eléctrico KOIOS ☕`) |
| `{{ PRICE_BEFORE_HTML }}` | Con precio tachado: `<span class="price-before">COP $XXX.XXX</span>` — sin: `""` |
| `{{ PRICE }}` | Precio actual en COP (ej: `COP $162.667`) |
| `{{ SHIPPING_HTML }}` | Ver tabla abajo |

**`{{ SHIPPING_HTML }}` según caso:**

- Envío gratis:
```html
<div class="ship-line">📦 Envío <span class="ok">gratis incluido ✓</span></div>
```
- Envío con costo (calcular el total = precio + envío):
```html
<div class="ship-line">🚚 + COP $XX.XXX de envío · Total ≈ <span class="ok">COP $XXX.XXX</span></div>
```
- Sin datos de envío → `""` (omitir)

> La historia **no muestra el URL del producto**: el link va en el **sticker de Instagram**, que Bibiana coloca encima del pill oscuro "El link está aquí 👇".

### 12b — Verificar que el servidor local esté corriendo

```bash
lsof -i :8765 | grep LISTEN || (cd "/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda" && python3 -m http.server 8765 &)
sleep 1
```

### 12c — Capturar como PNG con Chrome headless

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new \
  --screenshot="/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda/story-export/historia-[SLUG].png" \
  --window-size=1080,1920 \
  --hide-scrollbars \
  --disable-gpu \
  "http://localhost:8765/story-export/historia-[SLUG].html" 2>/dev/null
```

El archivo PNG queda en `story-export/historia-[SLUG].png`, listo para subir como historia de IG.

---

## Paso 13 — Validar y subir a GitHub

**Validar antes de commitear** (si sale con error, corregir `links.js` y repetir):

```bash
cd "/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda"
osascript -l JavaScript scripts/validate-links.js
```

Solo si la validación pasa:

```bash
git add links.js story-export/
git commit -m "Agregar producto: TITULO_CORTO

[descripción breve del producto]

Co-Authored-By: Claude <noreply@anthropic.com>"
git push
```

---

## Resultado esperado

Al terminar, mostrar un resumen:

```
✅ Producto agregado

  🏷️  TÍTULO
  💰  COP $XXX.XXX
  📦  Envío: gratis / COP $X.XXX / no detectado
  🔗  https://amzn.to/XXXXXX
  📂  Categoría: tecnologia
  🆔  ID: X
  🖼️  Historia: story-export/historia-[SLUG].png

Subido a GitHub ✓
```

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

Ejecutar con **`mcp__Claude_in_Chrome__javascript_tool`**:
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

Leer `links.js`, obtener el `id` máximo y agregar al **inicio** del array `BIBI_LINKS`:

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

## Paso 13 — Generar historia de IG

Crear el archivo HTML de la historia y capturarlo como PNG listo para subir.

### 13a — Crear el HTML de la historia

Escribir el archivo `story-export/historia-[SLUG].html` con los datos del producto.
- `[SLUG]` = título simplificado en minúsculas con guiones, máx 30 chars (ej: `caja-arena-autolimpiante`)
- Usar la plantilla de abajo, reemplazando los valores entre `{{ }}`
- Si hay envío de costo → mostrar fila de envío y fila de total
- Si envío es `"gratis"` → mostrar solo fila de envío con texto "Envío gratis incluido"
- Si envío es `""` → omitir ambas filas
- Si hay `originalPrice` y `price` → calcular `% OFF = round((1 - precio/original) * 100)` y mostrarlo en el badge de descuento

**Plantilla HTML:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Historia IG</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --bg: #F4DDD7; --surface: #FBEAE4; --cream: #FAF1E8; --card: #FFFFFF;
    --ink: #3B2521; --muted: #9C7A6F; --accent: #A04A36; --rule: #E5C9C0; --gold: #C9985E;
  }
  body { width: 1080px; height: 1920px; overflow: hidden; font-family: 'Inter', sans-serif; background: var(--bg); }
  .story {
    width: 1080px; height: 1920px; position: relative;
    background: radial-gradient(ellipse at top left, rgba(201,152,94,0.18) 0%, transparent 50%),
                radial-gradient(ellipse at bottom right, rgba(160,74,54,0.12) 0%, transparent 50%),
                var(--bg);
    display: flex; flex-direction: column; align-items: center;
  }
  .deco1 { position:absolute; top:-180px; right:-180px; width:560px; height:560px; border-radius:50%; background:radial-gradient(circle,rgba(160,74,54,0.10) 0%,transparent 70%); }
  .deco2 { position:absolute; bottom:200px; left:-120px; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(201,152,94,0.12) 0%,transparent 70%); }
  .header { position:relative; z-index:10; width:100%; padding:72px 72px 0; display:flex; align-items:center; gap:24px; }
  .avatar { width:100px; height:100px; border-radius:50%; border:3px solid var(--gold); overflow:hidden; flex-shrink:0; }
  .avatar img { width:100%; height:100%; object-fit:cover; }
  .handle { display:flex; flex-direction:column; }
  .handle-name { font-family:'Cormorant Garamond',Georgia,serif; font-size:40px; font-weight:700; color:var(--ink); }
  .handle-sub { font-size:26px; color:var(--muted); margin-top:4px; }
  .cat-badge { margin-left:auto; background:var(--accent); border-radius:60px; padding:14px 34px; font-size:26px; font-weight:700; color:#fff; flex-shrink:0; }
  .divider { width:calc(100% - 144px); height:1.5px; background:var(--rule); margin:28px 0 0; }
  .pick-label { position:relative; z-index:10; margin-top:40px; display:flex; align-items:center; gap:16px; font-family:'Cormorant Garamond',Georgia,serif; font-size:36px; font-weight:600; color:var(--muted); letter-spacing:2px; text-transform:uppercase; }
  .pick-line { width:70px; height:1.5px; background:var(--rule); }
  .img-wrap { position:relative; z-index:10; margin-top:36px; width:820px; height:820px; border-radius:40px; overflow:hidden; background:var(--card); box-shadow:0 8px 24px rgba(59,37,33,0.08),0 36px 90px rgba(59,37,33,0.14); }
  .img-wrap img { width:100%; height:100%; object-fit:contain; padding:24px; }
  .img-badge { position:absolute; top:28px; left:28px; background:var(--accent); color:#fff; font-size:26px; font-weight:700; padding:12px 26px; border-radius:40px; }
  .discount-badge { position:absolute; top:28px; right:28px; background:var(--gold); color:#fff; font-size:28px; font-weight:800; padding:14px 28px; border-radius:40px; }
  .info { position:relative; z-index:10; margin-top:44px; width:936px; background:var(--cream); border:1.5px solid var(--rule); border-radius:36px; padding:44px 52px; }
  .prod-title { font-family:'Cormorant Garamond',Georgia,serif; font-size:50px; font-weight:700; color:var(--ink); line-height:1.2; margin-bottom:28px; }
  .price-row { display:flex; align-items:center; padding:24px 32px; background:var(--accent); border-radius:24px; margin-bottom:16px; }
  .price-label { font-size:26px; font-weight:600; color:rgba(255,255,255,0.7); text-transform:uppercase; letter-spacing:1px; }
  .price-value { font-size:68px; font-weight:800; color:#fff; letter-spacing:-1px; line-height:1; margin-left:auto; }
  .ship-row { display:flex; align-items:center; justify-content:space-between; padding:20px 32px; background:var(--surface); border:1.5px solid var(--rule); border-radius:20px; margin-bottom:12px; }
  .ship-label { font-size:26px; color:var(--muted); }
  .ship-value { font-size:34px; font-weight:700; color:var(--ink); }
  .total-row { display:flex; align-items:center; justify-content:space-between; padding:20px 32px; background:var(--cream); border:1.5px solid var(--rule); border-radius:20px; }
  .total-label { font-size:26px; color:var(--muted); }
  .total-value { font-size:34px; font-weight:700; color:var(--accent); }
  .cta { position:relative; z-index:10; margin-top:32px; width:936px; background:var(--ink); border-radius:32px; padding:36px 48px; display:flex; align-items:center; justify-content:space-between; }
  .cta-left { display:flex; flex-direction:column; }
  .cta-action { font-size:36px; font-weight:700; color:#fff; }
  .cta-link { font-size:26px; color:var(--gold); margin-top:6px; }
  .cta-arrow { font-size:48px; color:var(--gold); }
  .sticker-zone { position:relative; z-index:10; margin-top:auto; margin-bottom:52px; width:936px; min-height:120px; background:var(--surface); border:2px dashed var(--rule); border-radius:32px; display:flex; align-items:center; justify-content:center; }
  .sticker-hint { font-size:28px; color:var(--rule); }
</style>
</head>
<body>
<div class="story">
  <div class="deco1"></div><div class="deco2"></div>
  <div class="header">
    <div class="avatar"><img src="../bibirecomiendaimage.jpg" alt="Bibi"></div>
    <div class="handle">
      <span class="handle-name">Bibi Recomienda</span>
      <span class="handle-sub">@bibi.recomienda</span>
    </div>
    <div class="cat-badge">{{ CATEGORIA_LABEL }}</div>
  </div>
  <div class="divider"></div>
  <div class="pick-label"><div class="pick-line"></div>Pick del día<div class="pick-line"></div></div>
  <div class="img-wrap">
    <img src="{{ IMAGE_URL }}" alt="{{ TITLE_CORTO }}">
    <div class="img-badge">{{ RATING_BADGE }}</div>
    {{ DISCOUNT_BADGE_HTML }}
  </div>
  <div class="info">
    <div class="prod-title">{{ TITULO_DISPLAY }}</div>
    <div class="price-row">
      <span class="price-label">Precio</span>
      <span class="price-value">{{ PRICE }}</span>
    </div>
    {{ SHIPPING_HTML }}
  </div>
  <div class="cta">
    <div class="cta-left">
      <span class="cta-action">Ver en Amazon</span>
      <span class="cta-link">{{ URL_CORTO }}</span>
    </div>
    <span class="cta-arrow">→</span>
  </div>
  <div class="sticker-zone"><span class="sticker-hint">Sticker de link aquí</span></div>
</div>
</body>
</html>
```

**Variables a reemplazar:**

| Variable | Valor |
|---|---|
| `{{ CATEGORIA_LABEL }}` | Nombre legible de la categoría (ej: `🐱 Mascotas`, `💻 Tecnología`, `👗 Moda`) |
| `{{ IMAGE_URL }}` | URL de la imagen del producto |
| `{{ TITLE_CORTO }}` | Título corto del producto |
| `{{ RATING_BADGE }}` | Badge de rating (ej: `4.1 / 5 · 1K+ opiniones`) |
| `{{ DISCOUNT_BADGE_HTML }}` | Si hay descuento: `<div class="discount-badge">🔥 XX% OFF</div>` — si no: `""` |
| `{{ TITULO_DISPLAY }}` | 2-3 palabras clave del producto seguidas de emoji de categoría |
| `{{ PRICE }}` | Precio en COP (ej: `COP $465.165`) |
| `{{ SHIPPING_HTML }}` | Ver tabla abajo |
| `{{ URL_CORTO }}` | Solo el dominio + path del link (ej: `amzn.to/4nOg87a`) |

**`{{ SHIPPING_HTML }}` según caso:**

- Envío con costo → incluir ambas filas:
```html
<div class="ship-row"><span class="ship-label">Envío a Colombia</span><span class="ship-value">+ {{ SHIPPING }}</span></div>
<div class="total-row"><span class="total-label">Total estimado</span><span class="total-value">≈ {{ TOTAL }}</span></div>
```
- Envío gratis:
```html
<div class="ship-row"><span class="ship-label">Envío</span><span class="ship-value" style="color:var(--accent)">Gratis incluido ✓</span></div>
```
- Sin datos de envío → `""` (omitir)

### 13b — Verificar que el servidor local esté corriendo

```bash
lsof -i :8765 | grep LISTEN || (cd "/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda" && python3 -m http.server 8765 &)
sleep 1
```

### 13c — Capturar como PNG con Chrome headless

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

## Paso 12 — Subir a GitHub

```bash
cd "/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda"
git add links.js story-export/
git commit -m "Agregar producto: TITULO_CORTO

[descripción breve del producto]

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
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

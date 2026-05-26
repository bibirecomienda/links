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

## Paso 4 — Abrir SiteStripe y verificar el tag

> ⚠️ El tag de afiliado siempre debe ser **`bibirecomie02-20`**. Verificar y forzar antes de copiar.

Ejecutar con **`mcp__Claude_in_Chrome__javascript_tool`**:
```js
const btn = Array.from(document.querySelectorAll('#amzn-ss-wrap a, #amzn-ss-wrap button'))
  .find(el => el.innerText?.includes('Obtener enlace'));
if (btn) { btn.click(); 'clicked'; } else 'not found';
```

Luego ejecutar con **`mcp__Claude_in_Chrome__javascript_tool`**:
```js
const sd = Array.from(document.querySelectorAll('[role="dialog"], dialog'))
  .find(d => d.innerText?.includes('Enlace'));
const sel = sd?.querySelector('select[name="amzn-ss-store-dropdown-text"]');
if (sel && sel.value !== 'bibirecomie02-20') sel.value = 'bibirecomie02-20';
sel?.value || 'no dialog found';
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
- Si excepcionalmente aparece en USD, ejecutar con **`mcp__Claude_in_Chrome__javascript_tool`**:
```js
fetch('https://open.er-api.com/v6/latest/USD')
  .then(r => r.json())
  .then(d => Math.round(PRECIO_USD * d.rates.COP))
```

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

## Paso 12 — Subir a GitHub

```bash
cd "/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda"
git add links.js
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

Subido a GitHub ✓
```

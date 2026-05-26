# Agregar link de Amazon

Agrega un producto de Amazon a `links.js`: navega al producto en Chrome, extrae los datos, genera el link de afiliado con SiteStripe y sube los cambios a GitHub.

**Uso:** `/agregar-link URL_DEL_PRODUCTO`

El URL puede ser largo (de una búsqueda) o corto (`amzn.to/...`). Si el ASIN es visible, se construye la URL corta automáticamente.

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

> ⚠️ Los links `amzn.to` no se pueden fetch con web_fetch — siempre navegar en Chrome.

---

## Paso 3 — Extraer información del producto

```js
const imgEl = document.querySelector('#landingImage, #imgBlkFront');
const deliveryEl = document.querySelector(
  '#deliveryBlockMessage, #mir-layout-DELIVERY_BLOCK, #deliveryMessage, #price-shipping-message'
);
const deliveryText = deliveryEl?.innerText?.trim() || '';
({
  title:    document.querySelector('#productTitle')?.innerText?.trim(),
  price:    document.querySelector('.a-price .a-offscreen')?.innerText?.trim(),
  originalPrice: document.querySelector('.a-text-price .a-offscreen')?.innerText?.trim() || '',
  rating:   document.querySelector('#acrPopover')?.title?.trim(),
  reviews:  document.querySelector('#acrCustomerReviewText')?.innerText?.trim(),
  category: document.querySelector('#wayfinding-breadcrumbs_feature_div')?.innerText?.trim(),
  coupon:   document.querySelector('.couponBadge, .promoPriceBlockMessage, [data-csa-c-type="coupon"], .vpcButton')?.innerText?.trim() || '',
  image:    imgEl?.getAttribute('data-old-hires') || imgEl?.src || '',
  siteStripe: !!document.querySelector('#amzn-ss-wrap'),
  shipping: deliveryText
})
```

Buscar también el costo de envío explícito si el texto de entrega no lo incluye:
```js
document.querySelector('#price-shipping-message, .a-color-secondary')?.innerText?.trim()
```

---

## Paso 4 — Abrir SiteStripe y verificar el tag

> ⚠️ El tag de afiliado siempre debe ser **`bibirecomie02-20`**. Verificar y forzar antes de copiar el link.

```js
// Abrir panel
const btn = Array.from(document.querySelectorAll('#amzn-ss-wrap a, #amzn-ss-wrap button'))
  .find(el => el.innerText?.includes('Obtener enlace'));
if (btn) btn.click();
```

```js
// Verificar y forzar tag bibirecomie02-20
const sd = Array.from(document.querySelectorAll('[role="dialog"], dialog'))
  .find(d => d.innerText?.includes('Enlace'));
const sel = sd?.querySelector('select[name="amzn-ss-store-dropdown-text"]');
if (sel && sel.value !== 'bibirecomie02-20') sel.value = 'bibirecomie02-20';
```

---

## Paso 5 — Capturar el link corto de afiliado

```js
// Seleccionar "Enlace corto"
const sd = Array.from(document.querySelectorAll('[role="dialog"], dialog'))
  .find(d => d.innerText?.includes('Enlace'));
const shortOpt = Array.from(sd.querySelectorAll('input, label, span, div'))
  .find(el => el.innerText?.trim() === 'Enlace corto' || el.textContent?.trim() === 'Enlace corto');
if (shortOpt) shortOpt.click();

// Leer el link del input directamente
const inp = sd.querySelector('input[type="text"], textarea');
inp?.value  // → "https://amzn.to/XXXXXX"
```

---

## Paso 6 — Detectar categoría

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
| Otro | `otros` |

---

## Paso 7 — Formatear el precio

- Formato siempre en COP: `COP $549.674` (punto como separador de miles, sin decimales)
- La cuenta ya tiene COP configurado — el precio aparece directo en pesos colombianos
- Si hay precio tachado: llenar `originalPrice` también en COP
- Si excepcionalmente aparece en USD, convertir:
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

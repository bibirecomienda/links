# Crear carrusel semanal

Crea el carrusel de Instagram de la semana: busca 6 productos en Amazon con ≥30% de descuento, genera el HTML de 8 slides, actualiza `links.js` y organiza los archivos.

**Uso:** `/crear-carrusel YYYY-MM-DD`

Si no se pasa fecha, calcular el próximo domingo desde hoy.

---

## Paso 0 — Preparar la fecha y rutas

- `FECHA` = argumento recibido o próximo domingo (formato `YYYY-MM-DD`)
- `CARPETA` = `carruseles/FECHA/`
- `HTML_DEST` = `carruseles/FECHA/carousel-instagram.html`
- `MD_DEST` = `carruseles/FECHA/ofertas-semana.md`
- Crear la carpeta si no existe: `mkdir -p "carruseles/FECHA/capturas"`

---

## Paso 1 — Abrir Chrome y buscar productos en Amazon

Abrir un tab de Chrome con `mcp__Claude_in_Chrome__tabs_context_mcp` (createIfEmpty: true). Guardar el `tabId`.

Buscar 6–8 candidatos navegando en Amazon. Estrategia de búsqueda:

```
Navegar a: https://www.amazon.com/s?k=deals&rh=p_n_specials_match%3A2617333011&language=es_US
```

Alternativamente buscar por categorías rotando cada semana:
- `https://www.amazon.com/s?k=hogar+descuento&language=es_US`
- `https://www.amazon.com/s?k=belleza+oferta&language=es_US`
- `https://www.amazon.com/s?k=cocina+amazon+deals&language=es_US`
- `https://www.amazon.com/s?k=moda+mujer+descuento&language=es_US`

Para cada candidato que parezca interesante (imagen atractiva, precio razonable), navegar al producto y verificar que tenga ≥30% de descuento.

---

## Paso 2 — Extraer datos de cada producto (repetir 6 veces)

Por cada producto seleccionado, ejecutar este JavaScript con `mcp__Claude_in_Chrome__javascript_tool`:

```js
const imgEl = document.querySelector('#landingImage, #imgBlkFront');
const deliveryEl = document.querySelector(
  '#deliveryBlockMessage, #mir-layout-DELIVERY_BLOCK, #deliveryMessage, #price-shipping-message'
);
({
  title: document.querySelector('#productTitle')?.innerText?.trim(),
  price: document.querySelector('.a-price .a-offscreen')?.innerText?.trim(),
  priceWhole: document.querySelector('.a-price-whole')?.innerText?.trim(),
  originalPrice: document.querySelector('.a-text-price .a-offscreen')?.innerText?.trim(),
  rating: document.querySelector('#acrPopover')?.title?.trim(),
  reviews: document.querySelector('#acrCustomerReviewText')?.innerText?.trim(),
  breadcrumb: document.querySelector('#wayfinding-breadcrumbs_feature_div')?.innerText?.trim(),
  coupon: document.querySelector('.couponBadge, [data-csa-c-type="coupon"]')?.innerText?.trim() || '',
  image: imgEl?.getAttribute('data-old-hires') || imgEl?.src || '',
  shipping: deliveryEl?.innerText?.trim() || '',
  siteStripe: !!document.querySelector('#amzn-ss-wrap')
})
```

Luego obtener el link de afiliado via SiteStripe:

```js
// 1. Abrir panel SiteStripe
const btn = Array.from(document.querySelectorAll('#amzn-ss-wrap a, #amzn-ss-wrap button'))
  .find(el => el.innerText?.includes('Obtener enlace'));
if (btn) btn.click();
```

```js
// 2. Verificar tag de afiliado en el diálogo
const sd = Array.from(document.querySelectorAll('[role="dialog"], dialog'))
  .find(d => d.innerText?.includes('Enlace'));
const sel = sd?.querySelector('select[name="amzn-ss-store-dropdown-text"]');
if (sel && sel.value !== 'bibirecomie02-20') sel.value = 'bibirecomie02-20';
```

```js
// 3. Seleccionar "Enlace corto"
const sd = Array.from(document.querySelectorAll('[role="dialog"], dialog'))
  .find(d => d.innerText?.includes('Compartir enlace de afiliado'));
const shortBtn = Array.from(sd.querySelectorAll('button, label, span'))
  .find(el => el.innerText?.includes('Enlace corto'));
if (shortBtn) shortBtn.click();
```

```js
// 4. Interceptar clipboard y copiar
navigator.clipboard.writeText = function(text) {
  window.__bibicaptured = text;
  return Promise.resolve();
};
const sd = Array.from(document.querySelectorAll('[role="dialog"], dialog'))
  .find(d => d.innerText?.includes('Compartir enlace de afiliado'));
const copyBtn = Array.from(sd.querySelectorAll('button'))
  .find(b => b.innerText?.includes('Copiar'));
if (copyBtn) copyBtn.click();
```

```js
// 5. Leer el link capturado
window.__bibicaptured
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

### Calcular descuento

```
descuento% = round((originalPrice - price) / originalPrice * 100)
```

Si `originalPrice` no aparece, buscar precio tachado en `.a-text-price`. Si el descuento es < 30%, descartar ese producto y buscar otro.

### Interpretar envío

| Texto detectado | Valor `shipping` |
|---|---|
| "Envío GRATIS", "FREE delivery", "gratis con Prime" | `"gratis"` |
| "Gratis con pedidos de COP $XX" | `"gratis"` |
| "+COP $X.XXX de envío" | `"COP $X.XXX"` |
| Sin texto | `""` |

---

## Paso 3 — Generar el carousel HTML

Con los 6 productos extraídos, crear el archivo HTML en `HTML_DEST`. Usar exactamente esta estructura (basada en `templates/carousel-instagram-template.html`):

- **Slide 1:** Portada con la fecha, categorías encontradas y mayor descuento del lote
- **Slides 2–7:** Un producto por slide (en el orden que mejor cuente una historia visual)
- **Slide 8:** CTA final fija

Para cada slide de producto, usar el nombre del producto en 2 líneas máximo (cortar en la conjunción o artículo más natural). La `product-copy` debe ser una descripción cálida de 2-3 oraciones en el tono de Bibiana: directa, con personalidad, con un detalle específico del producto que enamore.

La portada debe mencionar el mayor descuento del lote (ej. "Hasta −42% en Amazon") y la fecha en español (ej. "31 de mayo · 2026").

**Template de referencia:** `templates/carousel-instagram-template.html`

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

✨ [TÍTULO ATRACTIVO SEMANA] ✨

[párrafo corto presentando los productos, tono Bibi]

🛍️ Los links directos están en mi bio

[lista con emoji + nombre corto de cada producto y precio]

💬 ¿Cuál te enamoró? Cuéntame abajo 👇

#bibirecomienda #ofertasdelasemana #amazonfinds #descuentos #productosrecomendados #comprasintelgentes #amazonlatino #deals #ahorra #amazoncolombia #tendencias
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
- `badge`: `"🔥 XX% OFF"` si descuento ≥40%, o `"⭐ X.X · Xk+ vendidos"` si hay rating
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

## Paso 7 — Ejecutar el script de organización

```bash
node scripts/organize-weekly-carousel.js FECHA
```

Si el script falla o no encuentra archivos, reportar el error sin continuar.

---

## Paso 8 — Commit a Git

```bash
git add carruseles/FECHA/ links.js
git commit -m "Carrusel semanal FECHA

- 6 productos nuevos con highlight: true
- Descuentos entre XX% y XX%
- Carousel HTML generado (8 slides)
- Caption Instagram listo

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
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
  📄 carruseles/FECHA/carousel-instagram.html
  📝 carruseles/FECHA/ofertas-semana.md
  🖼️  carruseles/FECHA/capturas/ (pendiente — capturar manualmente)

Siguiente paso:
  Abrir carousel-instagram.html en Chrome y capturar 8 screenshots de 1080×1080px
  Guardar en carruseles/FECHA/capturas/ como bibi-slide-1.png ... bibi-slide-8.png
```

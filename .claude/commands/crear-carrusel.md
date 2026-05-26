# Crear carrusel semanal

Crea el carrusel de Instagram de la semana: busca 6 productos en Amazon con ≥30% de descuento, genera el HTML de 8 slides, actualiza `links.js` y organiza los archivos.

**Uso:** `/crear-carrusel YYYY-MM-DD`

Si no se pasa fecha, calcular el próximo domingo desde hoy.

> ⛔ **Regla absoluta:** Para CUALQUIER acceso a una página web (Amazon u otro sitio), usar SIEMPRE la extensión de Chrome (`mcp__Claude_in_Chrome__*`). Nunca usar `WebFetch`, `web_fetch` ni ninguna otra herramienta de fetch HTTP. Las páginas de Amazon requieren sesión activa y no funcionan con fetch.

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

Para cada candidato que parezca interesante, navegar al producto. Si la URL del producto es larga (>2000 chars) o tiene parámetros de rastreo, extraer el ASIN y construir una URL limpia antes de navegar:
```
https://www.amazon.com/dp/ASIN?language=es_US
```

Verificar que el producto tenga ≥30% de descuento antes de procesarlo.

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
  coupon: document.querySelector('.couponBadge, .promoPriceBlockMessage, [data-csa-c-type="coupon"], .vpcButton')?.innerText?.trim() || '',
  image: imgEl?.getAttribute('data-old-hires') || imgEl?.src || '',
  shipping: deliveryEl?.innerText?.trim() || '',
  siteStripe: !!document.querySelector('#amzn-ss-wrap')
})
```

Si el texto de envío no se detectó en `deliveryEl`, intentar también:
```js
document.querySelector('#price-shipping-message, .a-color-secondary')?.innerText?.trim()
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
// ⚠️ Tag SIEMPRE debe ser: bibirecomie02-20
const sd = Array.from(document.querySelectorAll('[role="dialog"], dialog'))
  .find(d => d.innerText?.includes('Enlace'));
const sel = sd?.querySelector('select[name="amzn-ss-store-dropdown-text"]');
if (sel && sel.value !== 'bibirecomie02-20') sel.value = 'bibirecomie02-20';
```

```js
// 3. Seleccionar "Enlace corto" y leer el link del input
const sd = Array.from(document.querySelectorAll('[role="dialog"], dialog'))
  .find(d => d.innerText?.includes('Enlace'));
const shortOpt = Array.from(sd.querySelectorAll('input, label, span, div'))
  .find(el => el.innerText?.trim() === 'Enlace corto' || el.textContent?.trim() === 'Enlace corto');
if (shortOpt) shortOpt.click();

// Leer el link directamente del campo de texto del diálogo
const inp = sd.querySelector('input[type="text"], textarea');
inp?.value  // → "https://amzn.to/XXXXXX"
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

Con los 6 productos extraídos, crear el archivo HTML en `HTML_DEST`. **COPIAR EXACTAMENTE** la estructura de `templates/carousel-instagram-template.html`:

**Especificaciones:**
- **Tamaño:** 520×520px (no 1080×1080px)
- **Paleta de colores:**
  - Primario: #A04A36 (terracota/marrón)
  - Secundario: #C9985E (dorado)
  - Neutro: #9C7A6F (beige oscuro)
  - Fondo: #FAF1E8 (crema)
- **Tipografía:**
  - Títulos: Cormorant Garamond (serif)
  - Body: Inter (sans-serif)
- **Estructura de 8 slides:**
  1. **Portada:** Logo "Bibi", tagline "recomienda", fecha, máximo descuento (ej. "Hasta −42%")
  2-7. **Productos:** Imagen (300px altura), badges (plataforma + descuento + categoría), nombre (2 líneas), descripción cálida (2-3 oraciones), precios (tachado + actual)
  8. **CTA:** "¿Cuál te enamoró?" + "@bibi.recomienda" + hashtags

**Copy de productos:** Tono Bibiana — directo, cálido, con detalle específico que enamore. Máximo 3 oraciones.

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
  📄 carruseles/FECHA/carousel-instagram.html (520×520px, 8 slides)
  📝 carruseles/FECHA/ofertas-semana.md (tabla + caption Instagram)
  🖼️  carruseles/FECHA/capturas/ (pendiente — capturar manualmente)

Siguiente paso:
  Abrir carousel-instagram.html en Chrome en fullscreen
  Capturar 8 screenshots de 520×520px por slide
  Guardar en carruseles/FECHA/capturas/ como bibi-slide-1.png ... bibi-slide-8.png
```

#!/usr/bin/osascript -l JavaScript

/**
 * validate-links.js — Valida links.js antes de publicar.
 *
 * Corre con el runtime de JavaScript que trae macOS (no requiere Node):
 *
 *   osascript -l JavaScript scripts/validate-links.js
 *
 * Sale con código 1 si hay errores (bloquear el commit),
 * 0 si solo hay advertencias o todo está bien.
 */

ObjC.import('Foundation');
ObjC.import('stdlib');

// ── Localizar links.js (junto a la carpeta del script, o en el cwd) ──
function rutaLinks() {
  const args = $.NSProcessInfo.processInfo.arguments;
  for (let i = 0; i < args.count; i++) {
    const a = ObjC.unwrap(args.objectAtIndex(i));
    if (a && a.includes('validate-links.js')) {
      const dir = a.substring(0, a.lastIndexOf('/'));
      return dir + '/../links.js';
    }
  }
  return 'links.js';
}

const PLATAFORMAS = ['amazon', 'mercadolibre', 'shein', 'aliexpress', 'other'];
const TAG_AFILIADO = 'bibirecomie02-20';
const RE_PRECIO = /^COP \$\d{1,3}(\.\d{3})*$/;
const RE_FECHA = /^\d{4}-\d{2}-\d{2}$/;

const errores = [];
const avisos = [];
const err = (id, msg) => errores.push(`  ✗ [id ${id}] ${msg}`);
const warn = (id, msg) => avisos.push(`  ⚠ [id ${id}] ${msg}`);

// ── Cargar links.js (es JS plano con declaraciones var) ──
const nsSrc = $.NSString.stringWithContentsOfFileEncodingError(rutaLinks(), $.NSUTF8StringEncoding, null);
if (nsSrc.isNil()) {
  console.log(`✗ No se pudo leer ${rutaLinks()}`);
  $.exit(1);
}

let data;
try {
  data = new Function(
    nsSrc.js +
    '\nreturn {' +
    '  links: typeof BIBI_LINKS !== "undefined" ? BIBI_LINKS : null,' +
    '  campanas: typeof BIBI_CAMPANAS !== "undefined" ? BIBI_CAMPANAS : [],' +
    '  categorias: typeof BIBI_CATEGORIAS !== "undefined" ? BIBI_CATEGORIAS : null' +
    '};'
  )();
} catch (e) {
  console.log(`✗ links.js no se pudo evaluar: ${e.message}`);
  $.exit(1);
}

if (!Array.isArray(data.links)) { console.log('✗ BIBI_LINKS no existe o no es un array'); $.exit(1); }
if (!data.categorias) { console.log('✗ BIBI_CATEGORIAS no existe'); $.exit(1); }

const categoriasValidas = Object.keys(data.categorias);
const idsVistos = new Map();
const urlsVistas = new Map();
const imagenesActivas = new Map();

for (const p of data.links) {
  const id = p.id != null ? p.id : '?';

  // id único y numérico
  if (typeof p.id !== 'number') err(id, 'id debe ser un número');
  else if (idsVistos.has(p.id)) err(id, `id repetido (también en "${idsVistos.get(p.id)}")`);
  else idsVistos.set(p.id, p.title);

  // título
  if (!p.title || !p.title.trim()) err(id, 'title vacío');
  else if (p.title.length > 80) warn(id, `title muy largo (${p.title.length} chars, ideal ≤ 60)`);

  // plataforma y categoría
  if (!PLATAFORMAS.includes(p.platform)) err(id, `platform inválida: "${p.platform}"`);
  if (!categoriasValidas.includes(p.category)) err(id, `category inválida: "${p.category}"`);

  // URL
  if (!p.url || !/^https:\/\//.test(p.url)) {
    err(id, `url inválida: "${p.url}"`);
  } else {
    if (/\[|XXXX|PLACEHOLDER|_TAG_/i.test(p.url)) err(id, `url con placeholder sin reemplazar: "${p.url}"`);
    if (urlsVistas.has(p.url)) err(id, `url repetida (también en "${urlsVistas.get(p.url)}")`);
    else urlsVistas.set(p.url, p.title);
    if (p.platform === 'amazon') {
      const esCorto = /^https:\/\/amzn\.to\//.test(p.url);
      const esLargo = /amazon\.com/.test(p.url);
      if (!esCorto && !esLargo) err(id, `url de Amazon no reconocida: "${p.url}"`);
      if (esLargo && !p.url.includes(`tag=${TAG_AFILIADO}`)) {
        err(id, `link largo de Amazon sin tag de afiliado ${TAG_AFILIADO}`);
      }
    }
  }

  // imagen
  if (!p.image || !/^https:\/\//.test(p.image)) warn(id, 'image vacía o no es https');
  else if (p.active) {
    if (imagenesActivas.has(p.image)) {
      warn(id, `misma imagen que "${imagenesActivas.get(p.image)}" — ¿producto duplicado?`);
    } else imagenesActivas.set(p.image, p.title);
  }

  // precios
  if (!RE_PRECIO.test(p.price || '')) err(id, `price con formato inválido: "${p.price}" (esperado "COP $XXX.XXX")`);
  if (p.originalPrice && !RE_PRECIO.test(p.originalPrice)) {
    err(id, `originalPrice con formato inválido: "${p.originalPrice}"`);
  }

  // envío
  if (p.shipping !== undefined && p.shipping !== '' && p.shipping !== 'gratis' && !RE_PRECIO.test(p.shipping)) {
    err(id, `shipping inválido: "${p.shipping}" (esperado "gratis", "" o "COP $X.XXX")`);
  }

  // fecha
  if (!RE_FECHA.test(p.date || '') || isNaN(new Date(p.date).getTime())) {
    err(id, `date inválida: "${p.date}" (esperado YYYY-MM-DD)`);
  }

  // booleanos
  for (const campo of ['featured', 'active']) {
    if (typeof p[campo] !== 'boolean') err(id, `${campo} debe ser true o false`);
  }
}

// ── Reglas globales ──
const activos = data.links.filter(p => p.active);
const destacados = activos.filter(p => p.featured);
if (destacados.length > 1) {
  errores.push(`  ✗ Hay ${destacados.length} productos con featured: true (debe haber solo 1): ${destacados.map(p => `id ${p.id}`).join(', ')}`);
}
if (destacados.length === 0 && activos.length > 0) {
  avisos.push('  ⚠ Ningún producto activo tiene featured: true — el "Pick del día" usará el primero del array');
}

const highlights = activos.filter(p => p.highlight);
if (highlights.length > 8) {
  avisos.push(`  ⚠ Hay ${highlights.length} productos con highlight: true — ¿quedaron destacados de semanas anteriores sin apagar?`);
}

// ── Campañas ──
for (const c of data.campanas) {
  if (!c.id) errores.push('  ✗ [campaña] sin id');
  if (!c.title) errores.push(`  ✗ [campaña ${c.id}] sin title`);
  if (!c.url || !/^https:\/\//.test(c.url)) errores.push(`  ✗ [campaña ${c.id}] url inválida`);
}

// ── Reporte ──
console.log(`\nValidando links.js — ${data.links.length} productos (${activos.length} activos), ${data.campanas.length} campañas\n`);
if (errores.length) {
  console.log(`ERRORES (${errores.length}):`);
  errores.forEach(e => console.log(e));
  console.log('');
}
if (avisos.length) {
  console.log(`Advertencias (${avisos.length}):`);
  avisos.forEach(a => console.log(a));
  console.log('');
}
if (!errores.length && !avisos.length) {
  console.log('✓ Todo en orden\n');
} else if (!errores.length) {
  console.log('✓ Sin errores (solo advertencias)\n');
} else {
  console.log('✗ Corregir los errores antes de commitear\n');
  $.exit(1);
}

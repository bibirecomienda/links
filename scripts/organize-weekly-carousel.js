#!/usr/bin/env node

/**
 * organize-weekly-carousel.js
 * Script para automatizar la organización de archivos de carruseles semanales
 *
 * Uso desde Claude Code:
 *   claude scripts/organize-weekly-carousel.js [fecha: YYYY-MM-DD]
 *
 * Ejemplo:
 *   claude scripts/organize-weekly-carousel.js 2026-05-31
 *
 * Si no se proporciona fecha, usa la semana actual.
 */

const fs = require('fs');
const path = require('path');

// Configuración
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUTS_DIR = process.env.OUTPUTS_DIR || path.join(PROJECT_ROOT, '..', 'outputs');
const CAROUSELS_DIR = path.join(PROJECT_ROOT, 'carruseles');
const TEMPLATES_DIR = path.join(PROJECT_ROOT, 'templates');

// Obtener fecha (argumento o semana actual)
const args = process.argv.slice(2);
const dateStr = args[0] || getWeekDate();

function getWeekDate() {
  const today = new Date();
  // Última semana (7 días atrás)
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return lastWeek.toISOString().split('T')[0];
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${dateStr}`;
}

async function organizeCarousel() {
  console.log(`📅 Organizando carrusel de la semana: ${dateStr}\n`);

  // 1. Crear estructura de carpetas
  const weekDir = path.join(CAROUSELS_DIR, dateStr);
  const capturesDir = path.join(weekDir, 'capturas');

  [weekDir, capturesDir, TEMPLATES_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Creada carpeta: ${path.relative(PROJECT_ROOT, dir)}`);
    }
  });

  // 2. Buscar y copiar archivos relevantes desde outputs
  const files = {
    carousel: null,
    ofertas: null,
    captures: []
  };

  if (fs.existsSync(OUTPUTS_DIR)) {
    const outputFiles = fs.readdirSync(OUTPUTS_DIR);

    // Buscar carousel HTML
    const carouselFile = outputFiles.find(f =>
      f.includes('carousel-instagram') && f.includes(dateStr) && f.endsWith('.html')
    );
    if (carouselFile) {
      files.carousel = carouselFile;
    }

    // Buscar ofertas markdown
    const ofertasFile = outputFiles.find(f =>
      f.includes('ofertas-semana') && f.includes(dateStr) && f.endsWith('.md')
    );
    if (ofertasFile) {
      files.ofertas = ofertasFile;
    }

    // Buscar captures (bibi-slide-*.png o slide-*.png con la fecha)
    const capturePattern = new RegExp(`bibi-slide.*\\.png`);
    files.captures = outputFiles.filter(f => capturePattern.test(f));
  }

  // 3. Copiar archivos
  if (files.carousel) {
    const src = path.join(OUTPUTS_DIR, files.carousel);
    const dst = path.join(weekDir, 'carousel-instagram.html');
    fs.copyFileSync(src, dst);
    console.log(`✅ Carousel: ${path.relative(PROJECT_ROOT, dst)}`);
  }

  if (files.ofertas) {
    const src = path.join(OUTPUTS_DIR, files.ofertas);
    const dst = path.join(weekDir, 'ofertas-semana.md');
    fs.copyFileSync(src, dst);
    console.log(`✅ Ofertas: ${path.relative(PROJECT_ROOT, dst)}`);
  }

  if (files.captures.length > 0) {
    files.captures.forEach(capture => {
      const src = path.join(OUTPUTS_DIR, capture);
      const dst = path.join(capturesDir, capture);
      fs.copyFileSync(src, dst);
    });
    console.log(`✅ Capturas: ${files.captures.length} imágenes copiadas a ${path.relative(PROJECT_ROOT, capturesDir)}`);
  }

  // 4. Crear README para la semana
  const readmeContent = `# Carrusel Semanal - ${new Date(dateStr + 'T00:00:00').toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}

## Estructura
- \`carousel-instagram.html\` - HTML del carrusel (8 slides @ 1080×1080px)
- \`ofertas-semana.md\` - Datos de productos y caption para Instagram
- \`capturas/\` - Screenshots de las 8 slides

## Flujo completado
1. ✅ Productos investigados en Amazon
2. ✅ Links de afiliado generados (SiteStripe)
3. ✅ Carousel HTML generado con imágenes
4. ✅ Screenshots capturados (1080×1080px cada uno)
5. ✅ Caption preparada en ofertas-semana.md

## Próximos pasos
1. Revisar las imágenes en \`capturas/\`
2. Publicar como carrusel en Instagram (@bibi.recomienda)
3. Copiar caption desde \`ofertas-semana.md\`
4. Actualizar \`links.js\` con los productos (highlight: true/false)

---
*Generado automáticamente por organize-weekly-carousel.js*
`;

  fs.writeFileSync(path.join(weekDir, 'README.md'), readmeContent);
  console.log(`✅ Documentación: ${path.relative(PROJECT_ROOT, path.join(weekDir, 'README.md'))}`);

  // 5. Resumen
  console.log(`\n📦 Carrusel organizado en: ${path.relative(PROJECT_ROOT, weekDir)}`);
  console.log(`\n📋 Archivos listos:\n`);
  console.log(`   HTML:     carruseles/${dateStr}/carousel-instagram.html`);
  console.log(`   Datos:    carruseles/${dateStr}/ofertas-semana.md`);
  console.log(`   Capturas: carruseles/${dateStr}/capturas/ (${files.captures.length} imágenes)`);
  console.log(`\n✨ Listo para publicar en Instagram!\n`);
}

organizeCarousel().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

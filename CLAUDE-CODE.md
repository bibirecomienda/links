# Bibi Recomienda — Guía para Claude Code

Esta guía te permite continuar el trabajo de carruseles semanales desde **Claude Code** (CLI).

---

## 🚀 Flujo general de una semana

### 1. Investigar y crear el carousel (en Cowork)
```
- Buscar 6-8 productos en Amazon con descuentos 30%+
- Extraer imágenes, precios, ratings
- Crear `carousel-instagram-YYYY-MM-DD-v2.html` (8 slides)
- Crear `ofertas-semana-YYYY-MM-DD.md` (datos + caption)
- Capturar 8 screenshots (1080×1080px) como PNG
```

### 2. Organizar archivos (Claude Code)
```bash
cd "Bibi Recomienda"
claude scripts/organize-weekly-carousel.js YYYY-MM-DD
```

Esto:
- ✅ Crea carpeta `carruseles/YYYY-MM-DD/`
- ✅ Mueve carousel HTML, datos, y captures a su lugar
- ✅ Genera README automático
- ✅ Prepara todo para publicar

### 3. Actualizar links.js (Claude Code o manual)
```bash
claude update-links.js YYYY-MM-DD
```

O edita manualmente:
- Agrega 6 nuevos productos con `highlight: true`
- Cambia productos anteriores a `highlight: false`
- Commit a Git

### 4. Publicar en Instagram (manual)
- Ve a `carruseles/YYYY-MM-DD/capturas/`
- Sube las 8 imágenes como carrusel
- Copia caption desde `ofertas-semana.md`

---

## 📁 Estructura de carpetas

```
Bibi Recomienda/
├── carruseles/
│   ├── 2026-05-24/
│   │   ├── carousel-instagram.html      ← HTML con 8 slides
│   │   ├── ofertas-semana.md            ← Datos + caption Instagram
│   │   ├── README.md                    ← Checklist de la semana
│   │   └── capturas/
│   │       ├── bibi-slide-1.png
│   │       ├── bibi-slide-2.png
│   │       └── ... (8 imágenes)
│   └── 2026-05-31/
│       └── (próxima semana)
├── templates/
│   └── carousel-instagram-template.html ← Base reutilizable
├── scripts/
│   ├── organize-weekly-carousel.js      ← Automatiza organización
│   └── update-links.js                  ← Actualiza links.js (próximo)
├── links.js                             ← Base de datos de productos
├── index.html                           ← Web pública
└── CLAUDE-CODE.md                       ← Este archivo
```

---

## 🔧 Scripts disponibles

### `organize-weekly-carousel.js`
Organiza archivos de una semana específica.

**Uso:**
```bash
claude scripts/organize-weekly-carousel.js 2026-05-31
```

**Qué hace:**
1. Busca carousel HTML, ofertas markdown y captures en outputs/
2. Crea estructura de carpetas para esa semana
3. Copia archivos a su lugar correcto
4. Genera README automático

**Argumentos:**
- `YYYY-MM-DD` - Fecha de la semana (si no se proporciona, usa semana anterior)

---

## 📋 Checklist para nuevas semanas

Cada semana:

```bash
# 1. Crear carousel y captures (en Cowork con Chrome)
# Archivos generados:
#   - carousel-instagram-2026-05-31-v2.html
#   - ofertas-semana-2026-05-31.md
#   - bibi-slide-1.png ... bibi-slide-8.png

# 2. Organizar archivos
claude scripts/organize-weekly-carousel.js 2026-05-31

# 3. Revisar estructura
ls -la carruseles/2026-05-31/

# 4. Actualizar links.js (manual por ahora)
# - Agrega 6 productos con highlight: true
# - Cambia anteriores a highlight: false

# 5. Commit a Git
git add -A
git commit -m "Carrusel semanal 2026-05-31"
git push

# 6. Publicar en Instagram
# - Usa imágenes de carruseles/2026-05-31/capturas/
# - Caption en carruseles/2026-05-31/ofertas-semana.md
```

---

## 🎯 Próximos scripts a crear

- [ ] `update-links.js` - Actualizar automáticamente links.js
- [ ] `publish-instagram.js` - Automatizar publicación en Instagram (si hay API)
- [ ] `generate-caption.js` - Crear captions optimizadas para cada plataforma

---

## 💾 Git workflow

Después de cada semana:

```bash
git add carruseles/YYYY-MM-DD/ links.js
git commit -m "Carrusel semanal YYYY-MM-DD

- 6 productos nuevos destacados
- Actualizados en links.js con highlight: true
- Carousel con 8 slides @ 1080×1080px
- Listo para publicar en Instagram"
git push
```

---

## 🐛 Troubleshooting

**Problema:** Script no encuentra archivos en outputs/
```
Solución: Verifica que los archivos estén en /Users/cmartin/Library/Application.../outputs/
Los nombres deben incluir la fecha: carousel-instagram-YYYY-MM-DD-*.html
```

**Problema:** Permisos al copiar archivos
```
Solución: cd al proyecto y ejecuta:
chmod +x scripts/organize-weekly-carousel.js
```

**Problema:** Ruta del proyecto incorrecta
```
Solución: Asegúrate de estar en:
/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda/
```

---

## 📝 Variables de entorno (opcional)

Si quieres personalizar rutas:

```bash
export OUTPUTS_DIR="/ruta/custom/outputs"
export PROJECT_ROOT="/ruta/custom/Bibi Recomienda"
claude scripts/organize-weekly-carousel.js 2026-05-31
```

---

*Última actualización: 2026-05-25*
*Hecho para Bibiana 💫*

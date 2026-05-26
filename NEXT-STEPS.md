# ✨ Próximos pasos — Continúa en Claude Code

## 🎯 Ahora tienes todo listo

La sesión de Cowork ha completado:

✅ **Semana 2026-05-24:**
- 6 productos nuevos (descuentos 35-42%)
- Carousel HTML con 8 slides (1080×1080px)
- 8 screenshots de alta calidad
- Datos estructurados en ofertas-semana.md
- links.js actualizado con `highlight: true/false`

✅ **Estructura creada:**
- Carpeta `carruseles/2026-05-24/` con todo organizado
- Template reutilizable en `templates/`
- Script de automatización en `scripts/`
- Documentación en `CLAUDE-CODE.md`

---

## 🚀 Continúa en Claude Code

Desde ahora, puedes **delegar el flujo completamente a Claude Code**.

### Opción 1: Usar el script automático (recomendado)

Cada semana, después de crear el carousel en Cowork:

```bash
cd "Bibi Recomienda"
claude scripts/organize-weekly-carousel.js YYYY-MM-DD
```

Esto organiza todo automáticamente.

### Opción 2: Crear una tarea programada

Puedes hacer que Claude Code se ejecute automáticamente cada semana:

```bash
claude schedule \
  --cron "0 9 * * 1" \
  --task "Organizar carrusel semanal" \
  scripts/organize-weekly-carousel.js $(date +%Y-%m-%d)
```

---

## 📋 Checklist para la próxima semana

**En Cowork (Chrome):**
1. Investigar 6-8 productos con descuentos en Amazon
2. Crear `carousel-instagram-YYYY-MM-DD-v2.html` (usar template)
3. Crear `ofertas-semana-YYYY-MM-DD.md` con datos
4. Capturar 8 screenshots de slides (1080×1080px)

**En Claude Code:**
```bash
# 1. Organizar automáticamente
claude scripts/organize-weekly-carousel.js YYYY-MM-DD

# 2. Actualizar links.js (próximo script a crear)
# Por ahora, hazlo manual o en Cowork

# 3. Commit a Git
git add carruseles/YYYY-MM-DD/ links.js
git commit -m "Carrusel YYYY-MM-DD"
git push

# 4. Publicar en Instagram
# Usa imágenes de carruseles/YYYY-MM-DD/capturas/
# Caption en carruseles/YYYY-MM-DD/ofertas-semana.md
```

---

## 🔧 Scripts próximos a crear

**En orden de prioridad:**

1. **`update-links.js`** ⭐
   - Leer `ofertas-semana-YYYY-MM-DD.md`
   - Actualizar `links.js` automáticamente
   - Agregar productos con `highlight: true`
   - Cambiar anteriores a `highlight: false`

2. **`publish-carousel.js`**
   - Preparar comandos para publicar en Instagram
   - Generar captions optimizadas
   - Gestionar hashtags y menciones

3. **`validate-carousel.js`**
   - Verificar que todas las imágenes están presentes
   - Validar estructura HTML
   - Chequear precios en formato correcto

---

## 💡 Ideas de automatización

Puedes expandir el flujo:

```bash
# Crear un "hub" central
claude run pipeline weekly

# Que haga:
# 1. Organizar archivos
# 2. Actualizar links.js
# 3. Validar carousel
# 4. Generar caption optimizado
# 5. Preparar comando de Git
# 6. Notificar cuando esté listo
```

---

## 📞 Duda común: "¿Cómo continúo en Claude Code?"

**Opción 1 — Terminal local:**
```bash
cd "/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda"
claude --help
```

**Opción 2 — Desde Cowork:**
Cuando termines un carrusel en Cowork, busca el ícono de Claude Code en la barra lateral y:
1. Click en "Terminal"
2. Escribe: `claude scripts/organize-weekly-carousel.js YYYY-MM-DD`
3. Done ✨

**Opción 3 — Crear un shortcut:**
Guarda este comando como un shortcut en tu terminal:
```bash
alias organizar-carrusel='cd "/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda" && claude scripts/organize-weekly-carousel.js'
```

Luego solo: `organizar-carrusel 2026-05-31`

---

## 🎁 Archivos clave

| Archivo | Propósito |
|---------|-----------|
| `CLAUDE-CODE.md` | Documentación técnica completa |
| `NEXT-STEPS.md` | Este archivo (mapa del camino) |
| `scripts/organize-weekly-carousel.js` | Automatización principal |
| `templates/carousel-instagram-template.html` | Base reutilizable |
| `carruseles/2026-05-24/README.md` | Checklist de ejemplo |

---

## ✅ Estado final

```
📁 Bibi Recomienda/
   ✓ Estructura organizada
   ✓ Archivos de la semana migrados
   ✓ Scripts listos
   ✓ Documentación completa
   ✓ Git configurado

🚀 Listo para continuar en Claude Code
```

---

**¿Listo para la próxima semana?** 🎯

Cuando termines un nuevo carrusel, solo ejecuta:
```bash
claude scripts/organize-weekly-carousel.js YYYY-MM-DD
```

¡Y todo se organiza automáticamente! 💫

---

*Creado: 2026-05-25*
*Para: Bibiana*
*Próximo: Automatización en Claude Code*

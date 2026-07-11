# Validar links.js

Valida la base de datos de productos antes de publicar: ids y URLs únicos, formato de precios COP, categorías y plataformas válidas, un solo `featured`, placeholders sin reemplazar, posibles duplicados.

**Uso:** `/validar-links`

---

## Paso único

```bash
cd "/Users/cmartin/Documents/Claude/Projects/Bibi Recomienda"
osascript -l JavaScript scripts/validate-links.js
```

> El script corre con el runtime de JavaScript nativo de macOS (`osascript -l JavaScript`) porque esta máquina no tiene Node.js instalado. No requiere instalar nada.

- **Sale con código 0** → todo bien (puede haber advertencias: revisarlas y decidir).
- **Sale con código 1** → hay errores. **No commitear** hasta corregirlos en `links.js` y volver a correr el script.

Este comando también corre automáticamente como paso previo al commit en `/agregar-link` y `/crear-carrusel`.

## Errores típicos y cómo corregirlos

| Error | Corrección |
|---|---|
| `url con placeholder` | El link de afiliado nunca se generó — volver a Amazon con SiteStripe y capturar el link real |
| `url repetida` / `misma imagen` | El producto ya existe — no agregarlo de nuevo; si es una actualización, editar el existente |
| `price con formato inválido` | Usar `COP $XXX.XXX` (punto como separador de miles, sin decimales) |
| `N productos con featured: true` | Dejar `featured: true` solo en el pick del día actual |
| `highlight` en exceso (advertencia) | Apagar los `highlight: true` de semanas anteriores |

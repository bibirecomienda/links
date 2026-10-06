// ═══════════════════════════════════════════════════
//  BIBI RECOMIENDA — Base de datos
//  Editá este archivo para agregar / quitar productos y campañas.
// ═══════════════════════════════════════════════════

// ───────────────────────────────────────────────────
//  PRODUCTOS
//  Campos por producto:
//    id            · número único, incrementar (max + 1)
//    title         · nombre que se ve en la card (máx ~60 chars)
//    platform      · "amazon" | "mercadolibre" | "shein" | "aliexpress" | "other"
//    category      · clave de CATEGORIAS abajo (ej "cocina")
//    url           · link de afiliado (Amazon: amzn.to generado por SiteStripe)
//    image         · URL de la imagen (idealmente cuadrada, fondo blanco)
//    price         · precio en COP ej "COP $68.443" (punto de miles, sin decimales)
//    originalPrice · precio tachado si hay descuento, "" si no
//    badge         · etiqueta corta ej "🔥 44% OFF" (se usa en carruseles/historias)
//    coupon        · texto del cupón si aplica, ej "Ahorra 10%", "" si no
//    shipping      · "gratis" | "COP $X.XXX" | "" (sin dato)
//    highlight     · true = aparece en "Destacados de la semana" (los del carrusel vigente)
//    featured      · true para que aparezca como "Pick del día" (sólo uno a la vez)
//    active        · true para que se muestre, false para esconder sin borrar
//    date          · "YYYY-MM-DD" — fecha en que lo agregaste
//
//  Validar después de editar:  osascript -l JavaScript scripts/validate-links.js
// ───────────────────────────────────────────────────

var BIBI_LINKS = [
  {
    id: 88,
    title: "Bedsure Cama Cueva 2 en 1 para Gatos con Cojín",
    platform: "amazon",
    category: "mascotas",
    url: "https://link.amazon/B03A6UhWm",
    image: "https://m.media-amazon.com/images/I/91sJ7zccZVL._AC_SL1500_.jpg",
    price: "COP $83.158",
    originalPrice: "",
    badge: "🏷️ 25% OFF con Prime",
    coupon: "COP $61.977 si tienes Prime",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-06"
  },
  {
    id: 87,
    title: "Mintakawa Arenero Automático para Gatos con APP",
    platform: "amazon",
    category: "mascotas",
    url: "https://link.amazon/B07pAk7x7",
    image: "https://m.media-amazon.com/images/I/61teP46ev1L._AC_SL1500_.jpg",
    price: "COP $391.803",
    originalPrice: "",
    badge: "⭐ 4.0 · 1K+ opiniones",
    coupon: "",
    shipping: "COP $276.702",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-06"
  },
  {
    id: 86,
    title: "CHCORE Regleta 8 Tomas con 4 USB (2 USB-C)",
    platform: "amazon",
    category: "tecnologia",
    url: "https://link.amazon/B0bZ948DS",
    image: "https://m.media-amazon.com/images/I/611zhZdA6DL._AC_SL1500_.jpg",
    price: "COP $39.151",
    originalPrice: "",
    badge: "🏷️ 17% OFF con Prime",
    coupon: "COP $32.620 si tienes Prime",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-06"
  },
  {
    id: 85,
    title: "UGREEN Uno Cargador 65W GaN, 3 Puertos",
    platform: "amazon",
    category: "tecnologia",
    url: "https://link.amazon/B0iVK1WFY",
    image: "https://m.media-amazon.com/images/I/51ZU5fSb9YL._AC_SL1500_.jpg",
    price: "COP $163.232",
    originalPrice: "",
    badge: "🏷️ 31% OFF con Prime",
    coupon: "COP $112.620 si tienes Prime",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-06"
  },
  {
    id: 84,
    title: "UGREEN Nexode Pro Cargador 65W GaN, 3 Puertos",
    platform: "amazon",
    category: "tecnologia",
    url: "https://link.amazon/B0golxjA5",
    image: "https://m.media-amazon.com/images/I/51ljPGvwJnL._AC_SL1500_.jpg",
    price: "COP $182.824",
    originalPrice: "",
    badge: "🏷️ 20% OFF con Prime",
    coupon: "COP $146.906 si tienes Prime",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-06"
  },
  {
    id: 83,
    title: "Ninja Licuadora Profesional 2.0 1200W Auto-iQ",
    platform: "amazon",
    category: "cocina",
    url: "https://link.amazon/B0irz9GIE",
    image: "https://m.media-amazon.com/images/I/61rZJywpS-L._AC_SL1000_.jpg",
    price: "COP $359.150",
    originalPrice: "",
    badge: "🏷️ 27% OFF con Prime",
    coupon: "COP $261.191 si tienes Prime",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-06"
  },
  {
    id: 82,
    title: "Ninja Máquina de Waffles Belga Pro BW1001",
    platform: "amazon",
    category: "cocina",
    url: "https://link.amazon/B0i1UykoK",
    image: "https://m.media-amazon.com/images/I/71DfP9MxqNL._AC_SL1500_.jpg",
    price: "COP $228.408",
    originalPrice: "COP $326.497",
    badge: "🏷️ 30% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-06"
  },
  {
    id: 81,
    title: "Asmodee Ticket to Ride Legacy: Legends of the West",
    platform: "amazon",
    category: "ninos",
    url: "https://link.amazon/B07aYhMSB",
    image: "https://m.media-amazon.com/images/I/91g4rzcbiPL._AC_SL1500_.jpg",
    price: "COP $326.530",
    originalPrice: "",
    badge: "🏷️ 12% OFF con Prime",
    coupon: "COP $288.946 si tienes Prime",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-06"
  },
  {
    id: 80,
    title: "TOCOBO Cotton Airy Sun Stick SPF 50 (Pack x2)",
    platform: "amazon",
    category: "belleza",
    url: "https://link.amazon/B0eClkRfO",
    image: "https://m.media-amazon.com/images/I/61CkSvGzs9L._SL1500_.jpg",
    price: "COP $75.069",
    originalPrice: "",
    badge: "🏷️ 33% OFF con Prime",
    coupon: "COP $49.926 si tienes Prime",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-06"
  },
  {
    id: 79,
    title: "FEZIBO Escritorio de Pie Eléctrico Ajustable",
    platform: "amazon",
    category: "hogar",
    url: "https://link.amazon/B0812i8cr",
    image: "https://m.media-amazon.com/images/I/71smFjr2QgL._AC_SL1500_.jpg",
    price: "COP $326.497",
    originalPrice: "",
    badge: "⭐ 4.5 · 4K+ opiniones",
    coupon: "",
    shipping: "COP $245.207",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-09-15: envío internacional de COP $244.400 (casi 66% extra sobre el precio)
  {
    id: 78,
    title: "MUXX.STIL Silla de Oficina Ergonómica Malla",
    platform: "amazon",
    category: "hogar",
    url: "https://link.amazon/B07P3kjNS",
    image: "https://m.media-amazon.com/images/I/81cM9gaUGRL._AC_SL1500_.jpg",
    price: "COP $372.310",
    originalPrice: "COP $465.403",
    badge: "🏷️ 20% OFF",
    coupon: "",
    shipping: "COP $244.400",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-09-15"
  },
  {
    id: 77,
    title: "OhO Gafas Inteligentes Bluetooth de Oído Abierto",
    platform: "amazon",
    category: "tecnologia",
    url: "https://link.amazon/B0ihkmMo9",
    image: "https://m.media-amazon.com/images/I/51zNJXGpTOL._AC_SL1200_.jpg",
    price: "COP $130.579",
    originalPrice: "",
    badge: "⭐ 4.1 · 6K+ opiniones",
    coupon: "",
    shipping: "",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 76,
    title: "ALLSWIFIT Tenis Deportivos sin Cordones para Mujer",
    platform: "amazon",
    category: "deporte",
    url: "https://link.amazon/B01b665U6",
    image: "https://m.media-amazon.com/images/I/61GV1MQr9gL._AC_SL1500_.jpg",
    price: "COP $159.158",
    originalPrice: "COP $176.815",
    badge: "⭐ 4.3 · 6.7K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-09-15"
  },
  {
    id: 75,
    title: "Wavytalk Plancha de Pelo a Vapor Antidaño",
    platform: "amazon",
    category: "belleza",
    url: "https://link.amazon/B07VisWd6",
    image: "https://m.media-amazon.com/images/I/61-HItePnWL._AC_SL1500_.jpg",
    price: "COP $195.885",
    originalPrice: "",
    badge: "⭐ 4.3 · 2K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 74,
    title: "Wavytalk Cepillo Térmico Redondo de Calor 1.5″",
    platform: "amazon",
    category: "belleza",
    url: "https://link.amazon/B02YkMnj9",
    image: "https://m.media-amazon.com/images/I/61QfCr+64wL._AC_SL1500_.jpg",
    price: "COP $147.366",
    originalPrice: "COP $214.114",
    badge: "🏷️ 31% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-09-15"
  },
  {
    id: 56,
    title: "Juguete Interactivo para Gatos Qraxond",
    platform: "amazon",
    category: "mascotas",
    url: "https://link.amazon/B08lrxT7J",
    image: "https://m.media-amazon.com/images/I/81BkPMBXkKL._AC_SL1500_.jpg",
    price: "COP $104.457",
    originalPrice: "",
    badge: "🏷️ 25% OFF con Prime",
    coupon: "COP $78.139 si tienes Prime",
    shipping: "gratis",
    highlight: true,
    featured: true,
    active: true,
    date: "2026-10-06"
  },
  {
    id: 31,
    title: "TOCOBO Cica Cooling Sun Stick SPF50+",
    platform: "amazon",
    category: "belleza",
    url: "https://link.amazon/B08GzqLkc",
    image: "https://m.media-amazon.com/images/I/51uMK6hgRvL._SL1200_.jpg",
    price: "COP $56.783",
    originalPrice: "",
    badge: "⭐ 4.6 · 2K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 73,
    title: "Nike Tenis de Entrenamiento para Hombre (Negro)",
    platform: "amazon",
    category: "moda",
    url: "https://link.amazon/B0ieOQ1zE",
    image: "https://m.media-amazon.com/images/I/71pCp8h5j4L._AC_SL1500_.jpg",
    price: "COP $290.579",
    originalPrice: "",
    badge: "⭐ 4.4 · 691 opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 72,
    title: "Nike Air Force 1 '07 Tenis para Hombre (Blanco)",
    platform: "amazon",
    category: "moda",
    url: "https://amzn.to/4xmsVRD",
    image: "https://m.media-amazon.com/images/I/610IQPC0HuL._AC_SL1500_.jpg",
    price: "COP $339.869",
    originalPrice: "",
    badge: "⭐ 4.5 · 2K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: false,
    date: "2026-09-11"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 71,
    title: "adidas Duramo Speed 2 Tenis de Running Hombre",
    platform: "amazon",
    category: "moda",
    url: "https://amzn.to/4A2xvqB",
    image: "https://m.media-amazon.com/images/I/51pLVygAprL._AC_SL1100_.jpg",
    price: "COP $225.323",
    originalPrice: "COP $278.100",
    badge: "🏷️ 19% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: false,
    date: "2026-09-11"
  },
  {
    id: 70,
    title: "Ninja Express Chop Triturador de Alimentos 200W",
    platform: "amazon",
    category: "cocina",
    url: "https://link.amazon/B07r5awiE",
    image: "https://m.media-amazon.com/images/I/61CJZI666BL._AC_SL1500_.jpg",
    price: "COP $158.693",
    originalPrice: "",
    badge: "⭐ 4.7 · 16K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 69,
    title: "FLEXTAILGEAR Bomba de Aire Portátil Ultra-Mini USB",
    platform: "amazon",
    category: "hogar",
    url: "https://link.amazon/B0cRNMXML",
    image: "https://m.media-amazon.com/images/I/71FckjPBB1L._AC_SL1500_.jpg",
    price: "COP $74.030",
    originalPrice: "COP $88.130",
    badge: "🏷️ 16% OFF con cupón",
    coupon: "16% OFF al marcar el cupón → queda en COP $74.030",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 68,
    title: "MOON LENCE Silla de Camping Portátil Plus (Pack x2)",
    platform: "amazon",
    category: "deporte",
    url: "https://link.amazon/B07BnJN7R",
    image: "https://m.media-amazon.com/images/I/61iFlRsUusL._AC_SL1500_.jpg",
    price: "COP $238.334",
    originalPrice: "",
    badge: "⭐ 4.3 · 1K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 67,
    title: "SHARDOR Molinillo de Café Eléctrico Profesional",
    platform: "amazon",
    category: "cocina",
    url: "https://link.amazon/B0dcCIQbY",
    image: "https://m.media-amazon.com/images/I/610o7fYfdEL._AC_SL1500_.jpg",
    price: "COP $251.395",
    originalPrice: "",
    badge: "⭐ 4.4 · 1K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 66,
    title: "SKIN1004 Hyalu-Cica Suero Solar Water-Fit (Pack x2)",
    platform: "amazon",
    category: "belleza",
    url: "https://link.amazon/B0aMLwpxZ",
    image: "https://m.media-amazon.com/images/I/71XGgejzDuL._SL1500_.jpg",
    price: "COP $78.988",
    originalPrice: "",
    badge: "🏷️ 22% OFF con Prime",
    coupon: "COP $61.453 si tienes Prime",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-10-06"
  },
  {
    id: 65,
    title: "Abib Barra Protección Solar SPF50+ Resplandeciente",
    platform: "amazon",
    category: "belleza",
    url: "https://link.amazon/B0bHK2F0W",
    image: "https://m.media-amazon.com/images/I/6122RdhYw2L._SL1500_.jpg",
    price: "COP $49.044",
    originalPrice: "",
    badge: "⭐ 4.5 · 6K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 64,
    title: "SKIN1004 Ampolleta Centella Poremizing 100ml",
    platform: "amazon",
    category: "belleza",
    url: "https://link.amazon/B0bnUjULQ",
    image: "https://m.media-amazon.com/images/I/61zILb6PBuL._SL1500_.jpg",
    price: "COP $58.775",
    originalPrice: "",
    badge: "⭐ 4.6 · 6K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 63,
    title: "Risk: Juego de Tronos - Juego de Mesa (Inglés)",
    platform: "amazon",
    category: "ninos",
    url: "https://link.amazon/B08LGVKMc",
    image: "https://m.media-amazon.com/images/I/81mIkXtk3LL._AC_SL1500_.jpg",
    price: "COP $235.101",
    originalPrice: "",
    badge: "⭐ 4.7 · 2K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 62,
    title: "Túnel para Gatos Plegable 3 Vías Tempcore",
    platform: "amazon",
    category: "mascotas",
    url: "https://link.amazon/B00SbubPu",
    image: "https://m.media-amazon.com/images/I/61MZx7nP3xL._AC_SL1500_.jpg",
    price: "COP $55.477",
    originalPrice: "",
    badge: "⭐ 4.6 · 18K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 61,
    title: "Saco de Dormir PTEROMY para Camping y Senderismo",
    platform: "amazon",
    category: "deporte",
    url: "https://link.amazon/B02di0JSY",
    image: "https://m.media-amazon.com/images/I/71kgvfqdyPL._AC_SL1500_.jpg",
    price: "COP $78.334",
    originalPrice: "",
    badge: "⭐ 4.5 · 915 opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: Amazon dice que no se puede enviar a Colombia
  {
    id: 60,
    title: "Sofá Cama Esponjoso COZY KISS para Gatos y Perros",
    platform: "amazon",
    category: "mascotas",
    url: "https://link.amazon/B0aTz5ile",
    image: "https://m.media-amazon.com/images/I/617aT1RsRqL._AC_SL1500_.jpg",
    price: "COP $76.394",
    originalPrice: "COP $122.249",
    badge: "🏷️ 38% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-25"
  },
  {
    id: 59,
    title: "UGREEN Revodok Pro 9 en 1 USB C Hub",
    platform: "amazon",
    category: "tecnologia",
    url: "https://link.amazon/B09PiEjbJ",
    image: "https://m.media-amazon.com/images/I/71scB9Eu7RL._AC_SL1500_.jpg",
    price: "COP $97.926",
    originalPrice: "",
    badge: "⭐ 4.4 · 1K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 58,
    title: "UGREEN Conmutador KVM HDMI 8K Doble Monitor",
    platform: "amazon",
    category: "tecnologia",
    url: "https://amzn.to/4xZdI9H",
    image: "https://m.media-amazon.com/images/I/71EQ1icnukL._AC_SL1500_.jpg",
    price: "COP $244.529",
    originalPrice: "COP $275.099",
    badge: "⭐ 3.8 · 302 opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-25"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 57,
    title: "Avatar: The Last Airbender - The Search Omnibus",
    platform: "amazon",
    category: "otros",
    url: "https://amzn.to/4gjkNMr",
    image: "https://m.media-amazon.com/images/I/81edIpjYO+L._SL1500_.jpg",
    price: "COP $74.377",
    originalPrice: "",
    badge: "⭐ 4.9 · 3K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-25"
  },
  {
    id: 55,
    title: "LHKNL Linterna Frontal LED 1200 Lúmenes (x2)",
    platform: "amazon",
    category: "deporte",
    url: "https://link.amazon/B0ae7ThJL",
    image: "https://m.media-amazon.com/images/I/71DxWxvCwlL._AC_SL1500_.jpg",
    price: "COP $58.742",
    originalPrice: "",
    badge: "⭐ 4.5 · 37K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 54,
    title: "TrailBuddy Bastones de Trekking Aluminio 7075",
    platform: "amazon",
    category: "deporte",
    url: "https://link.amazon/B0aVrXthj",
    image: "https://m.media-amazon.com/images/I/81mVGxNi+xL._AC_SL1500_.jpg",
    price: "COP $163.232",
    originalPrice: "",
    badge: "⭐ 4.7 · 63K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 53,
    title: "Wise Owl Hamaca de Camping Portátil con Correas",
    platform: "amazon",
    category: "deporte",
    url: "https://link.amazon/B0dov2DD7",
    image: "https://m.media-amazon.com/images/I/81OW4HrLbUL._AC_SL1500_.jpg",
    price: "COP $129.044",
    originalPrice: "",
    badge: "⭐ 4.8 · 30K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 52,
    title: "Plumero de Aire Comprimido 180.000 RPM",
    platform: "amazon",
    category: "tecnologia",
    url: "https://amzn.to/45ISUHx",
    image: "https://m.media-amazon.com/images/I/81i9ck3g2fL._AC_SL1500_.jpg",
    price: "COP $121.530",
    originalPrice: "COP $182.310",
    badge: "🏷️ 33% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-20"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 51,
    title: "UGREEN Cargador Compacto 30W USB-C (iPhone 17)",
    platform: "amazon",
    category: "tecnologia",
    url: "https://amzn.to/4xJthCc",
    image: "https://m.media-amazon.com/images/I/61AfYlS-zhL._AC_SL1500_.jpg",
    price: "COP $57.650",
    originalPrice: "COP $91.140",
    badge: "🏷️ 37% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-20"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 50,
    title: "UGREEN Cargador GaN 65W USB-C, 3 Puertos",
    platform: "amazon",
    category: "tecnologia",
    url: "https://amzn.to/4wDLHDs",
    image: "https://m.media-amazon.com/images/I/61WrdeLU9YL._AC_SL1500_.jpg",
    price: "COP $98.676",
    originalPrice: "COP $161.037",
    badge: "🏷️ 39% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-20"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 49,
    title: "GHome Enchufe Inteligente WiFi — Alexa y Google Home",
    platform: "amazon",
    category: "hogar",
    url: "https://amzn.to/4gkIVNs",
    image: "https://m.media-amazon.com/images/I/61mwZi5guiL._SL1500_.jpg",
    price: "COP $82.023",
    originalPrice: "COP $97.218",
    badge: "🏷️ 16% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-20"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 48,
    title: "LISEN Soporte Ajustable para Celular y Tablet",
    platform: "amazon",
    category: "tecnologia",
    url: "https://amzn.to/4hGDHxS",
    image: "https://m.media-amazon.com/images/I/61KD4hoirXL._AC_SL1289_.jpg",
    price: "COP $30.299",
    originalPrice: "COP $54.672",
    badge: "🔥 45% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-20"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 47,
    title: "Recipientes Herméticos DWËLLZA KITCHEN x5 con Tapas",
    platform: "amazon",
    category: "cocina",
    url: "https://amzn.to/4h7BFXj",
    image: "https://m.media-amazon.com/images/I/81q6QsghZOL._AC_SL1500_.jpg",
    price: "COP $125.990",
    originalPrice: "",
    badge: "⭐ 4.7 · 5.952 opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-03"
  },
  {
    id: 46,
    title: "Mochila Plegable FIORETTO 15L Senderismo y Viaje",
    platform: "amazon",
    category: "deporte",
    url: "https://link.amazon/B0e3uPhRk",
    image: "https://m.media-amazon.com/images/I/81dE643aFhL._AC_SL1500_.jpg",
    price: "COP $84.865",
    originalPrice: "",
    badge: "⭐ 4.4 · 350 opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 45,
    title: "Juego de Cartas Beat The Heat — Fiesta Familiar",
    platform: "amazon",
    category: "ninos",
    url: "https://link.amazon/B034N5cwi",
    image: "https://m.media-amazon.com/images/I/713dl3XS+DL._AC_SL1500_.jpg",
    price: "COP $31.967",
    originalPrice: "",
    badge: "⭐ 4.7 · 356 opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 44,
    title: "Adidas Terrex Skychaser AX5 Mid Gore-Tex Hombre",
    platform: "amazon",
    category: "deporte",
    url: "https://amzn.to/44ZAKB1",
    image: "https://m.media-amazon.com/images/I/61qhvFYqEZL._AC_SL1200_.jpg",
    price: "COP $363.221",
    originalPrice: "COP $442.182",
    badge: "🏷️ 18% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-03"
  },
  {
    id: 43,
    title: "Cartuchos Filtro Repuesto PHILIPS GoZero AWP231 x3",
    platform: "amazon",
    category: "cocina",
    url: "https://link.amazon/B03YYogit",
    image: "https://m.media-amazon.com/images/I/71F3EwDmcVL._AC_SL1500_.jpg",
    price: "COP $86.726",
    originalPrice: "",
    badge: "⭐ 4.4 · 102 opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: sin precio de compra de Amazon (solo 'Ver todas las opciones')
  {
    id: 42,
    title: "Brita UltraMax Dispensador de Agua Grande con Filtro",
    platform: "amazon",
    category: "cocina",
    url: "https://link.amazon/B00QoCICB",
    image: "https://m.media-amazon.com/images/I/71k6R32mIDL._SL1500_.jpg",
    price: "COP $108.923",
    originalPrice: "",
    badge: "⭐ 4.5 · 17K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-20"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 41,
    title: "SanDisk Extreme PRO Tarjeta SD 128GB 4K UHD",
    platform: "amazon",
    category: "tecnologia",
    url: "https://amzn.to/4gQuKSc",
    image: "https://m.media-amazon.com/images/I/719J6w3pB5L._AC_SL1500_.jpg",
    price: "COP $166.213",
    originalPrice: "",
    badge: "⭐ 4.8 · 672 opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-07-24"
  },
  {
    id: 40,
    title: "Paño de limpieza de lentes Koala - Microfibra japonesa (6 unidades)",
    platform: "amazon",
    category: "otros",
    url: "https://link.amazon/B062DMyHB",
    image: "https://m.media-amazon.com/images/I/71iuhiJShtL._AC_SL1500_.jpg",
    price: "COP $32.620",
    originalPrice: "",
    badge: "⭐ 4.7 · 28K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  {
    id: 39,
    title: "AXIS-Y Suero de Colágeno Vegano para Ojos",
    platform: "amazon",
    category: "belleza",
    url: "https://link.amazon/B0iHtL7FT",
    image: "https://m.media-amazon.com/images/I/61geVDBoMpL._SL1500_.jpg",
    price: "COP $52.212",
    originalPrice: "",
    badge: "⭐ 4.4 · 4K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 38,
    title: "BISSELL Little Green - Limpiador Portátil de Alfombras y Tapicería",
    platform: "amazon",
    category: "hogar",
    url: "https://amzn.to/4wb56fC",
    image: "https://m.media-amazon.com/images/I/717X5secGjL._AC_SL1500_.jpg",
    price: "COP $325.467",
    originalPrice: "COP $423.117",
    badge: "🏷️ 23% OFF",
    coupon: "",
    shipping: "COP $115.227",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-07-21"
  },
  // Desactivado 2026-10-05: el link ya no lleva al producto (Amazon: Documento no encontrado)
  {
    id: 37,
    title: "CATAN Traveler - Edición Compacta de Viaje",
    platform: "amazon",
    category: "ninos",
    url: "https://amzn.to/4r6UAEN",
    image: "https://m.media-amazon.com/images/I/71JPOzduGkL._AC_SL1500_.jpg",
    price: "COP $151.729",
    originalPrice: "COP $189.670",
    badge: "🏷️ 20% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-09-02"
  },
  {
    id: 36,
    title: "Exploding Kittens Edición Original en Español",
    platform: "amazon",
    category: "ninos",
    url: "https://link.amazon/B0dTRSc88",
    image: "https://m.media-amazon.com/images/I/61WeY4xe2ZL._AC_SL1024_.jpg",
    price: "COP $64.163",
    originalPrice: "",
    badge: "⭐ 4.8 · 1K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: Amazon dice que no se puede enviar a Colombia
  {
    id: 35,
    title: "Elizavecca Enjuague Tratamiento Colágeno 16.9oz",
    platform: "amazon",
    category: "belleza",
    url: "https://link.amazon/B0h4XVYS2",
    image: "https://m.media-amazon.com/images/I/51Z67GdO10L._SL1500_.jpg",
    price: "COP $44.263",
    originalPrice: "COP $63.202",
    badge: "🏷️ 30% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-09-02"
  },
  {
    id: 34,
    title: "Tratamiento Proteínas Colágeno Elizavecca CER-100",
    platform: "amazon",
    category: "belleza",
    url: "https://link.amazon/B0biI6suk",
    image: "https://m.media-amazon.com/images/I/61IHI9z38SL._SL1500_.jpg",
    price: "COP $22.824",
    originalPrice: "",
    badge: "⭐ 4.4 · 64K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 33,
    title: "Under Armour Charged Assert 10 - Zapatos para mujer",
    platform: "amazon",
    category: "moda",
    url: "https://amzn.to/4aWyJc8",
    image: "https://m.media-amazon.com/images/I/61RShTIZazL._AC_SL1500_.jpg",
    price: "COP $172.474",
    originalPrice: "COP $241.425",
    badge: "🏷️ 29% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-07-16"
  },
  // Desactivado 2026-09-02: sin precio de Amazon (la ficha solo ofrece
  // otros vendedores). Mismo producto que el id 66, que sí tiene precio.
  {
    id: 32,
    title: "SKIN1004 Sun Serum UV Centella Hyalu-Cica",
    platform: "amazon",
    category: "belleza",
    url: "https://amzn.to/4wF7Wtd",
    image: "https://m.media-amazon.com/images/I/61UhU+54OlL._SL1500_.jpg",
    price: "COP $51.196",
    originalPrice: "COP $67.205",
    badge: "🏷️ 24% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-31"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 30,
    title: "Aspiradora robot Lefant",
    platform: "amazon",
    category: "hogar",
    url: "https://amzn.to/4w4X08o",
    image: "https://m.media-amazon.com/images/I/61SeSmghSVL._AC_SL1500_.jpg",
    price: "COP $292.827",
    originalPrice: "COP $650.767",
    badge: "🔥 55% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-07-12"
  },
  {
    id: 29,
    title: "medicube Zero Pore Pad 2.0",
    platform: "amazon",
    category: "belleza",
    url: "https://link.amazon/B09MBYnEr",
    image: "https://m.media-amazon.com/images/I/71Mcspt-6AL._AC_SL1500_.jpg",
    price: "COP $61.714",
    originalPrice: "",
    badge: "⭐ 4.6 · 33K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 28,
    title: "Auriculares Skullcandy Crusher Evo",
    platform: "amazon",
    category: "tecnologia",
    url: "https://amzn.to/3SWyFD8",
    image: "https://m.media-amazon.com/images/I/714RrlRIn+L._AC_SL1500_.jpg",
    price: "COP $325.367",
    originalPrice: "COP $683.307",
    badge: "🔥 52% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-07-12"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 27,
    title: "Camiseta Zeagoo manga larga",
    platform: "amazon",
    category: "moda",
    url: "https://amzn.to/4byzDf1",
    image: "https://m.media-amazon.com/images/I/71WeHO3sUCL._AC_SL1500_.jpg",
    price: "COP $29.253",
    originalPrice: "COP $55.285",
    badge: "🔥 47% OFF",
    coupon: "",
    shipping: "",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-07-12"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 26,
    title: "Set de tablas de titanio",
    platform: "amazon",
    category: "cocina",
    url: "https://amzn.to/4gAWIBh",
    image: "https://m.media-amazon.com/images/I/714qXQhAnXL._AC_SL1500_.jpg",
    price: "COP $195.175",
    originalPrice: "COP $325.367",
    badge: "🔥 40% OFF",
    coupon: "",
    shipping: "",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-07-12"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 25,
    title: "Juego de cuchillos Astercook",
    platform: "amazon",
    category: "cocina",
    url: "https://amzn.to/4yjMD23",
    image: "https://m.media-amazon.com/images/I/61TheuxRpFL._AC_SL1500_.jpg",
    price: "COP $129.770",
    originalPrice: "COP $195.207",
    badge: "🏷️ 34% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-07-12"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 24,
    title: "Pantuflas Evshine de Felpa con Banda Cruzada",
    platform: "amazon",
    category: "moda",
    url: "https://amzn.to/4f8vCz4",
    image: "https://m.media-amazon.com/images/I/71rHrvgMwqL._AC_SL1500_.jpg",
    price: "COP $55.253",
    originalPrice: "COP $71.555",
    badge: "🏷️ 23% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-07-11"
  },
  {
    id: 23,
    title: "KOIOS Hervidor Eléctrico Cuello de Cisne 0.8L",
    platform: "amazon",
    category: "cocina",
    url: "https://link.amazon/B0iOS0wZx",
    image: "https://m.media-amazon.com/images/I/61n2K6HnaML._AC_SL1500_.jpg",
    price: "COP $146.905",
    originalPrice: "",
    badge: "⭐ 4.3 · 977 opiniones",
    coupon: "🎟️ 12% OFF al pagar",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 22,
    title: "Envasadora al Vacío Compacta con 20 Bolsas",
    platform: "amazon",
    category: "cocina",
    url: "https://amzn.to/4dOZmlb",
    image: "https://m.media-amazon.com/images/I/71mq9JkRdgL._AC_SL1500_.jpg",
    price: "COP $84.658",
    originalPrice: "COP $320.908",
    badge: "🔥 74% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-04"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 21,
    title: "Tapetes Antifatiga GENIMO Set x2 para Cocina",
    platform: "amazon",
    category: "hogar",
    url: "https://amzn.to/4o9muON",
    image: "https://m.media-amazon.com/images/I/91ji62lvgkL._AC_SL1500_.jpg",
    price: "COP $85.549",
    originalPrice: "COP $106.874",
    badge: "🏷️ 20% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-04"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 20,
    title: "Rallador Rotativo SUSTEAS 5 Cuchillas con Almacenamiento",
    platform: "amazon",
    category: "cocina",
    url: "https://amzn.to/4dMxHBm",
    image: "https://m.media-amazon.com/images/I/71aUlmnngOL._AC_SL1500_.jpg",
    price: "COP $105.876",
    originalPrice: "COP $117.643",
    badge: "⭐ 4.4 · 6K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-04"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 19,
    title: "Tineco Floor ONE S7 Stretch Ultra — Aspira y friega, 180°, autolimpieza",
    platform: "amazon",
    category: "hogar",
    url: "https://amzn.to/4o4yFMR",
    image: "https://m.media-amazon.com/images/I/61zNj-9L5UL._AC_SL1500_.jpg",
    price: "COP $1.412.460",
    originalPrice: "COP $2.120.460",
    badge: "🔥 33% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-07"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 18,
    title: "Aspiradora Shark PowerPro Plus — Inalámbrica, HEPA, 50 min, pelo mascotas",
    platform: "amazon",
    category: "hogar",
    url: "https://amzn.to/3QcWXYt",
    image: "https://m.media-amazon.com/images/I/71-u+rvnLDL._AC_SL1500_.jpg",
    price: "COP $778.764",
    originalPrice: "COP $1.238.964",
    badge: "🔥 37% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-07"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 17,
    title: "AXV Plataforma vibración fitness — Cuerpo completo, gym en casa",
    platform: "amazon",
    category: "deporte",
    url: "https://amzn.to/4fn07TK",
    image: "https://m.media-amazon.com/images/I/71QH5ti5pWL._AC_SL1500_.jpg",
    price: "COP $318.529",
    originalPrice: "COP $460.164",
    badge: "🏷️ 31% OFF",
    coupon: "",
    shipping: "",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-07"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 16,
    title: "Logitech MX Mouse Vertical — Ergonómico, 3 dispositivos, recargable",
    platform: "amazon",
    category: "tecnologia",
    url: "https://amzn.to/3PSG9G6",
    image: "https://m.media-amazon.com/images/I/61iiZ-gDYEL._AC_SL1500_.jpg",
    price: "COP $273.996",
    originalPrice: "COP $424.764",
    badge: "🏷️ 35% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-07"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 15,
    title: "Bicicleta equilibrio Gamfeiny — Luces, 10-36 meses, ruedas silenciosas",
    platform: "amazon",
    category: "ninos",
    url: "https://amzn.to/4u7hA6p",
    image: "https://m.media-amazon.com/images/I/618n4Z3xj7L._AC_SL1500_.jpg",
    price: "COP $106.129",
    originalPrice: "COP $176.964",
    badge: "🔥 40% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-07"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 14,
    title: "Auriculares bmani Bluetooth — 80H batería, pantalla LED, micrófono",
    platform: "amazon",
    category: "tecnologia",
    url: "https://amzn.to/4vqa0ol",
    image: "https://m.media-amazon.com/images/I/71GPFE2yHGL._AC_SL1500_.jpg",
    price: "COP $87.296",
    originalPrice: "COP $141.564",
    badge: "🔥 38% OFF",
    coupon: "",
    shipping: "",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-07"
  },
  {
    id: 13,
    title: "Fuente de agua inalámbrica para gatos FEELNEEDY 3.5L",
    platform: "amazon",
    category: "mascotas",
    url: "https://link.amazon/B06cxHCJI",
    image: "https://m.media-amazon.com/images/I/71yYHjMgdmL._AC_SL1500_.jpg",
    price: "COP $163.232",
    originalPrice: "",
    badge: "⭐ 4.4 · 625 opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-10-05"
  },
  // Desactivado 2026-10-05: Amazon dice que no se puede enviar a Colombia
  {
    id: 12,
    title: "UPFAS Caja arena autolimpiante — App, monitoreo peso, silenciosa para gatos",
    platform: "amazon",
    category: "mascotas",
    url: "https://link.amazon/B06qMwhbY",
    image: "https://m.media-amazon.com/images/I/616zZxB0g1L._AC_SL1500_.jpg",
    price: "COP $331.221",
    originalPrice: "COP $368.053",
    badge: "⭐ 4.1 · 1.4K+ opiniones",
    coupon: "",
    shipping: "COP $253.392",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-20"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 11,
    title: "GNMN Auriculares Bluetooth ANC — Cancelación ruido, 90H batería, resistente al agua",
    platform: "amazon",
    category: "tecnologia",
    url: "https://amzn.to/4tYiD8B",
    image: "https://m.media-amazon.com/images/I/71t-NRjVRtL._AC_SX679_.jpg",
    price: "COP $258.082",
    originalPrice: "COP $663.761",
    badge: "🔥 61% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-08"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 10,
    title: "American Tourister Stratum 2.0 — Set x3 maletas expandibles ruedas giratorias",
    platform: "amazon",
    category: "moda",
    url: "https://amzn.to/42UzPAM",
    image: "https://m.media-amazon.com/images/I/91PHnEWtE3L._AC_SX679_.jpg",
    price: "COP $645.323",
    originalPrice: "COP $1.290.570",
    badge: "🔥 50% OFF",
    coupon: "",
    shipping: "",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-08"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 9,
    title: "Christopher Knight Home Isaiah — Silla huevo mimbre colgante interior/exterior",
    platform: "amazon",
    category: "hogar",
    url: "https://amzn.to/3RH9weT",
    image: "https://m.media-amazon.com/images/I/81HUp-mbhVL._AC_SX679_.jpg",
    price: "COP $446.396",
    originalPrice: "COP $943.920",
    badge: "🔥 53% OFF",
    coupon: "",
    shipping: "",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-08"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 8,
    title: "Thermos Funtainer — Recipiente comida aislado niños con cuchara plegable 10 oz",
    platform: "amazon",
    category: "ninos",
    url: "https://amzn.to/49mbHe0",
    image: "https://m.media-amazon.com/images/I/61jOstDx55L._AC_SX679_.jpg",
    price: "COP $37.908",
    originalPrice: "COP $77.413",
    badge: "🔥 51% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-08"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 7,
    title: "Rihero Sandalias planas verano — Punta cuadrada, cuero genuino, deslizables",
    platform: "amazon",
    category: "moda",
    url: "https://amzn.to/4abY8ht",
    image: "https://m.media-amazon.com/images/I/51stPz0Rm8L._AC_SX679_.jpg",
    price: "COP $87.000",
    originalPrice: "COP $147.437",
    badge: "🏷️ 41% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-08"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 6,
    title: "PRETTYGARDEN Vestido maxi floral — Bohemio tirantes, boda playa, verano 2026",
    platform: "amazon",
    category: "moda",
    url: "https://amzn.to/3RH9zY7",
    image: "https://m.media-amazon.com/images/I/71IBvLBxohL._AC_SX679_.jpg",
    price: "COP $110.612",
    originalPrice: "COP $184.285",
    badge: "🏷️ 40% OFF",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-06-08"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 5,
    title: "LEGO Trofeo Oficial Mundial FIFA — Coleccionable para fanáticos del fútbol",
    platform: "amazon",
    category: "ninos",
    url: "https://amzn.to/49PkVj0",
    image: "https://m.media-amazon.com/images/I/81C3y4Yjr4L._AC_SL1500_.jpg",
    price: "COP $737.263",
    originalPrice: "",
    coupon: "",
    shipping: "COP $116.051",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-05-24",
    badge: "⭐ 4.8 · + COP $116.051 envío"
  },
  // Desactivado 2026-10-05: limpieza del catálogo (solo quedan los productos principales)
  {
    id: 4,
    title: "Logitech Lift — Mouse Ergonómico Vertical Inalámbrico, clics silenciosos",
    platform: "amazon",
    category: "tecnologia",
    url: "https://amzn.to/4g9VzQz",
    image: "https://m.media-amazon.com/images/I/61MD2KObDvL._AC_SL1500_.jpg",
    price: "COP $176.232",
    originalPrice: "COP $243.090",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-08-20",
    badge: "🏷️ 28% OFF"
  },
  {
    id: 1,
    title: "Caja de arena automática para gatos — Autolimpiante, silenciosa y con app",
    platform: "amazon",
    category: "mascotas",
    url: "https://amzn.to/4uhWGSZ",
    image: "https://m.media-amazon.com/images/I/616zZxB0g1L._AC_SL1500_.jpg",
    price: "COP $549.674",
    originalPrice: "",
    badge: "",
    coupon: "",
    shipping: "",
    highlight: false,
    featured: false,
    active: false,
    date: "2026-05-17"
  }
];

// ───────────────────────────────────────────────────
//  CAMPAÑAS ACTIVAS (Hot Sale, Días Naranja, etc.)
//  Borrá el array si no querés mostrar esta sección.
//  Campos:
//    id       · clave única
//    title    · ej "Hot Sale Mercado Libre"
//    subtitle · ej "Hasta 70% OFF · Termina el 28 may"
//    store    · "Amazon" | "Mercado Libre" — define la inicial del logo
//    color    · color del logo (#FF9900 Amazon, #FFE600 ML, etc.)
//    url      · link a la campaña
//    active   · true para mostrar
// ───────────────────────────────────────────────────

var BIBI_CAMPANAS = [
  // Ejemplo — descomenta y editá cuando haya campañas activas:
  // {
  //   id: "hot-sale-2026",
  //   title: "Hot Sale Mercado Libre",
  //   subtitle: "Hasta 70% OFF · Termina el 28 may",
  //   store: "Mercado Libre",
  //   color: "#FFE600",
  //   url: "https://www.mercadolibre.com.co/hot-sale",
  //   active: true
  // },
];

// ───────────────────────────────────────────────────
//  VIDEOS / REELS
//  Cada vez que publiques un video, reel o carrusel, agregá su entrada acá:
//  la página muestra arriba del todo "En el video de esta semana" con esos
//  productos numerados en el mismo orden en que salen en el video.
//
//  Campos por video:
//    id        · clave única, usá la fecha ("2026-08-29").
//                Link directo para la historia:  …/links/#video-2026-08-29
//    title     · ej "Rutina de belleza coreana"
//    subtitle  · ej "Los 7 productos que mostré"
//    date      · "YYYY-MM-DD" — fecha en que se publicó el video
//    red       · "instagram" | "tiktok" | "" (solo define la etiqueta)
//    url       · link al video, "" si todavía no lo tenés
//    productos · [ids de BIBI_LINKS] en el MISMO orden del video
//    active    · true = se muestra. Dejá en true SOLO el último video.
//
//  Los productos que estén en el video activo no se repiten más abajo
//  en "Destacados de la semana".
// ───────────────────────────────────────────────────

var BIBI_VIDEOS = [
  {
    id: "2026-08-31",
    title: "Rutina de belleza coreana",
    subtitle: "Los productos que mostré esta semana",
    date: "2026-08-31",
    red: "instagram",
    url: "",
    productos: [29, 31, 32, 34, 35, 39],
    active: true
  }
];

// ───────────────────────────────────────────────────
//  COLECCIONES
//  Las tarjetas de la portada. Cada colección junta productos por
//  categoría y/o por ids sueltos, y abre su propia vista dentro de la
//  misma página (link directo: …/links/#col-belleza-coreana).
//
//  Campos por colección:
//    id         · clave única en kebab-case (va en el link)
//    title      · nombre que se ve en la tarjeta
//    subtitle   · una línea corta que da contexto
//    categorias · [claves de BIBI_CATEGORIAS] que entran completas
//    productos  · [ids sueltos] que querés sumar además de las categorías
//    destacada  · true = sube a lo alto de la portada, encima del carrusel
//                 de "Destacados de la semana" (podés destacar más de una)
//    active     · true para mostrarla
//
//  Una colección sin productos activos no se muestra.
// ───────────────────────────────────────────────────

var BIBI_COLECCIONES = [
  {
    id: "belleza-coreana",
    title: "Belleza coreana",
    subtitle: "K-beauty que probé y repito",
    categorias: ["belleza"],
    productos: [],
    destacada: true,
    active: true
  },
  {
    id: "tecnologia-util",
    title: "Tecnología útil",
    subtitle: "Lo que uso todos los días",
    categorias: ["tecnologia"],
    productos: [],
    destacada: false,
    active: true
  },
  {
    id: "cocina-y-cafe",
    title: "Cocina y café",
    subtitle: "Para cocinar rico sin complicarte",
    categorias: ["cocina"],
    productos: [],
    destacada: false,
    active: true
  },
  {
    id: "casa-en-orden",
    title: "Casa en orden",
    subtitle: "Limpieza y cositas para el hogar",
    categorias: ["hogar"],
    productos: [],
    destacada: false,
    active: true
  },
  {
    id: "consentir-mascotas",
    title: "Consentir mascotas",
    subtitle: "Gatos y perros felices",
    categorias: ["mascotas"],
    productos: [],
    destacada: false,
    active: true
  },
  {
    id: "juegos-y-familia",
    title: "Juegos y familia",
    subtitle: "Mesa, niños y planes en casa",
    categorias: ["ninos"],
    productos: [],
    destacada: false,
    active: true
  },
  {
    id: "aire-libre",
    title: "Aire libre",
    subtitle: "Camping, caminatas y entrenar",
    categorias: ["deporte"],
    productos: [],
    destacada: false,
    active: true
  },
  {
    id: "moda-y-viaje",
    title: "Moda y viaje",
    subtitle: "Ropa cómoda y maletas",
    categorias: ["moda"],
    productos: [],
    destacada: false,
    active: true
  },
  {
    id: "curiosidades",
    title: "Curiosidades",
    subtitle: "Antojos que valen la pena",
    categorias: ["otros"],
    productos: [],
    destacada: false,
    active: true
  }
];

// ───────────────────────────────────────────────────
//  PROMOS MOMENTÁNEAS
//  Cupones y promos que duran poco. Se muestran como una pastilla fija
//  abajo de la pantalla y, si popup es true, además como ventana
//  emergente (una sola vez por visita, a los pocos segundos).
//
//  Campos por promo:
//    id        · clave única (si la cambiás, el popup vuelve a mostrarse)
//    title     · titular corto, ej "Cupón del día"
//    text      · el detalle, ej "10% OFF al pagar el hervidor KOIOS"
//    code      · código a copiar, "" si el cupón se activa en la página
//    cta       · texto del botón, ej "Ver el producto"
//    url       · a dónde lleva (link de afiliado o ancla interna)
//    producto  · id de BIBI_LINKS para mostrar su foto, o null
//    popup     · true = además de la pastilla, abre la ventana emergente
//    hasta     · "YYYY-MM-DD" último día que se muestra ("" = sin límite)
//    active    · true para mostrarla
//
//  Se muestra solo la primera promo activa y vigente.
// ───────────────────────────────────────────────────

var BIBI_PROMOS = [
  {
    id: "cupon-juguete-qraxond-oct",
    title: "Precio Prime",
    text: "Juguete interactivo para gatos Qraxond: con Prime queda en COP $78.139 (en vez de COP $104.457)",
    code: "",
    cta: "Ver el producto",
    url: "https://link.amazon/B08lrxT7J",
    producto: 56,
    popup: true,
    hasta: "",
    active: true
  }
];

// ───────────────────────────────────────────────────
//  CATEGORÍAS
//  Sólo aparecen las que tienen al menos un producto activo.
// ───────────────────────────────────────────────────

var BIBI_CATEGORIAS = {
  tecnologia: { label: "Tecnología" },
  belleza:    { label: "Belleza"    },
  moda:       { label: "Moda"       },
  hogar:      { label: "Hogar"      },
  cocina:     { label: "Cocina"     },
  deporte:    { label: "Deporte"    },
  ninos:      { label: "Niños"      },
  mascotas:   { label: "Mascotas"   },
  otros:      { label: "Otros"      }
};

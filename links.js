// ═══════════════════════════════════════════════════
//  BIBI RECOMIENDA — Base de datos
//  Editá este archivo para agregar / quitar productos y campañas.
// ═══════════════════════════════════════════════════

// ───────────────────────────────────────────────────
//  PRODUCTOS
//  Campos por producto:
//    id         · número único (cualquier valor, sólo para React keys)
//    title      · nombre que se ve en la card
//    platform   · "amazon" | "mercadolibre" (define el badge)
//    category   · clave de CATEGORIAS abajo (ej "cocina")
//    url        · link de afiliado
//    image      · URL de la imagen (idealmente cuadrada, fondo blanco)
//    price      · texto del precio ej "COP $68.443"  (sin precio anterior — los precios cambian día a día)
//    coupon     · texto del cupón si aplica, ej "Ahorra 10%"  (opcional)
//    featured   · true para que aparezca como "Pick del día" (sólo uno a la vez)
//    active     · true para que se muestre, false para esconder sin borrar
//    date       · "YYYY-MM-DD" — fecha en que lo agregaste, para ordenar
// ───────────────────────────────────────────────────

var BIBI_LINKS = [
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
    active: true,
    date: "2026-06-04"
  },
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
    active: true,
    date: "2026-06-04"
  },
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
    active: true,
    date: "2026-06-04"
  },
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
    highlight: true,
    featured: false,
    active: true,
    date: "2026-06-07"
  },
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
    highlight: true,
    featured: false,
    active: true,
    date: "2026-06-07"
  },
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
    highlight: true,
    featured: false,
    active: true,
    date: "2026-06-07"
  },
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
    highlight: true,
    featured: false,
    active: true,
    date: "2026-06-07"
  },
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
    highlight: true,
    featured: false,
    active: true,
    date: "2026-06-07"
  },
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
    highlight: true,
    featured: false,
    active: true,
    date: "2026-06-07"
  },
  {
    id: 13,
    title: "Fuente de agua inalámbrica para gatos FEELNEEDY 3.5L",
    platform: "amazon",
    category: "mascotas",
    url: "https://amzn.to/49UASET",
    image: "https://m.media-amazon.com/images/I/61h6AIoARIL._AC_SL1500_.jpg",
    price: "COP $162.450",
    originalPrice: "",
    badge: "⭐ 4.0 · 1K+ opiniones",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: true,
    active: true,
    date: "2026-06-02"
  },
  {
    id: 12,
    title: "UPFAS Caja arena autolimpiante — App, monitoreo peso, silenciosa para gatos",
    platform: "amazon",
    category: "mascotas",
    url: "https://amzn.to/4nOg87a",
    image: "https://m.media-amazon.com/images/I/616zZxB0g1L._AC_SL1500_.jpg",
    price: "COP $465.165",
    originalPrice: "",
    badge: "⭐ 4.1 · 1K+ opiniones",
    coupon: "",
    shipping: "COP $301.004",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-05-27"
  },
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
    active: true,
    date: "2026-06-08"
  },
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
    active: true,
    date: "2026-06-08"
  },
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
    active: true,
    date: "2026-06-08"
  },
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
    active: true,
    date: "2026-06-08"
  },
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
    active: true,
    date: "2026-06-08"
  },
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
    active: true,
    date: "2026-06-08"
  },
  {
    id: 5,
    title: "LEGO Trofeo Oficial Mundial FIFA — Coleccionable para fanáticos del fútbol",
    platform: "amazon",
    category: "ninos",
    url: "https://amzn.to/49PkVj0",
    image: "https://m.media-amazon.com/images/I/81C3y4Yjr4L._AC_SL1500_.jpg",
    price: "COP $737.263",
    coupon: "",
    shipping: "COP $116.051",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-05-24",
    badge: "⭐ 4.8 · + COP $116.051 envío"
  },
  {
    id: 4,
    title: "Logitech Lift — Mouse Ergonómico Vertical Inalámbrico, clics silenciosos",
    platform: "amazon",
    category: "tecnologia",
    url: "https://amzn.to/3RGbXOQ",
    image: "https://m.media-amazon.com/images/I/61MD2KObDvL._AC_SL1500_.jpg",
    price: "COP $254.369",
    coupon: "",
    shipping: "gratis",
    highlight: false,
    featured: false,
    active: true,
    date: "2026-05-24",
    badge: "📦 Envío gratis"
  },
  {
    id: 3,
    title: "Trituradora de carne y pollo 10 pulgadas — con cepillo, sin BPA",
    platform: "amazon",
    category: "cocina",
    url: "https://amzn.to/3Poe49o",
    image: "https://m.media-amazon.com/images/I/812lBocYTIL._AC_SL1500_.jpg",
    price: "COP $68.443",
    coupon: "Ahorra 10%",
    featured: false,
    active: true,
    date: "2026-05-17"
  },
  {
    id: 2,
    title: "OLESILK Bolsas de Gel Terapia Frío y Calor x6 — Lactancia, dolor de cabeza y ojos",
    platform: "amazon",
    category: "hogar",
    url: "https://amzn.to/4ustKYn",
    image: "https://m.media-amazon.com/images/I/71W-iwLyURL._AC_SL1500_.jpg",
    price: "COP $57.029",
    coupon: "",
    featured: false,
    active: true,
    date: "2026-05-17"
  },
  {
    id: 1,
    title: "Caja de arena automática para gatos — Autolimpiante, silenciosa y con app",
    platform: "amazon",
    category: "mascotas",
    url: "https://amzn.to/4uhWGSZ",
    image: "https://m.media-amazon.com/images/I/616zZxB0g1L._AC_SL1500_.jpg",
    price: "COP $549.674",
    coupon: "",
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

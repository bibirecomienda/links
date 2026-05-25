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
    id: 11,
    title: "DeLonghi Dedica — Máquina de espresso 15 bares, acero inoxidable",
    platform: "amazon",
    category: "cocina",
    url: "https://amzn.to/4wzK37f",
    image: "https://m.media-amazon.com/images/I/51+RciUs53L._AC_SX679_.jpg",
    price: "COP $552.791",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-05-24",
    badge: "🔥 40% OFF"
  },
  {
    id: 10,
    title: "Navatiee Carrito Plegable — Para playa, camping y jardín",
    platform: "amazon",
    category: "hogar",
    url: "https://amzn.to/3YZ8aBc",
    image: "https://m.media-amazon.com/images/I/81QteeoKZ4L._AC_SX679_.jpg",
    price: "COP $258.018",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-05-24",
    badge: "🔥 42% OFF"
  },
  {
    id: 9,
    title: "WIHOLL Two Piece Sets for Women — Loungewear de verano",
    platform: "amazon",
    category: "moda",
    url: "https://amzn.to/3YYaBzV",
    image: "https://m.media-amazon.com/images/I/81wUCsoQZvL._AC_SY879_.jpg",
    price: "COP $66.246",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-05-24",
    badge: "🔥 40% OFF"
  },
  {
    id: 8,
    title: "maamgic — Pantalones de natación elásticos de 5 pulgadas",
    platform: "amazon",
    category: "moda",
    url: "https://amzn.to/3YXcDEF",
    image: "https://m.media-amazon.com/images/I/712jeeE6OXL._AC_SX679_.jpg",
    price: "COP $86.227",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-05-24",
    badge: "🔥 42% OFF"
  },
  {
    id: 7,
    title: "Jasonwell Flotador de Piscina Inflable 4 en 1 para bronceado",
    platform: "amazon",
    category: "ninos",
    url: "https://amzn.to/3YXaBqW",
    image: "https://m.media-amazon.com/images/I/71goaDpLYxL._AC_SX679_.jpg",
    price: "COP $110.484",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-05-24",
    badge: "🔥 40% OFF"
  },
  {
    id: 6,
    title: "SEREED — Bicicleta de equilibrio para bebés de 1-2 años",
    platform: "amazon",
    category: "ninos",
    url: "https://amzn.to/3XYZaBc",
    image: "https://m.media-amazon.com/images/I/61tilO4erpL._AC_SX679_.jpg",
    price: "COP $110.484",
    shipping: "gratis",
    highlight: true,
    featured: false,
    active: true,
    date: "2026-05-24",
    badge: "⭐ 4.8 · 35% OFF"
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
    featured: true,
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
    active: true,
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

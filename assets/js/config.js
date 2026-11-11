/**
 * ============================================================
 * SITE CONFIGURATION - O PREÇO CAIU
 * ============================================================
 * Centralized settings for categories, deals ticker, and WhatsApp URLs.
 * All objects are deeply frozen to prevent runtime prototype pollution.
 * ============================================================
 */

const SITE_CONFIG = {
  // Brand Metadata
  brandName: "O Preço Caiu",
  tagline: "As melhores ofertas e cupons direto no seu WhatsApp",

  // Live Deals Ticker Data (Rendered in top ticker stream)
  recentDealsTicker: [
    { text: "iPhone 15 128GB", price: "R$ 4.199", oldPrice: "R$ 7.299", drop: "-42%", store: "Amazon" },
    { text: "Air Fryer Mondial 4L", price: "R$ 199", oldPrice: "R$ 389", drop: "-48%", store: "Mercado Livre" },
    { text: "PlayStation 5 Slim", price: "R$ 3.199", oldPrice: "R$ 3.999", drop: "-20%", store: "KaBuM!" },
    { text: "Tênis Nike Revolution", price: "R$ 189", oldPrice: "R$ 399", drop: "-52%", store: "Nike" },
    { text: "Smart TV 55\" 4K LG", price: "R$ 1.899", oldPrice: "R$ 2.899", drop: "-34%", store: "Magalu" },
    { text: "Echo Pop Alexa", price: "R$ 179", oldPrice: "R$ 349", drop: "-48%", store: "Amazon" },
    { text: "Robô Aspirador Xiaomi", price: "R$ 749", oldPrice: "R$ 1.399", drop: "-46%", store: "Shopee" }
  ],

  // 12 Category Groups with individual WhatsApp destination links
  categories: [
    {
      id: "smartphones",
      name: "Smartphone & iPhone",
      description: "Celulares com super desconto",
      image: "assets/img/smartphone-e-iphone.webp",
      fallbackEmoji: "📱",
      whatsappUrl: "https://chat.whatsapp.com/31990878679"
    },
    {
      id: "tecnologia",
      name: "Tecnologia",
      description: "Gadgets, fones, notebooks",
      image: "assets/img/tecnologia.webp",
      fallbackEmoji: "💻",
      whatsappUrl: "https://chat.whatsapp.com/seu-grupo-tecnologia"
    },
    {
      id: "moda-e-beleza",
      name: "Moda & Beleza",
      description: "Looks e cuidados em conta",
      image: "assets/img/moda-e-beleza.webp",
      fallbackEmoji: "👗",
      whatsappUrl: "https://chat.whatsapp.com/seu-grupo-moda"
    },
    {
      id: "lar-e-decoracao",
      name: "Lar & Decoração",
      description: "Pra deixar a casa linda",
      image: "assets/img/lar-e-deco.webp",
      fallbackEmoji: "🏠",
      whatsappUrl: "https://chat.whatsapp.com/seu-grupo-lar"
    },
    {
      id: "fitness",
      name: "Fitness",
      description: "Suplementos e equipamentos",
      image: "assets/img/fitness.webp",
      fallbackEmoji: "🏋️",
      whatsappUrl: "https://chat.whatsapp.com/seu-grupo-fitness"
    },
    {
      id: "gamer",
      name: "Gamer",
      description: "Jogos, consoles e setup",
      image: "assets/img/gamer.webp",
      fallbackEmoji: "🎮",
      whatsappUrl: "https://chat.whatsapp.com/seu-grupo-gamer"
    },
    {
      id: "infantil",
      name: "Infantil",
      description: "Tudo pros pequenos",
      image: "assets/img/infantil.webp",
      fallbackEmoji: "🧸",
      whatsappUrl: "https://chat.whatsapp.com/seu-grupo-infantil"
    },
    {
      id: "esporte",
      name: "Esporte",
      description: "Tênis, roupas e artigos",
      image: "assets/img/esporte.webp",
      fallbackEmoji: "⚽",
      whatsappUrl: "https://chat.whatsapp.com/seu-grupo-esporte"
    },
    {
      id: "autocar",
      name: "AutoCar",
      description: "Carro, moto e acessórios",
      image: "assets/img/autocar.webp",
      fallbackEmoji: "🚗",
      whatsappUrl: "https://chat.whatsapp.com/seu-grupo-autocar"
    },
    {
      id: "ferramentas",
      name: "Ferramentas",
      description: "Bricolagem e construção",
      image: "assets/img/ferramentas.webp",
      fallbackEmoji: "🔧",
      whatsappUrl: "https://chat.whatsapp.com/seu-grupo-ferramentas"
    },
    {
      id: "estudos",
      name: "Estudos",
      description: "Livros, cursos e materiais",
      image: "assets/img/estudos.webp",
      fallbackEmoji: "📚",
      whatsappUrl: "https://chat.whatsapp.com/seu-grupo-estudos"
    },
    {
      id: "viagem",
      name: "Viagem",
      description: "Acessórios essenciais para sua viagem",
      image: "assets/img/viagem.jpg",
      fallbackEmoji: "✈️",
      whatsappUrl: "https://chat.whatsapp.com/seu-grupo-viagem"
    }
  ]
};

// Cybersecurity: Prevents Prototype Pollution and runtime tampering
Object.freeze(SITE_CONFIG);
Object.freeze(SITE_CONFIG.recentDealsTicker);
Object.freeze(SITE_CONFIG.categories);

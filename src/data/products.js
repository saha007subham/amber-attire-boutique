export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Maroon Zari Woven Kanjivaram Silk",
    price: 12499,
    image: "/images/kanjivaram-silk.png",
    badge: "BESTSELLER"
  },
  {
    id: 2,
    name: "Maroon Tissue Banarasi Saree",
    price: 15999,
    image: "/images/maroon-banarasi.png",
    badge: "NEW"
  },
  {
    id: 3,
    name: "Emerald Green Mysore Silk",
    price: 8999,
    image: "/images/mysore-silk.png",
    badge: ""
  },
  {
    id: 4,
    name: "Peach Embroidered Organza Saree",
    price: 10500,
    image: "/images/organza-saree.png",
    badge: "LIMITED"
  },
  {
    id: 5,
    name: "Midnight Blue Silk Handloom",
    price: 14200,
    image: "/images/silk-sarees.png",
    badge: "NEW"
  },
  {
    id: 6,
    name: "Golden Festive Tissue Silk",
    price: 18500,
    image: "/images/festive-wear.png",
    badge: "BESTSELLER"
  },
  {
    id: 7,
    name: "Crimson Red Bridal Saree",
    price: 24500,
    image: "/images/wedding-collection.png",
    badge: "LIMITED"
  },
  {
    id: 8,
    name: "Pastel Pink Party Wear Geo",
    price: 7800,
    image: "/images/party-wear.png",
    badge: ""
  }
];

export const SILK_SAREES = [
  {
    id: 101,
    name: "Royal Blue Kanjivaram Silk",
    price: 18500,
    image: "/images/kanjivaram-silk.png",
    badge: "NEW"
  },
  {
    id: 102,
    name: "Golden Tissue Mysore Silk",
    price: 15200,
    image: "/images/mysore-silk.png",
    badge: "BESTSELLER"
  },
  {
    id: 103,
    name: "Emerald Patola Silk",
    price: 21000,
    image: "/images/silk-sarees.png",
    badge: "PREMIUM"
  },
  {
    id: 104,
    name: "Crimson Red Banarasi Silk",
    price: 19500,
    image: "/images/maroon-banarasi.png",
    badge: "LIMITED"
  }
];

export const WEDDING_COLLECTION = [
  {
    id: 201,
    name: "Classic Vermilion Bridal Saree",
    price: 35000,
    image: "/images/wedding-collection.png",
    badge: "EXCLUSIVE"
  },
  {
    id: 202,
    name: "Ivory & Gold Zari Gown Saree",
    price: 28500,
    image: "/images/festive-wear.png",
    badge: "NEW"
  },
  {
    id: 203,
    name: "Ruby Red Kanjivaram Bridal",
    price: 42000,
    image: "/images/kanjivaram-silk.png",
    badge: "LIMITED"
  },
  {
    id: 204,
    name: "Blush Pink Embroidered Net",
    price: 18500,
    image: "/images/organza-saree.png",
    badge: ""
  }
];

export const PARTY_WEAR = [
  {
    id: 301,
    name: "Midnight Sequinned Georgette",
    price: 12500,
    image: "/images/silk-sarees.png",
    badge: "NEW"
  },
  {
    id: 302,
    name: "Rose Gold Pre-Draped Saree",
    price: 14200,
    image: "/images/party-wear.png",
    badge: "TRENDING"
  },
  {
    id: 303,
    name: "Silver Ombre Chiffon",
    price: 9500,
    image: "/images/organza-saree.png",
    badge: ""
  },
  {
    id: 304,
    name: "Emerald Ruffle Border Saree",
    price: 11000,
    image: "/images/festive-wear.png",
    badge: "LIMITED"
  }
];

export const FESTIVE_WEAR = [
  {
    id: 401,
    name: "Mustard Yellow Silk Blend",
    price: 8500,
    image: "/images/mysore-silk.png",
    badge: "NEW"
  },
  {
    id: 402,
    name: "Ruby Red Tissue Saree",
    price: 13500,
    image: "/images/festive-wear.png",
    badge: "BESTSELLER"
  },
  {
    id: 403,
    name: "Teal Green Banarasi Art Silk",
    price: 7200,
    image: "/images/maroon-banarasi.png",
    badge: ""
  },
  {
    id: 404,
    name: "Golden Zari Woven Kanjivaram",
    price: 16500,
    image: "/images/kanjivaram-silk.png",
    badge: "PREMIUM"
  }
];

export const SECTIONS_CONFIG = [
  { id: 'New Arrival', title: 'New Arrivals', data: MOCK_PRODUCTS },
  { id: 'Exclusive Silk Collection', title: 'Exclusive Silk Collection', data: SILK_SAREES },
  { id: 'Wedding Collection', title: 'Wedding Collection', data: WEDDING_COLLECTION },
  { id: 'Party Wear', title: 'Party Wear', data: PARTY_WEAR },
  { id: 'Festive Wear', title: 'Festive Wear', data: FESTIVE_WEAR },
];

export const ALL_PRODUCTS = [
  ...MOCK_PRODUCTS,
  ...SILK_SAREES,
  ...WEDDING_COLLECTION,
  ...PARTY_WEAR,
  ...FESTIVE_WEAR
];

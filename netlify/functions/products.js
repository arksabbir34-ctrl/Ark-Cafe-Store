exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ message: "Method Not Allowed" }) };
  }

  const products = [
    {
      id: 1,
      name: "Ethiopian Yirgacheffe",
      description: "Bright and vibrant with floral notes and a hint of citrus.",
      price: "18.99",
      category: "Single Origin",
      imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Colombian Sidamo",
      description: "Smooth and balanced with chocolate and caramel undertones.",
      price: "17.50",
      category: "Single Origin",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a1252c9408f6?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "ARK Signature Espresso Blend",
      description: "Our house espresso blend, rich, dark, and perfect for milk-based drinks.",
      price: "22.00",
      category: "Blend",
      imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "French Roast Decaf",
      description: "All the flavor of our dark roast without the caffeine.",
      price: "19.99",
      category: "Decaf",
      imageUrl: "https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Signature Choc-Chunk Cookie",
      description: "Baked fresh daily with a perfectly crisp outer edge and soft, chewy center. Loaded with premium dark and milk chocolate morsels. Made with real butter, organic brown sugar, and high-quality cocoa. Small-batch baked every morning. Best enjoyed warm!",
      price: "3.50",
      category: "Pastries",
      imageUrl: "/images/choc-chunk-cookie.jpg",
    },
    {
      id: 6,
      name: "Dark Chocolate & Toasted Hazelnut Thumbprints",
      description: "A sophisticated twist on a classic. Crafted with premium Dutch-processed cocoa for a rich, brownie-like texture. Each cookie is rolled in crushed, roasted hazelnuts for a satisfying crunch and finished with a silky, hand-piped dark chocolate ganache center.",
      price: "4.25",
      category: "Pastries",
      imageUrl: "/images/hazelnut-thumbprint.jpg",
    },
    {
      id: 7,
      name: "Glazed Pumpkin Spice Pillows",
      description: "Soft, cake-like delights infused with real pumpkin purée and a proprietary blend of warm spices including cinnamon, nutmeg, and cloves. Each one is finished with a generous hand-poured vanilla bean glaze that drips perfectly down the sides.",
      price: "3.75",
      category: "Pastries",
      imageUrl: "/images/pumpkin-spice-pillow.jpg",
    },
    {
      id: 8,
      name: "Celebration Cookie Slice",
      description: "A massive, deep-dish chocolate chip cookie baked to soft, buttery perfection. Each slice is generously edged with our signature chocolate fudge buttercream and topped with a festive explosion of rainbow sprinkles.",
      price: "5.50",
      category: "Pastries",
      imageUrl: "/images/celebration-cookie-slice.jpg",
    },
    {
      id: 9,
      name: "Midnight Ark Drip Cake",
      description: "Three layers of moist, dark chocolate sponge filled with velvety cocoa buttercream, finished with a hand-poured silky chocolate ganache drip and crowned with signature fudge brownie chunks and elegant buttercream rosettes. Order 48 hours in advance.",
      price: "45.00",
      category: "Cakes",
      imageUrl: "/images/midnight-ark-drip-cake.jpg",
    },
  ];

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(products),
  };
};

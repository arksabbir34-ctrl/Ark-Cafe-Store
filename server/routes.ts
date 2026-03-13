import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    await storage.createProduct({
      name: "Ethiopian Yirgacheffe",
      description: "Bright and vibrant with floral notes and a hint of citrus.",
      price: "18.99",
      category: "Single Origin",
      imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600&auto=format&fit=crop",
    });
    await storage.createProduct({
      name: "Colombian Sidamo",
      description: "Smooth and balanced with chocolate and caramel undertones.",
      price: "17.50",
      category: "Single Origin",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a1252c9408f6?q=80&w=600&auto=format&fit=crop",
    });
    await storage.createProduct({
      name: "ARK Signature Espresso Blend",
      description: "Our house espresso blend, rich, dark, and perfect for milk-based drinks.",
      price: "22.00",
      category: "Blend",
      imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop",
    });
    await storage.createProduct({
      name: "French Roast Decaf",
      description: "All the flavor of our dark roast without the caffeine.",
      price: "19.99",
      category: "Decaf",
      imageUrl: "https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=600&auto=format&fit=crop",
    });
    await storage.createProduct({
      name: "Signature Choc-Chunk Cookie",
      description: "Baked fresh daily with a perfectly crisp outer edge and soft, chewy center. Loaded with premium dark and milk chocolate morsels. Made with real butter, organic brown sugar, and high-quality cocoa. Small-batch baked every morning. Best enjoyed warm!",
      price: "3.50",
      category: "Pastries",
      imageUrl: "/images/choc-chunk-cookie.jpg",
    });
    await storage.createProduct({
      name: "Dark Chocolate & Toasted Hazelnut Thumbprints",
      description: "A sophisticated twist on a classic. Crafted with premium Dutch-processed cocoa for a rich, brownie-like texture. Each cookie is rolled in crushed, roasted hazelnuts for a satisfying crunch and finished with a silky, hand-piped dark chocolate ganache center. The ultimate coffee companion — designed specifically to pair with espresso and bold roasts.",
      price: "4.25",
      category: "Pastries",
      imageUrl: "/images/hazelnut-thumbprint.jpg",
    });
    await storage.createProduct({
      name: "Glazed Pumpkin Spice Pillows",
      description: "Soft, cake-like delights infused with real pumpkin purée and a proprietary blend of warm spices including cinnamon, nutmeg, and cloves. Each one is finished with a generous hand-poured vanilla bean glaze that drips perfectly down the sides. Best enjoyed alongside a warm Chai Latte or Pumpkin Spice Coffee.",
      price: "3.75",
      category: "Pastries",
      imageUrl: "/images/pumpkin-spice-pillow.jpg",
    });
    await storage.createProduct({
      name: "Celebration Cookie Slice",
      description: "A massive, deep-dish chocolate chip cookie baked to soft, buttery perfection. Each slice is generously edged with our signature chocolate fudge buttercream and topped with a festive explosion of rainbow sprinkles. The ultimate treat for birthdays, milestones, or just because! Also available as a full 9\" cake with custom messages (requires 24h notice).",
      price: "5.50",
      category: "Pastries",
      imageUrl: "/images/celebration-cookie-slice.jpg",
    });
    await storage.createProduct({
      name: "Midnight Ark Drip Cake",
      description: "The crown jewel of our bakery. Three layers of moist, dark chocolate sponge filled with velvety cocoa buttercream, finished with a hand-poured silky chocolate ganache drip and crowned with signature fudge brownie chunks and elegant buttercream rosettes. Rich, decadent, and undeniably impressive. Perfect for birthdays, anniversaries, or serious chocolate lovers. Please order at least 48 hours in advance.",
      price: "45.00",
      category: "Cakes",
      imageUrl: "/images/midnight-ark-drip-cake.jpg",
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed the database
  seedDatabase().catch(console.error);

  app.get(api.products.list.path, async (req, res) => {
    try {
      const allProducts = await storage.getProducts();
      res.json(allProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createContactMessage(input);
      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Failed to submit contact message" });
    }
  });

  return httpServer;
}

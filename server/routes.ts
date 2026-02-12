import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/categories", async (_req, res) => {
    const cats = await storage.getCategories();
    res.json(cats);
  });

  app.get("/api/products", async (_req, res) => {
    const prods = await storage.getProducts();
    res.json(prods);
  });

  app.get("/api/products/featured", async (_req, res) => {
    const prods = await storage.getFeaturedProducts();
    res.json(prods);
  });

  app.get("/api/products/:slug", async (req, res) => {
    const product = await storage.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.get("/api/cart", async (req, res) => {
    const sessionId = getSessionId(req);
    const items = await storage.getCartItems(sessionId);
    res.json(items);
  });

  app.post("/api/cart", async (req, res) => {
    const sessionId = getSessionId(req);
    const schema = z.object({
      productId: z.number(),
      quantity: z.number().min(1),
      size: z.string().nullable().optional(),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const item = await storage.addToCart({
      sessionId,
      productId: parsed.data.productId,
      quantity: parsed.data.quantity,
      size: parsed.data.size ?? null,
    });
    res.json(item);
  });

  app.patch("/api/cart/:id", async (req, res) => {
    const sessionId = getSessionId(req);
    const id = parseInt(req.params.id);
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const item = await storage.updateCartItem(id, sessionId, quantity);
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json(item);
  });

  app.delete("/api/cart/:id", async (req, res) => {
    const sessionId = getSessionId(req);
    const id = parseInt(req.params.id);
    await storage.removeCartItem(id, sessionId);
    res.json({ success: true });
  });

  return httpServer;
}

function getSessionId(req: any): string {
  if (!req.session.cartId) {
    req.session.cartId = randomUUID();
  }
  return req.session.cartId;
}

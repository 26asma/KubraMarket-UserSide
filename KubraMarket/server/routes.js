
import { createServer } from "http";
import { storage } from "./storage.js";
import { setupAuth } from "./auth.js";

export async function registerRoutes(app) {
  // Set up authentication routes
  setupAuth(app);

  // API Routes
  const apiPrefix = '/api';

  // Shops routes
  app.get(`${apiPrefix}/shops`, async (req, res) => {
    try {
      const shops = await storage.getShops();
      res.json(shops);
    } catch (error) {
      console.error("Error fetching shops:", error);
      res.status(500).json({ message: "Failed to fetch shops" });
    }
  });

  app.get(`${apiPrefix}/shops/:id`, async (req, res) => {
    try {
      const id = Number(req.params.id);
      
      // If id is not a number, try to find by slug
      let shop;
      if (isNaN(id)) {
        shop = await storage.getShopBySlug(req.params.id);
      } else {
        shop = await storage.getShopById(id);
      }
      
      if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
      }
      
      res.json(shop);
    } catch (error) {
      console.error("Error fetching shop details:", error);
      res.status(500).json({ message: "Failed to fetch shop details" });
    }
  });

  app.get(`${apiPrefix}/shops/:id/products`, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { limit, offset, category, sort } = req.query;
      
      let shopId;
      if (isNaN(id)) {
        const shop = await storage.getShopBySlug(req.params.id);
        if (!shop) {
          return res.status(404).json({ message: "Shop not found" });
        }
        shopId = shop.id;
      } else {
        shopId = id;
      }
      
      const products = await storage.getProducts({
        shop: shopId,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        category,
        sort
      });
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching shop products:", error);
      res.status(500).json({ message: "Failed to fetch shop products" });
    }
  });

  // Products routes
  app.get(`${apiPrefix}/products`, async (req, res) => {
    try {
      const { limit, offset, category, shop, search, sort } = req.query;
      
      const products = await storage.getProducts({
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        category,
        shop: shop ? Number(shop) : undefined,
        search,
        sort
      });
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get(`${apiPrefix}/products/featured`, async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get(`${apiPrefix}/products/:id`, async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).json({ message: "Failed to fetch product details" });
    }
  });

  app.get(`${apiPrefix}/products/:id/related`, async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const relatedProducts = await storage.getRelatedProducts(id);
      res.json(relatedProducts);
    } catch (error) {
      console.error("Error fetching related products:", error);
      res.status(500).json({ message: "Failed to fetch related products" });
    }
  });

  // Orders routes
  app.post(`${apiPrefix}/orders`, async (req, res) => {
    try {
      if (!req.body.items || req.body.items.length === 0) {
        return res.status(400).json({ message: "Order must contain at least one item" });
      }
      
      const orderData = {
        ...req.body,
        userId: req.user?.id || null
      };
      console.log("Creating order:", orderData);
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get(`${apiPrefix}/orders`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const orders = await storage.getOrdersByUserId(req.user.id);
      res.json(orders);
      console.log("Fetched orders:", orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });
  
  app.get(`${apiPrefix}/user/orders`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const orders = await storage.getOrdersByUserId(req.user.id);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ message: "Failed to fetch user orders" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

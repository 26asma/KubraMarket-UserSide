import { db, pool } from "../db/index.js";
import { users, shops, products, orders } from "../shared/schema.js";
import { eq, like, and, or, desc, asc, ne } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";

const PostgresSessionStore = connectPg(session);

class DatabaseStorage {
  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User methods
  async getUserByUsername(username) {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUser(id) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async createUser(userData) {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  // Shop methods
  async getShops() {
    return await db.select().from(shops);
  }

  async getShopById(id) {
    const result = await db.select().from(shops).where(eq(shops.id, id));
    return result[0];
  }

  async getShopBySlug(slug) {
    const name = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const result = await db.select().from(shops).where(eq(shops.name, name));
    return result[0];
  }

  // Product methods
  async getProducts(options = {}) {
    const { 
      limit = 100, 
      offset = 0, 
      category = undefined, 
      shop = undefined, 
      search = undefined,
      sort = 'newest'
    } = options;

    let query = db.select({
      ...products,
      shop: shops
    })
    .from(products)
    .leftJoin(shops, eq(products.shopId, shops.id));

    const whereConditions = [];

    if (category && category !== 'all') {
      whereConditions.push(eq(products.category, category));
    }

    if (shop) {
      whereConditions.push(eq(products.shopId, shop));
    }

    if (search) {
      whereConditions.push(
        or(
          like(products.name, `%${search}%`),
          like(products.description, `%${search}%`)
        )
      );
    }

    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }

    if (sort === 'newest') {
      query = query.orderBy(desc(products.createdAt));
    } else if (sort === 'priceAsc') {
      query = query.orderBy(asc(products.price));
    } else if (sort === 'priceDesc') {
      query = query.orderBy(desc(products.price));
    } else if (sort === 'popular') {
      query = query.orderBy(desc(products.rating));
    }

    query = query.limit(limit).offset(offset);

    return await query;
  }

  async getFeaturedProducts() {
    return await db.select({
      ...products,
      shop: shops
    })
    .from(products)
    .leftJoin(shops, eq(products.shopId, shops.id))
    .limit(8);
  }

  async getProductById(id) {
    const result = await db.select({
      ...products,
      shop: shops
    })
    .from(products)
    .leftJoin(shops, eq(products.shopId, shops.id))
    .where(eq(products.id, id));

    return result[0];
  }

  async getRelatedProducts(id, limit = 4) {
    const product = await this.getProductById(id);

    if (!product) return [];

    return await db.select({
      ...products,
      shop: shops
    })
    .from(products)
    .leftJoin(shops, eq(products.shopId, shops.id))
    .where(
      and(
        or(
          eq(products.category, product.category),
          eq(products.shopId, product.shopId)
        ),
        ne(products.id, id)
      )
    )
    .limit(limit);
  }

  // Order methods
  async createOrder(orderData) {
    const [order] = await db.insert(orders).values(orderData).returning();
    return order;
  }

  async getOrdersByUserId(userId) {
    return await db.select().from(orders).where(eq(orders.userId, userId));
  }
}

export const storage = new DatabaseStorage();
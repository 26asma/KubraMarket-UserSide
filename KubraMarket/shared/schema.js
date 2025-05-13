import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

// Empty objects for type compatibility
export const Shop = {};
export const Product = {};

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Shops
export const shops = pgTable("shops", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  rating: decimal("rating", { precision: 3, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull(),
  productCount: integer("product_count").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  image: text("image").notNull(),
  category: text("category").notNull(),
  rating: decimal("rating", { precision: 3, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull(),
  isNew: boolean("is_new").default(false),
  isBestseller: boolean("is_bestseller").default(false),
  discount: integer("discount").default(0),
  shopId: integer("shop_id").references(() => shops.id).notNull(),
  stock: integer("stock").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertProductSchema = createInsertSchema(products, {
  name: (schema) => schema.min(2, "Product name must be at least 2 characters"),
  description: (schema) => schema.min(10, "Description must be at least 10 characters"),
  price: (schema) => schema.refine((val) => parseFloat(String(val)) > 0, "Price must be greater than 0"),
  rating: (schema) => schema.refine((val) => parseFloat(String(val)) >= 0 && parseFloat(String(val)) <= 5, "Rating must be between 0 and 5")
});


// export const orders = pgTable("orders", {
//   id: serial("id").primaryKey(),
//   userId: integer("user_id").references(() => users.id).notNull(),
//   items: jsonb("items").notNull(),
//   total: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
//   status: text("status").notNull().default("pending"),
//   createdAt: timestamp("created_at").defaultNow().notNull()
// });

// export const orders = pgTable("orders", {
//   id: serial("id").primaryKey(),
//   userId: integer("user_id").references(() => users.id).notNull(),
//   firstName: text("first_name").notNull(),  // Add first_name field
//   lastName: text("last_name").notNull(),    // Add last_name field
//   email: text("email").notNull(),           // Add email field
//   phone: text("phone").notNull(),           // Add phone field if necessary
//   address: text("address").notNull(),       // Add address field if necessary
//   city: text("city").notNull(),             // Add city field if necessary
//   state: text("state").notNull(),           // Add state field if necessary
//   zipCode: text("zip_code").notNull(),      // Add zip_code field if necessary
//   country: text("country").notNull(),       // Add country field if necessary
//   items: jsonb("items").notNull(),
//   total: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
//   status: text("status").notNull().default("pending"),
//   createdAt: timestamp("created_at").defaultNow().notNull()
// });



export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").references(() => users.id).notNull(),

  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),

  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
zip_code: text("zip_code").notNull(),
  country: text("country").notNull(),

 payment_method: text("payment_method").notNull(), // new field
  notes: text("notes"), // optional

  items: jsonb("items").notNull(), // cart items

  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  shippingCost: decimal("shipping_cost", { precision: 10, scale: 2 }).notNull(),
  total_Price: decimal("total_price", { precision: 10, scale: 2 }).notNull(),

  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productsRelations = relations(products, ({ one }) => ({
  shop: one(shops, { fields: [products.shopId], references: [shops.id] })
}));

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders)
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] })
}));
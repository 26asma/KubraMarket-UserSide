import { db } from "./index";
import * as schema from "@shared/schema";
import { eq } from "drizzle-orm";

const SHOPS = [
  {
    name: "THAIBAH ENTERPRISES",
    description: "Crockery, Hajj-Umrah Kits, Dubai Abayas",
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    rating: 4.8,
    reviewCount: 124,
    productCount: 52
  },
  {
    name: "MINHA ZAINAB ENTERPRISES",
    description: "Home Utilities",
    image: "https://images.unsplash.com/photo-1584473457409-75a4e9bb2c1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    rating: 4.6,
    reviewCount: 98,
    productCount: 38
  },
  {
    name: "HAYA BOUTIQUE",
    description: "Bhurqa, Hijab, Slippers",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    rating: 4.9,
    reviewCount: 156,
    productCount: 64
  },
  {
    name: "AYISHA SILK HOUSE",
    description: "Clothing, Fashion Outlet, Boutique, Apparel",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    rating: 4.7,
    reviewCount: 203,
    productCount: 89
  },
  {
    name: "TODLERRY",
    description: "Kids Fashion, Clothing, Accessories, Baby Care",
    image: "https://images.unsplash.com/photo-1626784215021-2f4e776a01c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    rating: 4.8,
    reviewCount: 187,
    productCount: 76
  },
  {
    name: "CRESCENT FASHION",
    description: "Home Decor, Cosmetics, Imported Laces, Clothing",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    rating: 4.6,
    reviewCount: 152,
    productCount: 68
  },
  {
    name: "AL-AIMAN CREATION",
    description: "Packing Materials, Traditional Food",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9c8a47a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    rating: 4.5,
    reviewCount: 89,
    productCount: 42
  },
  {
    name: "GIRL'S & BOY'S",
    description: "Girls' and Boys' Apparel Boutique",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    rating: 4.7,
    reviewCount: 176,
    productCount: 94
  },
  {
    name: "GENERAL SHOP",
    description: "Combined product collections",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    rating: 4.5,
    reviewCount: 210,
    productCount: 120
  }
];

const CATEGORIES = [
  { name: "Clothing", slug: "clothing" },
  { name: "Home Decor", slug: "homeDecor" },
  { name: "Kids Fashion", slug: "kidsFashion" },
  { name: "Crockery", slug: "crockery" },
  { name: "Hijab & Abayas", slug: "hijabAbayas" },
  { name: "Accessories", slug: "accessories" }
];

// Products data based on images from the design reference
const PRODUCTS = [
  {
    name: "Traditional Black Abaya",
    description: "Elegant traditional abaya made from premium quality fabric. Perfect for daily wear or special occasions. Light, comfortable, and stylish.",
    price: 89.99,
    originalPrice: 110.00,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "hijabAbayas",
    shopId: 1, // Will be replaced with actual IDs
    rating: 4.8,
    reviewCount: 24,
    isNew: true,
    isBestseller: false,
    discount: 18,
    stock: 45
  },
  {
    name: "Decorative Ceramic Vase Set",
    description: "Beautiful decorative vase set for your home. Made from high-quality ceramic with elegant design that adds a touch of sophistication to any room.",
    price: 45.99,
    originalPrice: 57.50,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "homeDecor",
    shopId: 6, // Will be replaced with actual IDs
    rating: 4.6,
    reviewCount: 18,
    isNew: false,
    isBestseller: false,
    discount: 20,
    stock: 30
  },
  {
    name: "Premium Cotton Hijab Scarf",
    description: "Premium quality cotton hijab scarf that provides comfort and style. Available in various colors to match any outfit.",
    price: 24.50,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "hijabAbayas",
    shopId: 3, // Will be replaced with actual IDs
    rating: 4.9,
    reviewCount: 32,
    isNew: false,
    isBestseller: false,
    discount: 0,
    stock: 60
  },
  {
    name: "Kids Cotton Summer Dress",
    description: "Comfortable kids cotton summer dress, perfect for warm weather. Made from soft, breathable fabric that's gentle on your child's skin.",
    price: 32.99,
    originalPrice: 38.50,
    image: "https://images.unsplash.com/photo-1627483297886-49710ae1fc22?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "kidsFashion",
    shopId: 5, // Will be replaced with actual IDs
    rating: 4.7,
    reviewCount: 45,
    isNew: false,
    isBestseller: true,
    discount: 14,
    stock: 38
  },
  {
    name: "Designer Silk Dress",
    description: "Luxurious silk dress for special occasions. Features elegant design and premium fabric that drapes beautifully.",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "clothing",
    shopId: 4, // Will be replaced with actual IDs
    rating: 4.8,
    reviewCount: 56,
    isNew: true,
    isBestseller: false,
    discount: 19,
    stock: 25
  },
  {
    name: "Modern Wall Art Set",
    description: "Contemporary wall art set to enhance any living space. These pieces add character and style to your home décor.",
    price: 79.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1605883705077-8d3d848f187b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "homeDecor",
    shopId: 6, // Will be replaced with actual IDs
    rating: 4.5,
    reviewCount: 28,
    isNew: true,
    isBestseller: false,
    discount: 0,
    stock: 20
  },
  {
    name: "Handcrafted Ceramic Plate Set",
    description: "Beautiful handcrafted ceramic plates for your dining table. Each piece is unique with intricate designs and patterns.",
    price: 65.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1578258789061-794d4c8c5756?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "crockery",
    shopId: 1, // Will be replaced with actual IDs
    rating: 4.7,
    reviewCount: 38,
    isNew: false,
    isBestseller: true,
    discount: 27,
    stock: 15
  },
  {
    name: "Stylish Leather Handbag",
    description: "Premium leather handbag with elegant design. Spacious compartments and durable construction make it perfect for daily use.",
    price: 85.00,
    originalPrice: 110.00,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "accessories",
    shopId: 8, // Will be replaced with actual IDs
    rating: 4.6,
    reviewCount: 42,
    isNew: false,
    isBestseller: false,
    discount: 23,
    stock: 28
  }
];

async function seed() {
  try {
    console.log("🌱 Starting database seeding...");

    // Check if shops already exist to avoid duplicates
    const existingShops = await db.select().from(schema.shops);
    if (existingShops.length === 0) {
      console.log("Seeding shops...");
      const insertedShops = await db.insert(schema.shops).values(SHOPS).returning();
      console.log(`✅ ${insertedShops.length} shops inserted successfully`);
      
      // Create a map of shop names to IDs for products reference
      const shopMap = new Map(insertedShops.map(shop => [shop.name, shop.id]));
      
      // Seed categories
      console.log("Seeding categories...");
      await db.insert(schema.categories).values(CATEGORIES).returning();
      console.log(`✅ ${CATEGORIES.length} categories inserted successfully`);
      
      // Update product shopIds with real IDs from the database
      const productsWithShopIds = PRODUCTS.map(product => {
        // Find the shop by name (index + 1 is used as placeholder in our initial data)
        const shopName = SHOPS[product.shopId - 1].name;
        const realShopId = shopMap.get(shopName);
        
        return {
          ...product,
          shopId: realShopId
        };
      });
      
      console.log("Seeding products...");
      const insertedProducts = await db.insert(schema.products).values(productsWithShopIds).returning();
      console.log(`✅ ${insertedProducts.length} products inserted successfully`);
    } else {
      console.log("✅ Database already seeded. Skipping...");
    }
    
    console.log("🎉 Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();

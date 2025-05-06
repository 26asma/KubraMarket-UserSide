import { db } from "./index.js";
import * as schema from "../shared/schema.js";
import { eq } from "drizzle-orm";
import { products, shops } from "../shared/schema.js";
const SHOPS = [
  {
    name: "THAIBAH ENTERPRISES",
    description: "Crockery, Hajj-Umrah Kits, Dubai Abayas",
    image: "https://images.unsplash.com/photo-1571498521264-5fcaa7f8edf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    rating: 4.8,
    reviewCount: 124,
    productCount: 52
  },
  {
    name: "MINHA ZAINAB ENTERPRISES",
    description: "Home Utilities",
    image: "https://images.unsplash.com/photo-1617784625140-515e220ba148?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    rating: 4.6,
    reviewCount: 98,
    productCount: 38
  },
  {
    name: "HAYA BOUTIQUE",
    description: "Bhurqa, Hijab, Slippers",
    image: "https://images.unsplash.com/photo-1585728748176-455ac5eed962?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
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
    image: "https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
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
    image: "https://images.unsplash.com/photo-1557471311-da136cd4fb86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
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

const PRODUCTS = [
  {
    name: "Traditional Black Abaya",
    description: "Elegant traditional abaya made from premium quality fabric. Perfect for daily wear or special occasions. Light, comfortable, and stylish.",
    price: 89.99,
    originalPrice: 110.00,
    image: "https://images.unsplash.com/photo-1728487235101-664d87965931?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
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
    image: "https://images.unsplash.com/photo-1560278150-074db6a8da4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
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
    image: "https://plus.unsplash.com/premium_photo-1705262413765-5fe7a310d4e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
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
    image: "https://plus.unsplash.com/premium_photo-1681412205520-49c7f9b8b67f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
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
  },
  {
    name: "Mini Home Clock with Vintage Look",
    description: "Stylish home clock with vintage finish for your living room or bedroom.",
    price: 22.50,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "homeDecor",
    shopId: 6,
    rating: 4.4,
    reviewCount: 12,
    isNew: true,
    isBestseller: false,
    discount: 0,
    stock: 18
  },
  {
    name: "Leather Wrist Watch for Women",
    description: "Stylish and sleek leather-strap wristwatch with minimalist design.",
    price: 64.50,
    originalPrice: 80.00,
    image: "https://images.unsplash.com/photo-1706677861871-56b7383454ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "accessories",
    shopId: 2,
    rating: 4.6,
    reviewCount: 31,
    isNew: false,
    isBestseller: false,
    discount: 19,
    stock: 29
  },
{
    name: "Decorative Cushion Set",
    description: "Set of 3 stylish cushions with embroidered designs for sofas and beds.",
    price: 48.99,
    originalPrice: null,
    image: "https://plus.unsplash.com/premium_photo-1670359039073-90ded4b26501?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "homeDecor",
    shopId: 6,
    rating: 4.5,
    reviewCount: 34,
    isNew: false,
    isBestseller: false,
    discount: 0,
    stock: 28
  }
];

async function seed() {
  try {
    console.log("🌱 Starting full database reset and seeding...");

    // Step 1: Delete in correct order to avoid FK issues
    await db.delete(products).execute(); // products depends on shops
    await db.delete(shops).execute();
    console.log("🧹 Existing data deleted");

    // Step 2: Insert new shops
    const insertedShops = await db.insert(schema.shops).values(SHOPS).returning();
    console.log(`🏪 ${insertedShops.length} shops inserted`);

    // Step 3: Build shop name-to-ID map
    const shopMap = new Map(insertedShops.map(shop => [shop.name, shop.id]));

 

    // Step 5: Prepare products with correct shop IDs
    const productsWithShopIds = PRODUCTS.map(product => {
      const shopName = SHOPS[product.shopId - 1].name;
      const realShopId = shopMap.get(shopName);

      return {
        ...product,
        shopId: realShopId
      };
    });

    // Step 6: Insert products
    const insertedProducts = await db.insert(schema.products).values(productsWithShopIds).returning();
    console.log(`🛍️ ${insertedProducts.length} products inserted`);

    console.log("🎉 Database seeding completed!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
  }
}

seed();


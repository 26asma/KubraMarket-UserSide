import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import HeroSection from "@/components/shop/HeroSection";
import ShopCard from "@/components/shop/ShopCard";
import ProductCard from "@/components/shop/ProductCard";
import Newsletter from "@/components/shop/Newsletter";
import Features from "@/components/shop/Features";
import { Shop, Product } from "@shared/schema";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const { data: shops, isLoading: shopsLoading } = useQuery({
    queryKey: ["/api/shops"],
  });
  
  const { data: featuredProducts, isLoading: productsLoading } = useQuery({
    queryKey: ["/api/products/featured"],
  });
  
  const filteredProducts = featuredProducts?.filter(product => {
    if (activeCategory === "all") return true;
    return product.category === activeCategory;
  });
  
  useEffect(() => {
    // Scroll to specific section if hash in URL
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);
  
  return (
    <>
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Shop Selector */}
        <section id="shops" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-poppins font-bold text-3xl mb-3">Our Premium Shops</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Explore our collection of 9 distinct shops, each offering unique products and experiences.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopsLoading ? (
                Array(6).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-72 animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                shops?.slice(0, 6).map(shop => (
                  <ShopCard key={shop.id} shop={shop} />
                ))
              )}
            </div>
            
            <div className="text-center mt-10">
              <a href="/shops" className="inline-flex items-center text-primary font-medium hover:underline">
                View All Shops <i className="bi bi-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section id="trending" className="py-12 bg-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="font-poppins font-bold text-3xl mb-3">Trending Products</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Discover our most popular items from across all shops.</p>
            </div>
            
            <div className="flex mb-8 overflow-x-auto py-2 scrollbar-hide">
              <button 
                className={`whitespace-nowrap px-4 py-2 mr-3 ${
                  activeCategory === "all" 
                    ? "bg-primary text-white" 
                    : "bg-white text-secondary hover:bg-gray-100"
                } rounded-full text-sm font-medium transition`}
                onClick={() => setActiveCategory("all")}
              >
                All Products
              </button>
              <button 
                className={`whitespace-nowrap px-4 py-2 mr-3 ${
                  activeCategory === "clothing" 
                    ? "bg-primary text-white" 
                    : "bg-white text-secondary hover:bg-gray-100"
                } rounded-full text-sm font-medium transition`}
                onClick={() => setActiveCategory("clothing")}
              >
                Clothing
              </button>
              <button 
                className={`whitespace-nowrap px-4 py-2 mr-3 ${
                  activeCategory === "homeDecor" 
                    ? "bg-primary text-white" 
                    : "bg-white text-secondary hover:bg-gray-100"
                } rounded-full text-sm font-medium transition`}
                onClick={() => setActiveCategory("homeDecor")}
              >
                Home Decor
              </button>
              <button 
                className={`whitespace-nowrap px-4 py-2 mr-3 ${
                  activeCategory === "kidsFashion" 
                    ? "bg-primary text-white" 
                    : "bg-white text-secondary hover:bg-gray-100"
                } rounded-full text-sm font-medium transition`}
                onClick={() => setActiveCategory("kidsFashion")}
              >
                Kids Fashion
              </button>
              <button 
                className={`whitespace-nowrap px-4 py-2 mr-3 ${
                  activeCategory === "crockery" 
                    ? "bg-primary text-white" 
                    : "bg-white text-secondary hover:bg-gray-100"
                } rounded-full text-sm font-medium transition`}
                onClick={() => setActiveCategory("crockery")}
              >
                Crockery
              </button>
              <button 
                className={`whitespace-nowrap px-4 py-2 mr-3 ${
                  activeCategory === "hijabAbayas" 
                    ? "bg-primary text-white" 
                    : "bg-white text-secondary hover:bg-gray-100"
                } rounded-full text-sm font-medium transition`}
                onClick={() => setActiveCategory("hijabAbayas")}
              >
                Hijab & Abayas
              </button>
              <button 
                className={`whitespace-nowrap px-4 py-2 mr-3 ${
                  activeCategory === "accessories" 
                    ? "bg-primary text-white" 
                    : "bg-white text-secondary hover:bg-gray-100"
                } rounded-full text-sm font-medium transition`}
                onClick={() => setActiveCategory("accessories")}
              >
                Accessories
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productsLoading ? (
                Array(4).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-96 animate-pulse">
                    <div className="h-64 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                filteredProducts?.slice(0, 8).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
            
            <div className="text-center mt-10">
              <a href="/products" className="inline-block bg-primary text-white py-3 px-6 rounded-full font-medium hover:bg-opacity-90 transition">
                View All Products
              </a>
            </div>
          </div>
        </section>
        
        <Features />
        <Newsletter />
      </main>
      
      <Footer />
    </>
  );
}

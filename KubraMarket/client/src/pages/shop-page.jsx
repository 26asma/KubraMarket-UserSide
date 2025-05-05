import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "wouter";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import ProductCard from "@/components/shop/ProductCard";
import Newsletter from "@/components/shop/Newsletter";
import { Shop, Product } from "@shared/schema";

export default function ShopPage() {
  const { id } = useParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  
  const { data: shop, isLoading: shopLoading } = useQuery<Shop>({
    queryKey: [`/api/shops/${id}`],
  });
  
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: [`/api/shops/${id}/products`],
  });
  
  const filteredProducts = products?.filter(product => {
    if (activeCategory === "all") return true;
    return product.category === activeCategory;
  }).sort((a, b) => {
    if (sortBy === "latest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    if (sortBy === "popular") return b.rating - a.rating;
    return 0;
  });
  
  // Get unique categories from products
  const categories = products ? [...new Set(products.map(p => p.category))] : [];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  return (
    <>
      <Header />
      
      <main>
        {/* Shop Header */}
        <section className="py-12 bg-light">
          <div className="container mx-auto px-4">
            {shopLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
              </div>
            ) : (
              <>
                <h1 className="font-poppins font-bold text-3xl mb-2">{shop?.name}</h1>
                <p className="text-gray-600 mb-6">{shop?.description}</p>
              </>
            )}
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-wrap items-center">
                <span className="mr-2 font-medium">Categories:</span>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeCategory === "all" 
                        ? "bg-primary text-white" 
                        : "bg-white text-secondary hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveCategory("all")}
                  >
                    All
                  </button>
                  {categories.map(category => (
                    <button 
                      key={category} 
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeCategory === category 
                          ? "bg-primary text-white" 
                          : "bg-white text-secondary hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="ml-auto flex items-center">
                <span className="mr-2 font-medium">Sort by:</span>
                <select 
                  className="border rounded p-1"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="popular">Popularity</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        
        {/* Products */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array(8).fill(0).map((_, index) => (
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
                ))}
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4"><i className="bi bi-search"></i></div>
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600">Try changing your filters or check back later for new items.</p>
              </div>
            )}
          </div>
        </section>
        
        <Newsletter />
      </main>
      
      <Footer />
    </>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/shop/Header";
import ProductCard from "@/components/shop/ProductCard";
import { Input } from "@/components/ui/input";

export default function AllProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["/api/products"],
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">All Products</h1>
            <form onSubmit={handleSearch} className="w-full max-w-sm">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
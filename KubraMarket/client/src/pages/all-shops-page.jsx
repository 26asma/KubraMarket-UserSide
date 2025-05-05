import { useQuery } from "@tanstack/react-query";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import ShopCard from "@/components/shop/ShopCard";
import { Shop } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function AllShopsPage() {
  const { data: shops, isLoading, error } = useQuery({
    queryKey: ['/api/shops'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  return (
    <>
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-poppins font-bold text-3xl mb-2">All Shops</h1>
          <p className="text-gray-500 mb-8">Discover our collection of boutique vendors</p>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded text-red-600">
              Error loading shops. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {shops?.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
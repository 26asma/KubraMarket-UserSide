import { Link } from "wouter";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react"; // Added back in from original

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      shop: item.shop,
      quantity: 1
    });
  };

  return (
    <>
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-poppins font-bold text-3xl mb-6">My Wishlist</h1>

          {wishlistItems.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <Heart className="w-24 h-24 text-gray-300 stroke-1" />
              </div>
              <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">Add items to your wishlist to save them for later.</p>
              <Link to="/">
                <Button className="bg-primary text-white">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-500">{wishlistItems.length} item(s)</p>
                <Button 
                  variant="outline" 
                  onClick={clearWishlist}
                  className="text-sm flex items-center"
                >
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>

                    <div className="flex justify-between gap-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        Remove
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
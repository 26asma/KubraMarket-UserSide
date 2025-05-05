import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { Product } from "@shared/schema";
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: typeof product.price === 'number' ? product.price : parseFloat(String(product.price)),
      image: product.image,
      shop: product.shop ? product.shop.name : "Unknown Shop",
      quantity: 1
    });
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick view functionality would go here
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: typeof product.price === 'number' ? product.price : parseFloat(String(product.price)),
        image: product.image,
        shop: product.shop ? product.shop.name : "Unknown Shop",
      });
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button 
              className={`p-2 rounded-full shadow-md transition ${inWishlist ? 'bg-primary text-white' : 'bg-white hover:bg-primary hover:text-white'}`}
              onClick={handleAddToWishlist}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
            </button>
            <button 
              className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition"
              onClick={handleQuickView}
            >
              <i className="bi bi-eye"></i>
            </button>
          </div>
          {product.isNew && (
            <div className="absolute top-3 left-3">
              <span className="bg-primary text-white text-xs py-1 px-2 rounded">New</span>
            </div>
          )}
          {product.discount && product.discount > 0 && (
            <div className="absolute top-3 left-3">
              <span className="bg-warning text-secondary text-xs py-1 px-2 rounded">{product.discount}% Off</span>
            </div>
          )}
          {product.isBestseller && (
            <div className="absolute top-3 left-3">
              <span className="bg-success text-white text-xs py-1 px-2 rounded">Bestseller</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center mb-1">
            <span className="text-xs text-gray-500">{product.shop ? product.shop.name : `Shop #${product.shopId}`}</span>
          </div>
          <h3 className="font-medium mb-1">{product.name}</h3>
          <div className="flex items-center mb-3">
            <span className="text-amber-400 mr-1 text-sm"><i className="bi bi-star-fill"></i></span>
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-gray-400 text-xs ml-1">({product.reviewCount})</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="font-montserrat font-semibold text-primary">${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(String(product.price)).toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 text-sm line-through ml-2">${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : parseFloat(String(product.originalPrice)).toFixed(2)}</span>
              )}
            </div>
            <button 
              className="bg-light hover:bg-primary hover:text-white text-primary p-2 rounded-full transition"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
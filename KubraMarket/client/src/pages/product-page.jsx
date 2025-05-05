import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { useState, useEffect } from "react";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import Newsletter from "@/components/shop/Newsletter";
import ProductCard from "@/components/shop/ProductCard";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });
  
  const { data: relatedProducts, isLoading: relatedLoading } = useQuery({
    queryKey: [`/api/products/${id}/related`],
  });
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      shop: product.shop ? product.shop.name : `Shop #${product.shopId}`,
      quantity: quantity
    });
  };
  
  const handleToggleWishlist = () => {
    if (!product) return;
    
    const inWishlist = isInWishlist(product.id);
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: typeof product.price === 'number' ? product.price : parseFloat(String(product.price)),
        image: product.image,
        shop: product.shop ? product.shop.name : `Shop #${product.shopId}`,
      });
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center flex-col">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="round" onClick={() => window.history.back()}>Go Back</Button>
        </div>
        <Footer />
      </>
    );
  }
  
  // Mock data for image gallery since we don't have multiple images per product in our schema
  const productImages = [product.image, product.image, product.image, product.image];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["black", "gray-800", "gray-500", "blue-900"];
  const colorNames = {
    "black": "Black",
    "gray-800": "Dark Gray",
    "gray-500": "Gray",
    "blue-900": "Navy"
  };
  
  return (
    <>
      <Header />
      
      <main>
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Images */}
              <div className="w-full lg:w-1/2">
                <div className="relative mb-4">
                  <img 
                    src={productImages[activeImage]} 
                    alt={product.name} 
                    className="w-full rounded-lg"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white text-xs py-1 px-2 rounded">New</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {productImages.map((img, idx) => (
                    <button 
                      key={idx}
                      className={`border-2 ${activeImage === idx ? 'border-primary' : 'border-gray-200'} rounded-lg overflow-hidden`}
                      onClick={() => setActiveImage(idx)}
                    >
                      <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full" />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="w-full lg:w-1/2">
                <div className="mb-2">
                  <span className="text-sm text-gray-500">{product.shop ? product.shop.name : `Shop #${product.shopId}`}</span>
                </div>
                <h1 className="font-poppins font-bold text-3xl mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400 mr-2">
                    {[...Array(5)].map((_, i) => {
                      const rating = parseFloat(String(product.rating));
                      return (
                        <i key={i} className={`bi ${i < Math.floor(rating) ? 'bi-star-fill' : i < rating ? 'bi-star-half' : 'bi-star'}`}></i>
                      );
                    })}
                  </div>
                  <span className="text-sm font-medium">{typeof product.rating === 'number' ? product.rating : parseFloat(String(product.rating))}</span>
                  <span className="text-gray-400 text-sm ml-1">({product.reviewCount} reviews)</span>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="font-montserrat font-bold text-primary text-2xl">${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(String(product.price)).toFixed(2)}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-gray-400 text-lg line-through ml-3">${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : parseFloat(String(product.originalPrice)).toFixed(2)}</span>
                        <span className="bg-warning text-xs text-secondary py-1 px-2 rounded ml-3">
                          {Math.round(((parseFloat(String(product.originalPrice)) - parseFloat(String(product.price))) / parseFloat(String(product.originalPrice))) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-green-600 text-sm mb-2"><i className="bi bi-check-circle-fill mr-1"></i> In Stock</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <i className="bi bi-truck text-gray-500 mr-2"></i>
                      <span className="text-sm">Free Shipping</span>
                    </div>
                    <div className="flex items-center">
                      <i className="bi bi-arrow-return-left text-gray-500 mr-2"></i>
                      <span className="text-sm">30-Day Returns</span>
                    </div>
                  </div>
                </div>
                
                {/* Size Selector */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Select Size</h3>
                  <div className="flex space-x-3">
                    {sizes.map(size => (
                      <button 
                        key={size}
                        className={`w-10 h-10 border ${selectedSize === size ? 'border-primary bg-light text-primary' : 'border-gray-300 hover:border-primary hover:text-primary'} rounded-full flex items-center justify-center font-medium transition`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Color Selector */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Select Color</h3>
                  <div className="flex space-x-3">
                    {colors.map(color => (
                      <button 
                        key={color}
                        className={`w-8 h-8 bg-${color} rounded-full ${selectedColor === color ? 'border-2 border-primary flex items-center justify-center' : ''}`}
                        onClick={() => setSelectedColor(color)}
                        title={colorNames[color]}
                      >
                        {selectedColor === color && <i className="bi bi-check text-white"></i>}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity Selector */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Quantity</h3>
                  <div className="flex items-center">
                    <button 
                      className="w-10 h-10 bg-light rounded-l-lg flex items-center justify-center text-primary hover:bg-gray-200 transition"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input 
                      type="number" 
                      value={quantity} 
                      min="1" 
                      className="w-16 h-10 border-y border-gray-300 text-center focus:outline-none"
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <button 
                      className="w-10 h-10 bg-light rounded-r-lg flex items-center justify-center text-primary hover:bg-gray-200 transition"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button 
                    className="bg-primary text-white py-3 px-8 rounded-full font-medium hover:bg-opacity-90 transition flex-grow sm:flex-grow-0"
                    onClick={handleAddToCart}
                  >
                    <i className="bi bi-cart-plus mr-2"></i> Add to Cart
                  </Button>
                  <Button 
                    variant="outlineRound"
                    className={`border py-3 px-8 rounded-full font-medium transition flex-grow sm:flex-grow-0 ${
                      isInWishlist(product.id) 
                        ? 'bg-primary border-primary text-white hover:bg-primary-dark' 
                        : 'border-primary text-primary hover:bg-light'
                    }`}
                    onClick={handleToggleWishlist}
                  >
                    <Heart className={`mr-2 w-5 h-5 ${isInWishlist(product.id) ? 'fill-white' : ''}`} />
                    {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Related Products */}
            {relatedProducts && relatedProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="font-poppins font-bold text-2xl mb-6">You May Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedLoading ? (
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
                    relatedProducts.slice(0, 4).map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  )}
                </div>
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

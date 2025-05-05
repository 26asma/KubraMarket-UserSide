import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { ShoppingCart as CartIcon, Heart, User, Search, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import ShoppingCart from "./ShoppingCart";

export default function Header() {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [location] = useLocation();
  const { user } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
    if (!mobileMenuVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
    if (!cartVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  // Reset body overflow when unmounting
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-md">
        {/* Top Bar */}
        <div className="bg-primary text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="hidden md:flex space-x-4 text-sm">
              <a href="#" className="hover:text-light transition">Help</a>
              <a href="#" className="hover:text-light transition">Track Order</a>
              <a href="#" className="hover:text-light transition">Contact Us</a>
            </div>
            <div className="text-sm font-medium">
              FREE SHIPPING on orders over $50
            </div>
            <div className="hidden md:flex space-x-4 text-sm">
              {user ? (
                <Link to="/account" className="hover:text-light transition">My Account</Link>
              ) : (
                <>
                  <Link to="/auth" className="hover:text-light transition">Login</Link>
                  <span>|</span>
                  <Link to="/auth" className="hover:text-light transition">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-primary font-poppins font-bold text-2xl">
                Kubra<span className="text-secondary">Market</span>
              </Link>
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:block flex-grow mx-8">
              <div className="relative">
                <input type="text" placeholder="Search for products..." className="w-full p-2 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                <button className="absolute inset-y-0 right-0 px-4 text-gray-500 hover:text-primary">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-6">
              <Link to="/wishlist" className="relative hidden md:block">
                <Heart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlistItems.length}
                </span>
              </Link>
              <button onClick={toggleCart} className="relative">
                <CartIcon className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              </button>
              <Link to={user ? "/account" : "/auth"} className="hidden md:block">
                <User className="w-6 h-6" />
              </Link>
              <button className="md:hidden" onClick={toggleMobileMenu}>
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
          
          {/* Mobile Search (Visible only on mobile) */}
          <div className="mt-4 md:hidden">
            <div className="relative">
              <input type="text" placeholder="Search for products..." className="w-full p-2 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              <button className="absolute inset-y-0 right-0 px-4 text-gray-500 hover:text-primary">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="bg-white border-t border-gray-200 hidden md:block">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center space-x-8 py-3">
              <li><Link to="/" className={`text-secondary hover:text-primary font-medium transition ${location === '/' ? 'text-primary' : ''}`}>Home</Link></li>
              <li><Link to="/#shops" className="text-secondary hover:text-primary font-medium transition">All Shops</Link></li>
              <li><Link to="/shop/new-arrivals" className="text-secondary hover:text-primary font-medium transition">New Arrivals</Link></li>
              <li><Link to="/shop/best-sellers" className="text-secondary hover:text-primary font-medium transition">Best Sellers</Link></li>
              <li><Link to="/shop/deals" className="text-secondary hover:text-primary font-medium transition">Deals</Link></li>
              <li><Link to="/about" className="text-secondary hover:text-primary font-medium transition">About Us</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isVisible={mobileMenuVisible} 
        onClose={() => {
          setMobileMenuVisible(false);
          document.body.style.overflow = "";
        }} 
      />

      {/* Shopping Cart */}
      <ShoppingCart 
        isVisible={cartVisible} 
        onClose={() => {
          setCartVisible(false);
          document.body.style.overflow = "";
        }} 
      />
    </>
  );
}

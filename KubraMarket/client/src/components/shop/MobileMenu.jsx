import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function MobileMenu({ isVisible, onClose }) {
  const { user } = useAuth();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" id="mobile-menu-overlay">
      <div className="bg-white h-full w-4/5 max-w-sm p-4 transform transition-transform translate-x-0" id="mobile-menu">
        <div className="flex justify-between items-center mb-6 pb-2 border-b">
          <h2 className="font-poppins font-bold text-xl">Menu</h2>
          <button className="text-2xl" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="flex flex-col space-y-2 mb-6">
          <Link to="/" className="px-2 py-3 rounded hover:bg-light flex items-center" onClick={onClose}>
            <i className="bi bi-house-door mr-3"></i> Home
          </Link>
          <Link to="/#shops" className="px-2 py-3 rounded hover:bg-light flex items-center" onClick={onClose}>
            <i className="bi bi-shop mr-3"></i> All Shops
          </Link>
          <Link to="/shop/new-arrivals" className="px-2 py-3 rounded hover:bg-light flex items-center" onClick={onClose}>
            <i className="bi bi-stars mr-3"></i> New Arrivals
          </Link>
          <Link to="/shop/best-sellers" className="px-2 py-3 rounded hover:bg-light flex items-center" onClick={onClose}>
            <i className="bi bi-award mr-3"></i> Best Sellers
          </Link>
          <Link to="/shop/deals" className="px-2 py-3 rounded hover:bg-light flex items-center" onClick={onClose}>
            <i className="bi bi-tags mr-3"></i> Deals
          </Link>
          <Link to="/about" className="px-2 py-3 rounded hover:bg-light flex items-center" onClick={onClose}>
            <i className="bi bi-info-circle mr-3"></i> About Us
          </Link>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">Account</h3>
          <div className="flex flex-col space-y-2">
            <Link to={user ? "/account" : "/auth"} className="px-2 py-2 rounded hover:bg-light flex items-center" onClick={onClose}>
              <i className="bi bi-person mr-3"></i> {user ? "My Account" : "Login/Register"}
            </Link>
            <Link to="/wishlist" className="px-2 py-2 rounded hover:bg-light flex items-center" onClick={onClose}>
              <i className="bi bi-heart mr-3"></i> Wishlist
            </Link>
            <Link to="/orders" className="px-2 py-2 rounded hover:bg-light flex items-center" onClick={onClose}>
              <i className="bi bi-bag-check mr-3"></i> Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
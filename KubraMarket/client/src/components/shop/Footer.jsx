import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-poppins font-bold text-xl mb-4">Kubra<span className="text-light">Market</span></h3>
            <p className="text-gray-400 mb-4">Your one-stop destination for premium products from 9 distinct shops.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Our Shops</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/shop/thaibah-enterprises" className="hover:text-white transition">THAIBAH ENTERPRISES</Link></li>
              <li><Link to="/shop/minha-zainab-enterprises" className="hover:text-white transition">MINHA ZAINAB ENTERPRISES</Link></li>
              <li><Link to="/shop/haya-boutique" className="hover:text-white transition">HAYA BOUTIQUE</Link></li>
              <li><Link to="/shop/ayisha-silk-house" className="hover:text-white transition">AYISHA SILK HOUSE</Link></li>
              <li><Link to="/#shops" className="hover:text-white transition">View All Shops</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <i className="bi bi-geo-alt-fill mr-3 mt-1"></i>
                <span>123 Commerce Street, Business District, City</span>
              </li>
              <li className="flex items-center">
                <i className="bi bi-telephone-fill mr-3"></i>
                <span>+1 234 567 8901</span>
              </li>
              <li className="flex items-center">
                <i className="bi bi-envelope-fill mr-3"></i>
                <span>contact@kubramarket.com</span>
              </li>
              <li className="flex items-center">
                <i className="bi bi-clock-fill mr-3"></i>
                <span>Mon-Sat: 9AM - 9PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Kubra Market. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link to="/privacy-policy" className="text-gray-400 text-sm hover:text-white transition">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-400 text-sm hover:text-white transition">Terms of Service</Link>
              <Link to="/shipping-info" className="text-gray-400 text-sm hover:text-white transition">Shipping Info</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

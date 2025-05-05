import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();
  const [, setLocation] = useLocation();
  
  // Clear the cart when the user lands on this page
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  
  return (
    <>
      <Header />
      
      <main className="py-12 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-success" />
            </div>
            
            <h1 className="font-poppins font-bold text-3xl mb-4 text-primary">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8 text-lg">Thank you for your purchase. Your order has been received and is being processed.</p>
            
            <div className="mb-8 p-6 bg-light rounded-lg">
              <h2 className="font-medium text-xl mb-4">What's Next?</h2>
              <ul className="text-left space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <i className="bi bi-envelope text-primary"></i>
                  </div>
                  <span>You'll receive a confirmation email with your order details shortly.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <i className="bi bi-box-seam text-primary"></i>
                  </div>
                  <span>We'll prepare your items for shipping within 1-2 business days.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <i className="bi bi-truck text-primary"></i>
                  </div>
                  <span>Once shipped, you'll receive tracking information to monitor your delivery.</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="px-8">
                <Link to="/">
                  Continue Shopping
                </Link>
              </Button>
              <Button asChild className="px-8">
                <Link to="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
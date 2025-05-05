import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal, shippingCost, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
  
  return (
    <>
      <Header />
      
      <main className="py-12 bg-light">
        <div className="container mx-auto px-4">
          <h1 className="font-poppins font-bold text-3xl mb-6">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-6xl mb-4 text-gray-400">
                <i className="bi bi-cart"></i>
              </div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link to="/">
                <Button variant="round">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="w-full lg:w-8/12">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b">
                    <div className="flex justify-between">
                      <h2 className="font-bold text-xl">Cart Items ({cartItems.length})</h2>
                      <button 
                        className="text-primary hover:text-opacity-80"
                        onClick={clearCart}
                      >
                        <i className="bi bi-trash mr-1"></i> Clear Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-24">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-24 object-cover rounded"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <p className="text-gray-500 text-sm">{item.shop}</p>
                        </div>
                        
                        <div className="flex items-center border rounded">
                          <button 
                            className="px-3 py-1 text-gray-500 hover:text-primary"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </button>
                          <span className="px-3 border-x">{item.quantity}</span>
                          <button 
                            className="px-3 py-1 text-gray-500 hover:text-primary"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-montserrat font-semibold text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <button 
                            className="text-gray-400 hover:text-destructive text-sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/">
                    <Button variant="outline" className="flex items-center gap-2">
                      <i className="bi bi-arrow-left"></i> Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="w-full lg:w-4/12">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="font-bold text-xl mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-semibold">${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="font-bold">Total</span>
                      <span className="font-montserrat font-bold text-xl">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Input 
                        placeholder="Enter coupon code" 
                        className="rounded-full"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button 
                        variant="outline" 
                        className="whitespace-nowrap rounded-full"
                        disabled={!couponCode}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                  
                  <Link to="/checkout">
                    <Button 
                      variant="round" 
                      className="w-full py-6 mb-4"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <i className="bi bi-shield-lock"></i>
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}

import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

export default function ShoppingCart({ isVisible, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice = 0, subtotal = 0, shippingCost = 0 } = useCart();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50" id="cart-overlay">
      <div className="bg-white h-full w-full md:w-96 ml-auto p-6 flex flex-col relative shadow-xl">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="font-poppins font-bold text-xl">Your Cart ({cartItems.length})</h2>
          <button className="text-2xl" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="flex-grow overflow-auto py-4 mb-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <i className="bi bi-cart text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-500">Your cart is empty</p>
              <Link to="/" onClick={onClose}>
                <Button variant="outline" className="mt-4">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 mb-4 pb-4 border-b">
                <img 
                  src={item.image} 
                  className="w-16 h-16 object-cover rounded" 
                  alt={item.name} 
                />
                <div className="flex-grow">
                  <h3 className="font-medium text-secondary">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.shop}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-primary font-montserrat font-semibold">${typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price).toFixed(2)}</span>
                    <div className="ml-auto flex items-center border rounded">
                      <button 
                        className="px-2 py-1 text-gray-500 hover:text-primary"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button 
                        className="px-2 py-1 text-gray-500 hover:text-primary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  className="text-gray-400 hover:text-destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-4 bg-white">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="font-montserrat font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span className="font-montserrat font-semibold">${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 pt-2 border-t">
              <span className="font-medium">Total</span>
              <span className="font-montserrat font-bold text-lg">${totalPrice.toFixed(2)}</span>
            </div>
            <Link to="/checkout" onClick={onClose} className="block w-full">
              <button className="checkout-btn">
                Proceed to Checkout <span className="ml-2">→</span>
              </button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full border border-gray-300 py-5 mt-3 rounded font-medium hover:bg-light transition"
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
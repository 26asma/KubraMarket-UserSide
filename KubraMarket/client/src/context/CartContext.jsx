// import { createContext, useState } from "react";

// export const CartContext = createContext(null);

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     setCartItems((currentItems) => {
//       const existingItem = currentItems.find((item) => item.id === product.id);
//       if (existingItem) {
//         return currentItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + (product.quantity || 1) }
//             : item
//         );
//       }
//       return [...currentItems, { ...product, quantity: product.quantity || 1 }];
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((currentItems) =>
//       currentItems.filter((item) => item.id !== productId)
//     );
//   };

//   const updateQuantity = (productId, quantity) => {
//     setCartItems((currentItems) =>
//       currentItems.map((item) =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const cartTotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         cartTotal,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

import { createContext, useContext, useState } from "react";

// const CartContext = createContext(null);
export const CartContext = createContext(null);


export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...currentItems, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // 🔢 Calculations
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCost = subtotal > 50 ? 0 : 5.99; // Example: Free shipping over $50
  const totalPrice = subtotal + shippingCost;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shippingCost,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

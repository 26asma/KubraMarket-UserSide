import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * @typedef {Object} WishlistItem
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} image
 * @property {string} shop
 */

/**
 * @typedef {Object} WishlistContextType
 * @property {WishlistItem[]} wishlistItems
 * @property {(item) => void} addToWishlist
 * @property {(id) => void} removeFromWishlist
 * @property {(id) => boolean} isInWishlist
 * @property {() => void} clearWishlist
 */

export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on initial load
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item) => {
    const exists = wishlistItems.some(i => i.id === item.id);

    if (!exists) {
      setWishlistItems(prev => [...prev, item]);
      toast({
        title: "Added to Wishlist",
        description: `${item.name} has been added to your wishlist.`,
      });
    } else {
      toast({
        title: "Already in Wishlist",
        description: `${item.name} is already in your wishlist.`,
        variant: "default",
      });
    }
  };

  const removeFromWishlist = (id) => {
    const item = wishlistItems.find(i => i.id === id);
    setWishlistItems(prev => prev.filter(item => item.id !== id));

    if (item) {
      toast({
        title: "Removed from Wishlist",
        description: `${item.name} has been removed from your wishlist.`,
        variant: "default",
      });
    }
  };

  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist.",
      variant: "default",
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
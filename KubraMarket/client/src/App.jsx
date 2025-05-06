import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import ShopPage from "@/pages/shop-page";
import ProductPage from "@/pages/product-page";
import AuthPage from "@/pages/auth-page";
import CartPage from "@/pages/cart-page";
import CheckoutPage from "@/pages/checkout-page";
import OrderSuccessPage from "@/pages/order-success-page";
import AllProductsPage from "@/pages/all-products-page";
import AllShopsPage from "@/pages/all-shops-page";
import WishlistPage from "@/pages/wishlist-page";
import AccountPage from "@/pages/account-page";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";
import { ProtectedRoute } from "./lib/protected-route";
import AboutPage from "@/pages/about-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/shop/:id" component={ShopPage} />
      <Route path="/product/:id" component={ProductPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/products" component={AllProductsPage} />
      <Route path="/shops" component={AllShopsPage} />
      <Route path="/wishlist" component={WishlistPage} />
      <ProtectedRoute path="/account" component={AccountPage} />
      <ProtectedRoute path="/checkout" component={CheckoutPage} />
      <ProtectedRoute path="/order-success" component={OrderSuccessPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router />
            <Toaster />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

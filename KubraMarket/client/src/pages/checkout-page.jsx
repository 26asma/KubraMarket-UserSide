import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Form schema
const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Zip code is required"),
  country: z.string().min(2, "Country is required"),
  paymentMethod: z.enum(["creditCard", "paypal", "bankTransfer"]),
  notes: z.string().optional(),
});

/** @typedef {import('zod').infer<typeof checkoutSchema>} CheckoutFormValues */

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [_, navigate] = useLocation();
  const { cartItems, subtotal, shippingCost, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Initialize form with default values
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.username ? `${user.username}@example.com` : "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      paymentMethod: "creditCard",
      notes: "",
    },
  });
  
  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }
  
  const onSubmit = async (data) => {
    setIsProcessing(true);
    
    try {
      // Create order
      const order = {
        ...data,
        items: cartItems,
        subtotal,
        shippingCost,
        totalPrice,
        userId: user?.id,
      };
      
      // Send order to API
      const response = await apiRequest("POST", "/api/orders", order);
      
      if (response.ok) {
        toast({
          title: "Order placed successfully!",
          description: "Thank you for your purchase.",
        });
        
        // Clear cart and redirect to success page
        clearCart();
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "Something went wrong with your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <>
      <Header />
      
      <main className="py-12 bg-light">
        <div className="container mx-auto px-4">
          <h1 className="font-poppins font-bold text-3xl mb-6">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="w-full lg:w-8/12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-bold text-xl mb-6">Shipping Information</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (234) 567-8901" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St, Apt 4B" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip/Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="United States" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="border-t pt-6 mt-8">
                      <h2 className="font-bold text-xl mb-6">Payment Method</h2>
                      
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                className="space-y-4"
                              >
                                <div className="flex items-center space-x-2 border p-4 rounded">
                                  <RadioGroupItem value="creditCard" id="creditCard" />
                                  <FormLabel htmlFor="creditCard" className="flex items-center cursor-pointer">
                                    <i className="bi bi-credit-card mr-2"></i> Credit Card
                                  </FormLabel>
                                </div>
                                <div className="flex items-center space-x-2 border p-4 rounded">
                                  <RadioGroupItem value="paypal" id="paypal" />
                                  <FormLabel htmlFor="paypal" className="flex items-center cursor-pointer">
                                    <i className="bi bi-paypal mr-2"></i> PayPal
                                  </FormLabel>
                                </div>
                                <div className="flex items-center space-x-2 border p-4 rounded">
                                  <RadioGroupItem value="bankTransfer" id="bankTransfer" />
                                  <FormLabel htmlFor="bankTransfer" className="flex items-center cursor-pointer">
                                    <i className="bi bi-bank mr-2"></i> Bank Transfer
                                  </FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Special delivery instructions or notes about your order" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      variant="round"
                      className="w-full py-6 mt-6"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="animate-spin inline-block mr-2">
                            <i className="bi bi-arrow-repeat"></i>
                          </span>
                          Processing Order...
                        </>
                      ) : "Place Order"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-4/12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-bold text-xl mb-4">Order Summary</h2>
                
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-3 flex gap-3">
                      <div className="w-16">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-16 object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500 text-sm">{item.shop}</p>
                        <div className="flex justify-between text-sm">
                          <span>{item.quantity} x ${typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price).toFixed(2)}</span>
                          <span className="font-semibold">${typeof item.price === 'number' ? (item.price * item.quantity).toFixed(2) : (parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mt-6 pt-6 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-bold">Total</span>
                    <span className="font-montserrat font-bold text-xl">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}

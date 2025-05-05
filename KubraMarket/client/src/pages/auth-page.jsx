import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import { useMutation } from "@tanstack/react-query";

// Form schemas
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

/** @typedef {import('zod').infer<typeof loginSchema>} LoginFormValues */
/** @typedef {import('zod').infer<typeof registerSchema>} RegisterFormValues */

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [location, navigate] = useLocation();
  
  const { user, login, register } = useAuth();
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => navigate("/")
  });
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => navigate("/")
  });
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  
  // Login form
  /** @type {import('react-hook-form').UseFormReturn<import('zod').infer<typeof loginSchema>>} */
const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  // Register form
  /** @type {import('react-hook-form').UseFormReturn<import('zod').infer<typeof registerSchema>>} */
const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  // Submit handlers
  const onLoginSubmit = async (data) => {
    await loginMutation.mutateAsync(data);
  };
  
  const onRegisterSubmit = async (data) => {
    const { confirmPassword, ...registerData } = data;
    await registerMutation.mutateAsync(registerData);
  };
  
  return (
    <>
      <Header />
      
      <main className="py-12 bg-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden">
            {/* Left side - Form */}
            <div className="w-full lg:w-1/2 p-8">
              <h1 className="font-poppins font-bold text-3xl mb-6 text-primary">
                {isLogin ? "Welcome Back" : "Create an Account"}
              </h1>
              
              {isLogin ? (
                <div>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="username" className="block text-sm font-medium">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={loginForm.watch("username") || ""}
                        onChange={(e) => loginForm.setValue("username", e.target.value)}
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-sm text-red-500">
                          {loginForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={loginForm.watch("password") || ""}
                        onChange={(e) => loginForm.setValue("password", e.target.value)}
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-red-500">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="round"
                      className="w-full py-6"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <>
                          <span className="animate-spin inline-block mr-2">
                            <i className="bi bi-arrow-repeat"></i>
                          </span>
                          Signing In...
                        </>
                      ) : "Sign In"}
                    </Button>
                    
                    <div className="text-center mt-4">
                      <p className="text-gray-600">
                        Don't have an account?{" "}
                        <button 
                          type="button"
                          className="text-primary font-medium hover:underline"
                          onClick={() => setIsLogin(false)}
                        >
                          Register Now
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="reg-username" className="block text-sm font-medium">
                        Username
                      </label>
                      <input
                        type="text"
                        id="reg-username"
                        placeholder="Choose a username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={registerForm.watch("username") || ""}
                        onChange={(e) => registerForm.setValue("username", e.target.value)}
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-sm text-red-500">
                          {registerForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="reg-password" className="block text-sm font-medium">
                        Password
                      </label>
                      <input
                        type="password"
                        id="reg-password"
                        placeholder="Create a password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={registerForm.watch("password") || ""}
                        onChange={(e) => registerForm.setValue("password", e.target.value)}
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-red-500">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="reg-confirm-password" className="block text-sm font-medium">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="reg-confirm-password"
                        placeholder="Confirm your password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={registerForm.watch("confirmPassword") || ""}
                        onChange={(e) => registerForm.setValue("confirmPassword", e.target.value)}
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                          {registerForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="round"
                      className="w-full py-6"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <>
                          <span className="animate-spin inline-block mr-2">
                            <i className="bi bi-arrow-repeat"></i>
                          </span>
                          Creating Account...
                        </>
                      ) : "Create Account"}
                    </Button>
                    
                    <div className="text-center mt-4">
                      <p className="text-gray-600">
                        Already have an account?{" "}
                        <button 
                          type="button"
                          className="text-primary font-medium hover:underline"
                          onClick={() => setIsLogin(true)}
                        >
                          Sign In
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
            {/* Right side - Hero image */}
            <div className="w-full lg:w-1/2 bg-primary p-12 text-white hidden lg:block">
              <div className="h-full flex flex-col justify-center">
                <h2 className="font-poppins font-bold text-3xl mb-4">Kubra Market</h2>
                <p className="text-lg mb-6">Your one-stop destination for premium products from 9 distinct shops.</p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <i className="bi bi-check-circle-fill mr-3"></i>
                    <span>Access to exclusive deals and offers</span>
                  </li>
                  <li className="flex items-center">
                    <i className="bi bi-check-circle-fill mr-3"></i>
                    <span>Track your orders and purchase history</span>
                  </li>
                  <li className="flex items-center">
                    <i className="bi bi-check-circle-fill mr-3"></i>
                    <span>Save your favorite items for later</span>
                  </li>
                  <li className="flex items-center">
                    <i className="bi bi-check-circle-fill mr-3"></i>
                    <span>Fast checkout experience</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
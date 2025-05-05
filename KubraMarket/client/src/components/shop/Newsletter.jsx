import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically call an API to subscribe the user
    // For now, we'll just show a success message
    toast({
      title: "Subscribed!",
      description: "You've been added to our newsletter",
    });
    
    setEmail("");
  };
  
  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-poppins font-bold text-3xl mb-3">Join Our Newsletter</h2>
          <p className="mb-6">Subscribe to get special offers, free giveaways, and exclusive deals.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow py-3 px-4 rounded-full text-secondary focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit"
              className="bg-white text-primary py-3 px-6 rounded-full font-medium hover:bg-light transition"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

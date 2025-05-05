import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="bg-light">
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="font-poppins font-bold text-3xl md:text-5xl mb-4 text-primary">Discover Your Style at Kubra Market</h1>
              <p className="text-gray-600 mb-6 text-lg">Shop from 9 premium vendors offering everything from traditional clothing to home decor and kids' fashion.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="#shops" className="bg-primary text-white py-3 px-6 rounded-full font-medium hover:bg-opacity-90 transition text-center block">
                  Explore Shops
                </Link>
                <Link to="#trending" className="border border-primary text-primary py-3 px-6 rounded-full font-medium hover:bg-light transition text-center block">
                  Trending Products
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Kubra Market showcasing products" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute -bottom-5 -left-5 bg-white p-3 rounded-lg shadow-md hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="bg-success text-white p-1 rounded-full">
                    <i className="bi bi-check"></i>
                  </div>
                  <span className="font-medium text-sm">Trusted Vendors</span>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 bg-white p-3 rounded-lg shadow-md hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="bg-primary text-white p-1 rounded-full">
                    <i className="bi bi-truck"></i>
                  </div>
                  <span className="font-medium text-sm">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
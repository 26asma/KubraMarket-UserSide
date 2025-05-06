
import React from 'react';
import Header from '../components/shop/Header';
import Footer from '../components/shop/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">The Vision Behind Kubra Market</h1>
          
          <div className="max-w-3xl mx-auto space-y-6 text-gray-600">
            <p>
              Kubra Market is a transformative initiative by Ambur Muslim Education Society (AMES), committed to empowering women by providing them with a dedicated platform to start and grow their own businesses. Understanding the challenges women face in launching their careers, AMES has developed a women-exclusive shop complex featuring 10 subsidized rental spaces, offering aspiring female entrepreneurs the opportunity to build sustainable businesses.
            </p>
            
            <p>
              At Kubra Market, women can establish businesses in food, fashion, tailoring, beauty, and other essential services, catering exclusively to female customers. This initiative promotes financial independence, community growth, and skill development, ensuring that women have a safe, inclusive, and supportive space to thrive and succeed.
            </p>
            
            <p>
              Through Kubra Market, AMES envisions a future where women-led businesses flourish, turning ambition into success and making a meaningful impact on the local economy.
            </p>
            
            <p>
              By creating dedicated spaces like Kubra Market, we ensure a safer, more inclusive, and empowering business environment, where women can confidently pursue their entrepreneurial dreams.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

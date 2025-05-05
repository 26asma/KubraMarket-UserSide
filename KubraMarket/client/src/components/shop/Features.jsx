export default function Features() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-light rounded-lg p-6 text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <i className="bi bi-truck"></i>
            </div>
            <h3 className="font-poppins font-bold text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">On all orders over $50</p>
          </div>
          
          <div className="bg-light rounded-lg p-6 text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <i className="bi bi-shield-check"></i>
            </div>
            <h3 className="font-poppins font-bold text-lg mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">100% secure payment</p>
          </div>
          
          <div className="bg-light rounded-lg p-6 text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <i className="bi bi-arrow-return-left"></i>
            </div>
            <h3 className="font-poppins font-bold text-lg mb-2">Easy Returns</h3>
            <p className="text-gray-600 text-sm">30 days return policy</p>
          </div>
          
          <div className="bg-light rounded-lg p-6 text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <i className="bi bi-headset"></i>
            </div>
            <h3 className="font-poppins font-bold text-lg mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Dedicated support</p>
          </div>
        </div>
      </div>
    </section>
  );
}

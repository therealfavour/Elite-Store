import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-sm opacity-90">Trusted by 50,000+ customers</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing Products at 
              <span className="text-amber-400"> Unbeatable Prices</span>
            </h1>
            
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Shop from our curated collection of premium products. Free shipping on orders over $50, 
              30-day returns, and 24/7 customer support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center group">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                View Collections
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">50%</div>
                <div className="text-lg opacity-90 mb-4">Off Selected Items</div>
                <div className="bg-amber-400 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold">
                  Limited Time Offer
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
              Free Shipping
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-amber-400 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
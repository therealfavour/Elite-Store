import React from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  stock?: number;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  isInWishlist,
  stock
}) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const actualStock = stock !== undefined ? stock : (product.inStock ? 10 : 0);
  const isOutOfStock = actualStock === 0;
  const isLowStock = actualStock > 0 && actualStock <= 5;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discountPercentage}%
          </div>
        )}
        
        {/* Stock Status */}
        {isOutOfStock ? (
          <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Out of Stock
          </div>
        ) : isLowStock && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Only {actualStock} left
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onToggleWishlist(product)}
            className={`p-2 rounded-full ${
              isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
            } hover:bg-red-500 hover:text-white transition-colors shadow-lg`}
          >
            <Heart className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => onViewDetails(product)}
            className="p-2 bg-white text-gray-600 rounded-full hover:bg-blue-500 hover:text-white transition-colors shadow-lg"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 font-medium">{product.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-amber-400 fill-current" />
            <span className="text-sm text-gray-600">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            !isOutOfStock
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>{!isOutOfStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
        
        {actualStock > 0 && actualStock <= 10 && (
          <p className="text-xs text-gray-500 text-center mt-2">
            {actualStock} in stock
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
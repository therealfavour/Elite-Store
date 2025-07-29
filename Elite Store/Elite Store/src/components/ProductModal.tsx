import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, Plus, Minus, Check } from 'lucide-react';
import { Product } from './ProductCard';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!isOpen || !product) return null;

  const images = [product.image, product.image, product.image]; // Demo multiple images

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="absolute inset-4 md:inset-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid lg:grid-cols-2 gap-8 p-6">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex space-x-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        activeImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 font-medium">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                          -{discountPercentage}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        In Stock
                      </>
                    ) : (
                      'Out of Stock'
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {product.inStock && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2 hover:bg-gray-100 rounded-l-lg"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-medium">{quantity}</span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2 hover:bg-gray-100 rounded-r-lg"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-sm text-gray-500">
                          Total: ${(product.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>Add to Cart</span>
                      </button>
                      
                      <button
                        onClick={() => onToggleWishlist(product)}
                        className={`p-3 rounded-lg font-semibold transition-colors ${
                          isInWishlist
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
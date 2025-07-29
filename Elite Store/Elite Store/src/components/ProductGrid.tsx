import React from 'react';
import ProductCard, { Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  inventory: { [productId: string]: number };
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: string[];
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  inventory,
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  wishlistItems
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          stock={inventory[product.id]}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={wishlistItems.includes(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
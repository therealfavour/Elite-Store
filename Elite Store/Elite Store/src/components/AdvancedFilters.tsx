import React, { useState } from 'react';
import { Filter, X, Star, DollarSign } from 'lucide-react';

interface FilterOptions {
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  onSale: boolean;
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters
}) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  if (!isOpen) return null;

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    onClose();
  };

  const handleClear = () => {
    const defaultFilters: FilterOptions = {
      priceRange: [0, 500],
      rating: 0,
      inStock: false,
      onSale: false,
      sortBy: 'name'
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
    onClearFilters();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Advanced Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
              <select
                value={localFilters.sortBy}
                onChange={(e) => setLocalFilters({
                  ...localFilters,
                  sortBy: e.target.value as FilterOptions['sortBy']
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Price Range: ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
              </label>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Minimum Price</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={localFilters.priceRange[0]}
                    onChange={(e) => setLocalFilters({
                      ...localFilters,
                      priceRange: [parseInt(e.target.value), localFilters.priceRange[1]]
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Maximum Price</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={localFilters.priceRange[1]}
                    onChange={(e) => setLocalFilters({
                      ...localFilters,
                      priceRange: [localFilters.priceRange[0], parseInt(e.target.value)]
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Star className="h-4 w-4 mr-1" />
                Minimum Rating
              </label>
              <div className="flex space-x-2">
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setLocalFilters({ ...localFilters, rating })}
                    className={`flex items-center px-3 py-2 rounded-lg border transition-colors ${
                      localFilters.rating === rating
                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{rating === 0 ? 'Any' : rating}</span>
                    {rating > 0 && <Star className="h-3 w-3 ml-1 text-amber-400 fill-current" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability & Sale Filters */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={localFilters.inStock}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    inStock: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="inStock" className="ml-3 text-sm text-gray-700">
                  In Stock Only
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="onSale"
                  checked={localFilters.onSale}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    onSale: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="onSale" className="ml-3 text-sm text-gray-700">
                  On Sale Only
                </label>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="border-t p-6 space-y-3">
            <button
              onClick={handleApply}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClear}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
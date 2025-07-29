import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut, Filter, Package } from 'lucide-react';

interface HeaderProps {
  cartItems: number;
  wishlistItems: number;
  onCartToggle: () => void;
  onAuthToggle: () => void;
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  onFiltersToggle: () => void;
  onOrderHistoryToggle: () => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItems,
  wishlistItems,
  onCartToggle,
  onAuthToggle,
  onSearch,
  onCategoryFilter,
  onFiltersToggle,
  onOrderHistoryToggle,
  user,
  onLogout
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EliteStore</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryFilter(category)}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {category}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:block text-sm font-medium">{user.name}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-3 border-b">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        onOrderHistoryToggle();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Order History
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthToggle}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <User className="h-5 w-5" />
              </button>
            )}
            
            <button className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <Heart className="h-5 w-5" />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </button>
            
            <button
              onClick={onFiltersToggle}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Filter className="h-5 w-5" />
            </button>

            <button
              onClick={onCartToggle}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategoryFilter(category);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
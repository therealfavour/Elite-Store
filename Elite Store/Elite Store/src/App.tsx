import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ShoppingCart from './components/ShoppingCart';
import ProductModal from './components/ProductModal';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import OrderConfirmation from './components/OrderConfirmation';
import OrderHistory from './components/OrderHistory';
import OrderDetails from './components/OrderDetails';
import AdvancedFilters from './components/AdvancedFilters';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { products } from './data/products';
import { Product } from './components/ProductCard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAuth } from './hooks/useAuth';
import { useInventory } from './hooks/useInventory';
import { useOrders, Order } from './hooks/useOrders';

interface CartItem extends Product {
  quantity: number;
}

interface FilterOptions {
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  onSale: boolean;
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

function App() {
  const { user, isLoading: authLoading, login, signup, logout } = useAuth();
  const { inventory, initializeInventory, getStock, reserveStock, releaseStock, confirmPurchase } = useInventory();
  const { orders, addOrder, getUserOrders } = useOrders();
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cartItems', []);
  const [wishlistItems, setWishlistItems] = useLocalStorage<string[]>('wishlistItems', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 500],
    rating: 0,
    inStock: false,
    onSale: false,
    sortBy: 'name'
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  // Initialize inventory on component mount
  useEffect(() => {
    initializeInventory(products);
  }, []);

  // Create inventory lookup object
  const inventoryLookup = inventory.reduce((acc, item) => {
    acc[item.productId] = getStock(item.productId);
    return acc;
  }, {} as { [productId: string]: number });

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply advanced filters
    filtered = filtered.filter(product => {
      const price = product.price;
      const rating = product.rating;
      const stock = getStock(product.id);
      const onSale = !!product.originalPrice;
      
      return (
        price >= filters.priceRange[0] &&
        price <= filters.priceRange[1] &&
        rating >= filters.rating &&
        (!filters.inStock || stock > 0) &&
        (!filters.onSale || onSale)
      );
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, filters, inventory]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    const availableStock = getStock(product.id);
    
    if (availableStock === 0) {
      showToast('This product is currently out of stock', 'error');
      return;
    }
    
    const existingItem = cartItems.find(item => item.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    
    if (currentQuantity + quantity > availableStock) {
      showToast(`Only ${availableStock} items available in stock`, 'error');
      return;
    }
    
    // Reserve stock
    if (!reserveStock(product.id, quantity)) {
      showToast('Unable to reserve stock for this item', 'error');
      return;
    }
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    
    showToast(`${product.name} added to cart`, 'success');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      const difference = quantity - existingItem.quantity;
      if (difference > 0) {
        // Need to reserve more stock
        if (!reserveStock(productId, difference)) {
          showToast('Not enough stock available', 'error');
          return;
        }
      } else if (difference < 0) {
        // Release some stock
        releaseStock(productId, Math.abs(difference));
      }
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      releaseStock(productId, existingItem.quantity);
    }
    
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    const isInWishlist = wishlistItems.includes(product.id);
    setWishlistItems(prevItems => {
      if (prevItems.includes(product.id)) {
        return prevItems.filter(id => id !== product.id);
      }
      return [...prevItems, product.id];
    });
    
    showToast(
      isInWishlist ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`,
      'info'
    );
  };

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };
  
  const handleOrderComplete = (orderData: any) => {
    // Confirm purchase and update inventory
    cartItems.forEach(item => {
      confirmPurchase(item.id, item.quantity);
    });
    
    // Add order to history
    const newOrder = addOrder(orderData);
    setOrderData(newOrder);
    setCartItems([]);
    setIsCheckoutModalOpen(false);
    showToast('Order placed successfully!', 'success');
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
    setIsOrderHistoryOpen(false);
  };

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    if (success) {
      showToast('Welcome back!', 'success');
    }
    return success;
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    const success = await signup(name, email, password);
    if (success) {
      showToast('Account created successfully!', 'success');
    }
    return success;
  };
  
  const handleLogout = () => {
    logout();
    showToast('Signed out successfully', 'info');
  };
  
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItems={totalCartItems}
        wishlistItems={wishlistItems.length}
        onCartToggle={() => setIsCartOpen(true)}
        onAuthToggle={() => setIsAuthModalOpen(true)}
        onSearch={setSearchQuery}
        onCategoryFilter={setSelectedCategory}
        onFiltersToggle={() => setIsFiltersOpen(true)}
        onOrderHistoryToggle={() => setIsOrderHistoryOpen(true)}
        user={user}
        onLogout={handleLogout}
      />
      
      <main>
        <Hero />
        
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedCategory === 'All' ? 'Featured Products' : `${selectedCategory} Products`}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our carefully curated selection of premium products at unbeatable prices
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            
            <ProductGrid
              products={filteredProducts}
              inventory={inventoryLookup}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewProductDetails}
              onToggleWishlist={handleToggleWishlist}
              wishlistItems={wishlistItems}
            />
          </div>
        </section>
      </main>
      
      <Footer />
      
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
      
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={selectedProduct ? wishlistItems.includes(selectedProduct.id) : false}
      />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        isLoading={authLoading}
      />
      
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        items={cartItems}
        onOrderComplete={handleOrderComplete}
        user={user}
      />
      
      <OrderHistory
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={getUserOrders()}
        onViewOrder={handleViewOrder}
      />
      
      <OrderDetails
        order={selectedOrder}
        isOpen={isOrderDetailsOpen}
        onClose={() => {
          setIsOrderDetailsOpen(false);
          setSelectedOrder(null);
        }}
      />
      
      <AdvancedFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={() => {}}
        onClearFilters={() => {}}
      />
      
      {orderData && (
        <OrderConfirmation
          orderData={orderData}
          onClose={() => setOrderData(null)}
        />
      )}
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}

export default App;
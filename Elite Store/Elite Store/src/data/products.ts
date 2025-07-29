import { Product } from '../components/ProductCard';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    originalPrice: 129.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    rating: 4.5,
    reviews: 256,
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music, calls, and travel.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Quick charge - 5 minutes for 3 hours',
      'Premium leather ear cushions',
      'Built-in microphone'
    ],
    inStock: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    rating: 4.7,
    reviews: 189,
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and smartphone integration. Track your health and stay connected.',
    features: [
      'Heart rate monitoring',
      'Built-in GPS',
      'Water resistant up to 50m',
      '7-day battery life',
      'Sleep tracking'
    ],
    inStock: true
  },
  {
    id: '3',
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Clothing',
    rating: 4.3,
    reviews: 124,
    description: 'Soft, comfortable cotton t-shirt made from 100% organic cotton. Perfect for everyday wear with a classic fit.',
    features: [
      '100% organic cotton',
      'Classic fit',
      'Pre-shrunk fabric',
      'Machine washable',
      'Available in multiple colors'
    ],
    inStock: true
  },
  {
    id: '4',
    name: 'Professional Coffee Maker',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Home & Garden',
    rating: 4.8,
    reviews: 342,
    description: 'Brew the perfect cup every time with this professional-grade coffee maker. Features programmable settings and thermal carafe.',
    features: [
      'Programmable 24-hour timer',
      'Thermal carafe keeps coffee hot',
      'Auto-pause and pour',
      'Gold-tone permanent filter',
      'Brew strength selector'
    ],
    inStock: true
  },
  {
    id: '5',
    name: 'Bestselling Novel Collection',
    price: 34.99,
    originalPrice: 49.99,
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Books',
    rating: 4.6,
    reviews: 89,
    description: 'Collection of 3 bestselling novels from award-winning authors. Perfect for book lovers and gift giving.',
    features: [
      'Set of 3 bestselling novels',
      'Award-winning authors',
      'Hardcover edition',
      'Beautiful dust jackets',
      'Perfect for gifting'
    ],
    inStock: true
  },
  {
    id: '6',
    name: 'Yoga Mat Premium',
    price: 89.99,
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Sports',
    rating: 4.4,
    reviews: 167,
    description: 'High-quality yoga mat with superior grip and cushioning. Made from eco-friendly materials for your practice.',
    features: [
      'Eco-friendly materials',
      'Superior grip surface',
      'Extra thick cushioning',
      'Lightweight and portable',
      'Easy to clean'
    ],
    inStock: true
  },
  {
    id: '7',
    name: 'Wireless Charging Pad',
    price: 39.99,
    originalPrice: 59.99,
    image: 'https://images.pexels.com/photos/4183042/pexels-photo-4183042.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    rating: 4.2,
    reviews: 203,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    features: [
      'Fast wireless charging',
      'Qi-compatible',
      'LED charging indicator',
      'Slim profile design',
      'Over-temperature protection'
    ],
    inStock: false
  },
  {
    id: '8',
    name: 'Designer Sunglasses',
    price: 159.99,
    originalPrice: 219.99,
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Clothing',
    rating: 4.5,
    reviews: 78,
    description: 'Stylish designer sunglasses with UV400 protection. Classic aviator style with premium materials.',
    features: [
      'UV400 protection',
      'Premium metal frames',
      'Polarized lenses',
      'Classic aviator style',
      'Includes protective case'
    ],
    inStock: true
  }
];
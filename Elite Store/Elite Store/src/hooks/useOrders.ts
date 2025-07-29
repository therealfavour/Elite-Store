import { useLocalStorage } from './useLocalStorage';
import { Product } from '../components/ProductCard';

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    email: string;
    phone: string;
  };
}

export function useOrders() {
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);

  const addOrder = (orderData: Omit<Order, 'id' | 'orderDate' | 'estimatedDelivery' | 'trackingNumber'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const getUserOrders = () => {
    return orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
  };

  return {
    orders,
    addOrder,
    updateOrderStatus,
    getOrderById,
    getUserOrders
  };
}
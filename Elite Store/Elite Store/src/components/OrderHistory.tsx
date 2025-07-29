import React from 'react';
import { X, Package, Truck, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Order } from '../hooks/useOrders';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onViewOrder: (order: Order) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({
  isOpen,
  onClose,
  orders,
  onViewOrder
}) => {
  if (!isOpen) return null;

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-orange-600" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {orders.length === 0 ? (
              <div className="text-center py-20">
                <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No orders yet</p>
                <p className="text-sm text-gray-400 mt-2">Your order history will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-2 capitalize">{order.status}</span>
                        </span>
                        <button
                          onClick={() => onViewOrder(order)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <img
                            key={index}
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{order.items.length} items</p>
                      </div>
                    </div>
                    
                    {order.trackingNumber && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Tracking:</span> {order.trackingNumber}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
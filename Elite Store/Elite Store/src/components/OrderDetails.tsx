import React from 'react';
import { X, Package, Truck, CheckCircle, MapPin, CreditCard } from 'lucide-react';
import { Order } from '../hooks/useOrders';

interface OrderDetailsProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const getStatusSteps = () => {
    const steps = [
      { key: 'processing', label: 'Processing', icon: Package },
      { key: 'shipped', label: 'Shipped', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: CheckCircle }
    ];

    const currentIndex = steps.findIndex(step => step.key === order.status);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  const statusSteps = getStatusSteps();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-4 md:inset-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Order Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Order Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Number:</span>
                      <span className="font-medium">{order.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Delivery:</span>
                      <span className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                    </div>
                    {order.trackingNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tracking Number:</span>
                        <span className="font-medium">{order.trackingNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Status */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Order Status</h3>
                  <div className="space-y-4">
                    {statusSteps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.key} className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.completed ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="ml-4 flex-1">
                            <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                              {step.label}
                            </p>
                          </div>
                          {index < statusSteps.length - 1 && (
                            <div className={`w-px h-8 ml-5 ${step.completed ? 'bg-blue-600' : 'bg-gray-200'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Shipping Address
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium">
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                    </p>
                    <p className="text-gray-600">{order.shippingAddress.address}</p>
                    <p className="text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p className="text-gray-600 mt-2">{order.shippingAddress.email}</p>
                    <p className="text-gray-600">{order.shippingAddress.phone}</p>
                  </div>
                </div>
              </div>

              {/* Order Items & Summary */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${item.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Order Summary
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">
                        {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium">${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
import React from 'react';
import { CheckCircle, Package, Truck, Calendar } from 'lucide-react';

interface OrderData {
  id: string;
  items: any[];
  total: number;
  shippingAddress: any;
  orderDate: string;
}

interface OrderConfirmationProps {
  orderData: OrderData;
  onClose: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderData, onClose }) => {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      <div className="absolute inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Order Number</p>
                  <p className="font-semibold">#{orderData.id}</p>
                </div>
                <div>
                  <p className="text-gray-500">Order Total</p>
                  <p className="font-semibold">${orderData.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Order Date</p>
                  <p className="font-semibold">{new Date(orderData.orderDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Estimated Delivery</p>
                  <p className="font-semibold">{estimatedDelivery.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Processing</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400">Shipping</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400">Delivered</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                We'll send you shipping confirmation and tracking information to your email.
              </p>
              
              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
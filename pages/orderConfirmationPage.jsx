import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdCheckCircle, MdLocalShipping, MdAccessTime } from "react-icons/md";

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      // If no order data, redirect to my orders
      navigate("/my-orders");
    }
  }, [location.state, navigate]);

  if (!order) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <MdCheckCircle className="text-green-400 text-4xl" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4">
            Order Confirmed!
          </h1>
          <p className="text-white/60 text-lg">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Order Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/60">Order ID:</span>
                  <span className="text-white font-semibold">#{order.orderID || order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Date:</span>
                  <span className="text-white">{new Date(order.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Status:</span>
                  <span className="text-green-400 font-semibold">{order.status || "Processing"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Total:</span>
                  <span className="text-accent font-bold text-xl">
                    Rs. {order.totalAmount || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Shipping Address</h2>
              <div className="text-white/80 space-y-2">
                <p className="font-semibold">{order.firstName} {order.lastName}</p>
                <p>{order.addressLine1}</p>
                {order.addressLine2 && <p>{order.addressLine2}</p>}
                <p>{order.city}, {order.postalCode}</p>
                <p>{order.country}</p>
                <p className="text-accent">{order.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Order Items</h2>
          <div className="space-y-4">
            {order.items?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-accent font-bold">#{item.productID}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{item.name || `Product ID: ${item.productID}`}</p>
                    <p className="text-white/60">Quantity: {item.qty}</p>
                    <p className="text-accent">Rs. {item.price || 0} each</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-accent font-bold">
                    Rs. {(item.price || 0) * item.qty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Order Status</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <MdCheckCircle className="text-green-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Order Placed</p>
                <p className="text-white/60 text-sm">Your order has been received and is being processed.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <MdAccessTime className="text-accent" />
              </div>
              <div>
                <p className="text-white/60 font-semibold">Processing</p>
                <p className="text-white/60 text-sm">We're preparing your items for shipment.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <MdLocalShipping className="text-white/40" />
              </div>
              <div>
                <p className="text-white/40 font-semibold">Shipped</p>
                <p className="text-white/40 text-sm">Your order will be shipped soon.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/my-orders")}
            className="bg-accent hover:bg-accent/80 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-accent/30 hover:scale-105"
          >
            View All Orders
          </button>
          <button
            onClick={() => navigate("/products")}
            className="border border-white/25 hover:border-accent text-white/80 hover:text-white font-semibold px-8 py-4 rounded-full transition-all backdrop-blur-sm"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
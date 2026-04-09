import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import getFormattedPrice from "./utils/price-format";
import LoadingAnimation from "../src/components/loadingAnimation";
import { MdShoppingBag, MdLocalShipping, MdCheckCircle, MdSchedule } from "react-icons/md";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to view your orders.");
      navigate("/login");
      return;
    }

    // Fetch user's orders
    axios
      .get(import.meta.env.VITE_API_URL + "/orders", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setOrders(response.data.reverse() || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load your orders.");
        setLoading(false);
      });
  }, [navigate]);

  const getStatusDisplay = (status = "pending") => {
    const s = status.toLowerCase();
    if (s === "delivered") return { color: "text-green-400 bg-green-400/10 border-green-400/20", icon: <MdCheckCircle /> };
    if (s === "shipped") return { color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: <MdLocalShipping /> };
    return { color: "text-amber-400 bg-amber-400/10 border-amber-400/20", icon: <MdSchedule /> }; // Pending/Processing
  };

  return (
    <div
      className="min-h-screen relative flex flex-col items-center bg-secondary overflow-hidden py-12 lg:py-24 font-sans pb-32"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />


      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(2,169,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(2,169,247,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/15 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 -left-10 w-72 h-72 rounded-full bg-accent/10 blur-[60px] pointer-events-none" />

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#d4f0fc" />
        </svg>
      </div>

      
      <div className="relative z-10 w-full max-w-[900px] mx-auto px-4 flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">My Orders</h1>
          <p className="text-white/50 text-sm">View and track your recent purchases.</p>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingAnimation />
          </div>
        ) : orders.length === 0 ? (
          
          /* Empty State */
          <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-2xl mt-10">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <MdShoppingBag size={48} className="text-white/20" />
            </div>
            <h2 className="text-2xl font-black text-white mb-3">No orders yet</h2>
            <p className="text-white/50 max-w-sm mb-8">
              You haven't placed any orders. Start browsing our premium tech collection to find your next upgrade!
            </p>
            <Link
              to="/products"
              className="bg-accent hover:bg-accent/80 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg shadow-accent/30 hover:scale-105"
            >
              START SHOPPING
            </Link>
          </div>

        ) : (
          
          /* Orders List */
          <div className="flex flex-col gap-6">
            {orders.map((order, index) => {
              const statusData = getStatusDisplay(order.status || "Pending");
              
              // Calculate total if backend doesn't provide it directly
              const orderTotal = order.total || order.items?.reduce((sum, item) => sum + (item.product?.price * item.qty), 0) || 0;

              return (
                <div
                  key={order._id || index}
                  className="w-full bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-xl transition-all hover:border-white/20"
                >
                  {/* Order Header */}
                  <div className="bg-white/5 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5">
                    <div>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">
                        Order #{order._id?.slice(-8).toUpperCase() || "N/A"}
                      </p>
                      <p className="text-white text-sm font-semibold">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "Recently placed"}
                      </p>
                    </div>
                    
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${statusData.color}`}>
                      {statusData.icon}
                      {order.status || "Pending"}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6 flex flex-col gap-4">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white/5 rounded-2xl p-3 border border-white/5">
                        <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center p-2 shrink-0">
                          <img 
                            src={item.product?.image || item.product?.images?.[0] || "/placeholder.png"} 
                            alt={item.product?.name} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-sm line-clamp-1">{item.product?.name || "Unknown Product"}</h3>
                          <p className="text-white/50 text-xs mt-1">Qty: {item.qty}</p>
                        </div>
                        <div className="text-right shrink-0 pr-2">
                          <p className="text-white font-black text-sm">{getFormattedPrice(item.product?.price * item.qty)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="bg-white/5 px-6 py-5 flex justify-between items-center border-t border-white/5">
                    <span className="text-white/60 text-sm font-bold uppercase tracking-widest">
                      Total Amount
                    </span>
                    <span 
                      className="text-2xl font-black text-transparent bg-clip-text"
                      style={{ backgroundImage: "linear-gradient(135deg, #02a9f7 0%, #7de8ff 100%)" }}
                    >
                      {getFormattedPrice(orderTotal)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
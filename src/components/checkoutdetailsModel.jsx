import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { MdCheckCircle } from "react-icons/md";

export default function CheckoutDetailsModal(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token == null) {
      toast.error("Please login to continue checkout!");
      navigate("/login");
    }
    axios
      .get(import.meta.env.VITE_API_URL + "/users/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const cart = props.cart;

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You must be logged in to place an order");
      navigate("/login");
      return;
    }

    // Basic validation
    if (!firstName || !lastName || !addressLine1 || !city || !phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const order = {
      firstName: firstName,
      lastName: lastName,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      postalCode: postalCode,
      phone: phone,
      country: "Sri Lanka",
      items: [],
    };
    
    cart.forEach((item) => {
      order.items.push({
        productID: item.product.productID,
        qty: item.qty,
      });
    });

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/orders", order, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      //  success screen
      setIsSuccess(true);
      toast.success("Order placed successfully!");
      
      // Create complete order data with shipping details and full cart items
      const completeOrderData = {
        ...response.data,
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        postalCode,
        phone,
        country: "Sri Lanka",
        items: cart.map(item => ({
          productID: item.product.productID,
          qty: item.qty,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
        })),
        totalAmount: cart.reduce((total, item) => total + (item.product.price * item.qty), 0)
      };
      
      setOrderData(completeOrderData);
      
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to place the order. Please try again."
      );
    }
  }

  return (
    <>
      <button
        className="bg-accent hover:bg-accent/80 text-white font-black px-10 py-3.5 rounded-full transition-all shadow-lg shadow-accent/30 hover:scale-105"
        onClick={() => {
          setIsVisible(true);
          setIsSuccess(false); // Reset success state when opening
        }}
      >
        BUY NOW
      </button>

      {isVisible && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6">
          
          <div className="w-full max-w-[480px] max-h-[90vh] overflow-y-auto bg-secondary/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-white/10 animate-fade-in-up custom-scrollbar">
            
            <button
              onClick={() => {
                setIsVisible(false);
              }}
              className="w-10 h-10 flex items-center justify-center absolute top-4 right-4 text-white/40 hover:text-white hover:bg-white/10 rounded-full text-lg font-bold transition-all"
            >
              ✕
            </button>

            {isSuccess ? (
              /* Success Screen UI */
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-2 animate-bounce">
                  <MdCheckCircle size={48} className="text-green-400" />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight">
                  Order <span className="text-green-400">Confirmed!</span>
                </h2>
                <p className="text-white/60 text-sm mb-6 max-w-xs">
                  Thank you for your purchase.<br/>
                  We will process your order immediately.
                </p>
                <button
                  onClick={() => {
                    setIsVisible(false);
                    navigate("/order-confirmation", { state: { order: orderData } });
                  }}
                  className="w-full bg-green-500 hover:bg-green-400 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all tracking-wide"
                >
                  VIEW MY ORDERS
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-black text-white mb-6 tracking-tight mt-2">
                  Shipping <span className="text-accent">Details</span>
                </h1>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="First Name *"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-white/5 rounded-xl text-white placeholder-white/40 focus:border-accent focus:bg-white/10 focus:outline-none transition-all text-sm"
                    />
                    <input
                      placeholder="Last Name *"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-white/5 rounded-xl text-white placeholder-white/40 focus:border-accent focus:bg-white/10 focus:outline-none transition-all text-sm"
                    />
                  </div>

                  <input
                    placeholder="Address Line 1 *"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className="w-full px-4 py-3 border border-white/10 bg-white/5 rounded-xl text-white placeholder-white/40 focus:border-accent focus:bg-white/10 focus:outline-none transition-all text-sm"
                  />

                  <input
                    placeholder="Address Line 2 (Optional)"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    className="w-full px-4 py-3 border border-white/10 bg-white/5 rounded-xl text-white placeholder-white/40 focus:border-accent focus:bg-white/10 focus:outline-none transition-all text-sm"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="City *"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-white/5 rounded-xl text-white placeholder-white/40 focus:border-accent focus:bg-white/10 focus:outline-none transition-all text-sm"
                    />
                    <input
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-4 py-3 border border-white/10 bg-white/5 rounded-xl text-white placeholder-white/40 focus:border-accent focus:bg-white/10 focus:outline-none transition-all text-sm"
                    />
                  </div>

                  <input
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-white/10 bg-white/5 rounded-xl text-white placeholder-white/40 focus:border-accent focus:bg-white/10 focus:outline-none transition-all text-sm"
                  />

                  <button
                    onClick={placeOrder}
                    className="w-full bg-accent hover:bg-accent/80 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(2,169,247,0.3)] hover:shadow-[0_0_25px_rgba(2,169,247,0.5)] transition-all mt-4 tracking-wide"
                  >
                    CONFIRM ORDER
                  </button>
                </div>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
import { useState } from "react";
import { addToCart, getCart, getCartTotal } from "./utils/cart";
import { BiMinus, BiPlus } from "react-icons/bi";
import getFormattedPrice from "./utils/price-format";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setcart] = useState(getCart());

  return (
    <div
      className="min-h-screen relative flex flex-col items-center bg-secondary overflow-hidden py-12 lg:py-24 font-sans pb-32"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Background Elements */}
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
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z"
            fill="#d4f0fc"
          />
        </svg>
      </div>

      {/* Header & Content */}
      <div className="relative z-10 w-full flex justify-center items-center flex-col gap-6 px-4">
        
        {/* Header Title */}
        <div className="w-full max-w-[750px] mb-2 text-center sm:text-left">
          <h1 className="text-3xl font-black text-white">Your Cart</h1>
          <p className="text-white/50 text-sm">Review your items before checkout.</p>
        </div>

        {cart.map((cartItem, index) => {
          return (
            <div
              key={index}
              className="w-full max-w-[750px] bg-white/5 backdrop-blur-xl flex flex-col sm:grid sm:grid-cols-[160px_minmax(0,1fr)_auto] min-h-[140px] sm:min-h-[160px] rounded-3xl shadow-2xl overflow-hidden border border-white/10 group"
            >
              {/* Image */}
              <div className="w-full sm:w-[160px] h-[160px] bg-white/5 flex shrink-0 justify-center items-center p-4">
                <img
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
                  src={cartItem.product.image}
                  alt={cartItem.product.name}
                />
              </div>

              {/* Middle Section */}
              <div className="p-5 sm:p-6 flex flex-col justify-between gap-4 h-full">
                <div className="space-y-1">
                  <p className="text-white/40 text-xs tracking-widest uppercase font-bold">
                    ID: {cartItem.product.productID}
                  </p>
                  <h2 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
                    {cartItem.product.name}
                  </h2>
                </div>

                {/* Quantity Controls */}
                <div className="w-full sm:w-[180px] h-[40px] shrink-0 border border-white/20 rounded-full overflow-hidden flex bg-white/5 shadow-inner">
                  <button
                    onClick={() => {
                      addToCart(cartItem.product, -1);
                      setcart(getCart());
                    }}
                    className="flex-1 flex justify-center items-center text-xl text-white/70 hover:bg-accent hover:text-white transition-colors duration-200"
                    aria-label="Decrease Quantity"
                  >
                    <BiMinus />
                  </button>

                  <span className="flex-1 flex justify-center items-center text-lg font-bold text-white border-x border-white/20 bg-white/5">
                    {cartItem.qty}
                  </span>

                  <button
                    onClick={() => {
                      addToCart(cartItem.product, 1);
                      setcart(getCart());
                    }}
                    className="flex-1 flex justify-center items-center text-xl text-white/70 hover:bg-accent hover:text-white transition-colors duration-200"
                    aria-label="Increase Quantity"
                  >
                    <BiPlus />
                  </button>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex flex-row sm:flex-col justify-between sm:justify-end items-center sm:items-end p-5 sm:p-6 sm:pl-0 sm:gap-1 text-right h-full">
                <div className="text-left sm:text-right mb-0 sm:mb-2">
                  {cartItem.product.labelledPrice > cartItem.product.price && (
                    <span className="text-sm text-white/40 line-through block">
                      {getFormattedPrice(cartItem.product.labelledPrice)}
                    </span>
                  )}
                  <span className="text-sm font-bold text-accent block">
                    {getFormattedPrice(cartItem.product.price)}{" "}
                    <span className="text-white/40 text-xs font-normal tracking-wide uppercase">
                      each
                    </span>
                  </span>
                </div>

                <span className="text-xl sm:text-2xl text-white font-black">
                  {getFormattedPrice(cartItem.product.price * cartItem.qty)}
                </span>
              </div>
            </div>
          );
        })}

        {/* Bottom Summary */}
        <div className="sticky bottom-6 w-full max-w-[750px] mt-6 z-40">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-6 sm:px-8 py-5 border border-white/20">
            <Link
              state={cart}
              to="/checkout"
              className="w-full sm:w-auto text-center bg-accent hover:bg-accent/80 text-white font-black px-10 py-3.5 rounded-full transition-all shadow-lg shadow-accent/30 hover:scale-105"
            >
              CHECKOUT
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm font-bold uppercase tracking-widest">
                Total
              </span>
              <span
                className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #02a9f7 0%, #7de8ff 100%)",
                }}
              >
                {getFormattedPrice(getCartTotal(cart))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
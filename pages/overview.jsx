import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import LoadingAnimation from "../src/components/loadingAnimation";
import ImageSlideShow from "../src/components/imageSlideShow";
import getFormattedPrice from "./utils/price-format";
import { addToCart, getCart } from "./utils/cart";

export default function Overview() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  // Fetch product details using productID
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/products/" + params.productID)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch product details!");
      });
  }, []);

  return (
    <div
      className="min-h-screen relative flex justify-center items-center bg-secondary overflow-hidden py-2 py- font-sans pt-0"
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
      <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/10 blur-[60px] pointer-events-none" />

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-98">
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

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {product == null ? (
          <div className="flex justify-center py-20">
            <LoadingAnimation />
          </div>
        ) : (
          <div className="w-full flex flex-col lg:flex-row gap-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 lg:p-12">
            
            {/* Mobile Title */}
            <h1 className="text-3xl font-black text-white mb-4 lg:hidden">
              {product.name}
              <span>
                {product.altNames.map((altNames, index) => {
                  return (
                    <span key={index} className="text-white/50 font-semibold">
                      , {altNames}
                    </span>
                  );
                })}
              </span>
            </h1>

            {/* Image Section */}
            <div className="w-full lg:w-[50%] flex justify-center items-center">
              <ImageSlideShow images={product.images} />
            </div>

            {/* Details Section */}
            <div className="w-full lg:w-[50%] flex flex-col justify-center">
              
              {/* Desktop Title */}
              <h1 className="hidden lg:block text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                {product.name}
                <span>
                  {product.altNames.map((altNames, index) => {
                    return (
                      <span key={index} className="text-white/50 font-semibold text-2xl">
                        , {altNames}
                      </span>
                    );
                  })}
                </span>
              </h1>

              {/* Brand & model if available */}
              {(product.brand || product.model) && (
                <p className="text-lg font-bold text-accent mb-1">
                  <span>{product.brand || ""}</span>
                  <span> - </span>
                  <span>{product.model || ""}</span>
                </p>
              )}

              {/* Product ID */}
              <p className="text-xs text-white/40 uppercase tracking-widest mb-6">
                ID: {product.productID || ""}
              </p>

              {/* Price with Gradient */}
              <p
                className="text-4xl font-black text-transparent bg-clip-text mb-2"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #02a9f7 0%, #7de8ff 100%)",
                }}
              >
                {getFormattedPrice(product.price)}
              </p>

              {/* Labelled Price */}
              {product.labelledPrice && (
                <p className="text-lg text-white/40 line-through mb-6">
                  {getFormattedPrice(product.labelledPrice)}
                </p>
              )}

              {/* Description */}
              <p className="text-white/70 text-base leading-relaxed mb-8">
                {product.description || ""}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 items-center font-bold">
                <button
                  className="px-8 py-3.5 bg-accent hover:bg-accent/80 text-white rounded-full transition-all hover:scale-105 shadow-lg shadow-accent/30 cursor-pointer"
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success(product.name + " added to cart");
                  }}
                >
                  ADD TO CART
                </button>

                <Link
                  to="/checkout"
                  state={[
                    {
                      product: {
                        name: product.name,
                        price: product.price,
                        labelledPrice: product.labelledPrice,
                        image: product.images[0],
                        productID: product.productID,
                      },
                      qty: 1,
                    },
                  ]}
                  className="px-8 py-3.5 border border-white/25 hover:border-accent text-white/80 hover:text-white rounded-full transition-all cursor-pointer"
                >
                  BUY NOW
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
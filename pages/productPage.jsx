import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCart } from "./utils/cart";
import ProductCard from "../src/components/productCard";
import LoadingAnimation from "../src/components/loadingAnimation";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();

  // Get category from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");

    if (category) {
      setSearchQuery(category);
      setLoading(true);
    }
  }, [location.search]);

  // Fetch products from backend API
  useEffect(() => {
    let url = import.meta.env.VITE_API_URL + "/products/";

    if (searchQuery !== "") {
      url = import.meta.env.VITE_API_URL + "/products/search/" + searchQuery;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch products. Please try again!");
        setLoading(false);
      });
  }, [searchQuery, loading]);

  return (
    <div
      className="min-h-screen bg-secondary relative overflow-hidden font-sans pb-20"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(2,169,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(2,169,247,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glowing Orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/15 blur-[80px]" />
        <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/10 blur-[60px]" />
      </div>

      {/* Floating Search Bar */}
      <div className="w-full h-[80px] fixed top-[60px] z-50 bg-secondary/80 backdrop-blur-md flex justify-center items-center shadow-md border-b border-white/5 px-4">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full md:w-[40%] h-[45px] bg-primary/10 border border-white/20 text-white placeholder-white/50 rounded-full px-6 outline-none focus:border-accent transition-colors shadow-inner"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setLoading(true);
          }}
        />

        <button
          className="ml-4 px-6 py-2.5 bg-accent text-white rounded-full font-bold hover:bg-accent/80 hover:scale-105 transition-all shadow-lg shadow-accent/20 whitespace-nowrap"
          onClick={() => {
            setSearchQuery("");
            setLoading(true);
          }}
        >
          Get All Products
        </button>
      </div>

      {/* Products Grid */}
      <div className="relative z-10 flex justify-center items-center flex-wrap pt-[180px] gap-6 max-w-7xl mx-auto px-6">
        {loading && <LoadingAnimation />}

        {products.map((item) => (
          <ProductCard
            product={item}
            key={item.productID}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
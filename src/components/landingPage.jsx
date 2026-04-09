import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  MdOutlineShoppingCart,
  MdArrowForward,
  MdArrowBack,
  MdVerified,
  MdLocalShipping,
  MdHeadsetMic,
  MdSecurity,
  MdStar,
  MdStarBorder,
  MdArrowRightAlt,
  MdOutlineLaptop,
  MdOutlineMemory,
  MdOutlineMonitor,
  MdKeyboard,
} from "react-icons/md";
import { FiCpu, FiHardDrive, FiWifi, FiTrendingUp } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { addToCart } from "../../pages/utils/cart";
import toast from "react-hot-toast";


const StarRating = ({ rating = 4 }) =>
  Array.from({ length: 5 }).map((_, i) =>
    i < Math.round(rating) ? (
      <MdStar key={i} className="text-amber-400 text-sm" />
    ) : (
      <MdStarBorder key={i} className="text-amber-300 text-sm" />
    )
  );

const categoryIcons = {
  laptop: <MdOutlineLaptop size={28} />,
  processor: <FiCpu size={28} />,
  ram: <MdOutlineMemory size={28} />,
  monitor: <MdOutlineMonitor size={28} />,
  keyboard: <MdKeyboard size={28} />,
  storage: <FiHardDrive size={28} />,
  networking: <FiWifi size={28} />,
  default: <MdOutlineLaptop size={28} />,
};

const getCategoryIcon = (name = "") => {
  const lower = name.toLowerCase();
  for (const key of Object.keys(categoryIcons)) {
    if (lower.includes(key)) return categoryIcons[key];
  }
  return categoryIcons.default;
};
// Stat animation
function AnimatedStat({ value, label }) {
  const [count, setCount] = useState(0);

  // Smart regex to separate numbers from text (e.g., "12k+" -> target: 12, suffix: "k+")
  const target = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    let start = 0;
    const duration = 2000; // Animation duration in ms (2 seconds)
    const increment = target / (duration / 16); // Assuming 60 FPS

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div>
      <p className="text-3xl font-black text-accent">
        {count}{suffix}
      </p>
      <p className="text-white/50 text-sm mt-0.5">{label}</p>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[88vh] bg-secondary overflow-hidden flex items-center">
      {/* grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(2,169,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(2,169,247,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* glowing orb */}
      <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-accent/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* left */}
        <div className="flex-1 text-white">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <HiOutlineSparkles />
            Sri Lanka&apos;s Tech Destination
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Powering Your{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #02a9f7 0%, #7de8ff 100%)" }}>
              Digital World
            </span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
            From high-performance laptops to cutting-edge peripherals<br/>
            We bring you premium technology at prices built for you.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 bg-accent hover:bg-accent/80 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105"
            >
              Shop Now
              <MdArrowRightAlt className="group-hover:translate-x-1 transition-transform duration-200" size={22} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-white/25 hover:border-accent text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>

          {/* stats */}
          <div className="grid grid-cols-3 gap-6 mt-8 border-t border-white/10 pt-10">
            {[
              { label: "Products", value: "500+" },
              { label: "Happy Clients", value: "12k+" },
              { label: "Brands", value: "40+" },
            ].map((s) => (
              <AnimatedStat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/logo3.png"
            alt="Premium Tech"
            className="w-[300px] lg:w-[450px] object-contain drop-shadow-2xl animate-pulse"
            style={{ animationDuration: '3s' }}
          />
        </div>
      </div>

      {/* wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] pointer-events-none">
        <style>
          {`
            @keyframes wave-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>
        
        {/* Wave - Layer 1 */}
        <div 
          className="absolute bottom-0 flex w-[200%] opacity-40"
          style={{ animation: 'wave-scroll 25s linear infinite' }}
        >
          <svg className="w-full h-[70px]" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#aee2fa" />
          </svg>
          <svg className="w-full h-[70px]" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#aee2fa" />
          </svg>
        </div>

        {/* Wave - Layer 2 */}
        <div 
          className="relative flex w-[200%]"
          style={{ animation: 'wave-scroll 15s linear infinite' }}
        >
          <svg className="w-full h-[60px]" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#d4f0fc" />
          </svg>
          <svg className="w-full h-[60px]" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#d4f0fc" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// Product Slider
function ProductSlider({ title, subtitle, products, loading }) {
  const [idx, setIdx] = useState(0);
  const visible = 4;
  const max = Math.max(0, products.length - visible);

  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(max, i + 1));

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-1">{subtitle}</p>
            <h2
              className="text-3xl lg:text-4xl font-black text-secondary"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              disabled={idx === 0}
              className="w-10 h-10 rounded-full border-2 border-secondary/30 flex items-center justify-center text-secondary hover:border-accent hover:text-accent disabled:opacity-30 transition-all"
            >
              <MdArrowBack size={18} />
            </button>
            <button
              onClick={next}
              disabled={idx >= max}
              className="w-10 h-10 rounded-full border-2 border-secondary/30 flex items-center justify-center text-secondary hover:border-accent hover:text-accent disabled:opacity-30 transition-all"
            >
              <MdArrowForward size={18} />
            </button>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-1 text-accent font-semibold text-sm hover:underline ml-2"
            >
              View All <MdArrowRightAlt size={18} />
            </Link>
          </div>
        </div>

        {/* cards */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(-${idx} * (100% / ${visible}) - ${idx} * 20px / ${visible}))` }}
            >
              {products.map((product) => (
                <ProductCard key={product.productID} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 border border-transparent hover:border-accent/20"
      style={{ minWidth: "calc(25% - 15px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* image */}
      <div className="relative bg-primary/50 h-48 flex items-center justify-center overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-40 w-full object-contain transition-transform duration-500 group-hover:scale-110 p-4"
          />
        ) : (
          <div className="text-accent/40 flex flex-col items-center gap-2">
            <MdOutlineLaptop size={56} />
          </div>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-3 left-3 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Low Stock
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Out of Stock
          </span>
        )}
        <button
          onClick={() =>{
            addToCart(product, 1);
            toast.success("Added to cart");
          }}
          className="absolute bottom-3 right-3 bg-accent text-white rounded-full p-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md hover:bg-secondary"
        >
          <MdOutlineShoppingCart size={18} />
        </button>
      </div>

      {/* info */}
      <div className="p-4">
        <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1 truncate">
          {product.category || "Computer"}
        </p>
        <h3 className="text-secondary font-bold text-sm leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <StarRating rating={product.rating || 4} />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-secondary font-black text-lg">
            Rs. {Number(product.price).toLocaleString()}
          </p>
          <Link
            to={`/overview/${product.productID}`}
            className="text-xs font-semibold text-accent hover:underline"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

// Categories
const CATEGORIES = [
  { label: "Laptops", key: "laptop", color: "from-blue-50 to-blue-100", accent: "text-blue-600", border: "border-blue-200" },
  { label: "Processors", key: "processor", color: "from-purple-50 to-purple-100", accent: "text-purple-600", border: "border-purple-200" },
  { label: "Memory", key: "ram", color: "from-teal-50 to-teal-100", accent: "text-teal-600", border: "border-teal-200" },
  { label: "Monitors", key: "monitor", color: "from-rose-50 to-rose-100", accent: "text-rose-600", border: "border-rose-200" },
  { label: "Keyboards", key: "keyboard", color: "from-amber-50 to-amber-100", accent: "text-amber-600", border: "border-amber-200" },
  { label: "Storage", key: "storage", color: "from-green-50 to-green-100", accent: "text-green-600", border: "border-green-200" },
];

function CategoriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">Browse by Category</p>
          <h2 className="text-3xl lg:text-4xl font-black text-secondary" style={{ fontFamily: "'Sora', sans-serif" }}>
            Find What You Need
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              to={`/products?category=${cat.key}`}
              key={cat.key}
              className={`group flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br ${cat.color} border ${cat.border} hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
            >
              <span className={`${cat.accent} transition-transform duration-200 group-hover:scale-110`}>
                {getCategoryIcon(cat.key)}
              </span>
              <p className="text-sm font-bold text-secondary">{cat.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Trust Bar 
function TrustBar() {
  const features = [
    { icon: <MdLocalShipping size={28} />, title: "Free Delivery", desc: "On orders over Rs. 15,000" },
    { icon: <MdVerified size={28} />, title: "Genuine Products", desc: "100% authentic guarantee" },
    { icon: <MdHeadsetMic size={28} />, title: "Expert Support", desc: "Mon - Sat, 9AM - 7PM" },
    { icon: <MdSecurity size={28} />, title: "Secure Payments", desc: "SSL- encrypted checkout" },
  ];
  return (
    <section className="py-14 bg-secondary sticky top-0 z-40 sm:hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
              {f.icon}
            </div>
            <div>
              <p className="text-white font-bold">{f.title}</p>
              <p className="text-white/50 text-sm">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Banner CTA 
function BannerCTA() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="relative bg-secondary rounded-3xl overflow-hidden p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-10">
          {/* bg grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(2,169,247,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(2,169,247,0.8) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-accent/15 blur-[60px]" />

          <div className="flex-1 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent text-xs font-bold px-3 py-1 rounded-full mb-4">
              <FiTrendingUp />
              Limited Time Offer
            </div>
            <h2
              className="text-3xl lg:text-5xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Upgrade Your Setup<br />
              <span className="text-accent">Save Up to 25%</span>
            </h2>
            <p className="text-white/60 text-base max-w-md">
              Shop our latest arrivals and get exclusive deals on top brands. Limited stock available.
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/80 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-accent/30"
            >
              Shop Deals <MdArrowRightAlt size={20} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-accent text-white/80 hover:text-white font-semibold px-8 py-4 rounded-full transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials

const TESTIMONIALS = [
  { name: "Kavindi Perera", loc: "Colombo", text: "Amazing experience! Got my laptop within 2 days and it was exactly as described. Will definitely shop again.", rating: 5 },
  { name: "Ruwan Silva", loc: "Kandy", text: "Best prices in Sri Lanka for computer parts. The team is knowledgeable and helpful.", rating: 5 },
  { name: "Amali Fernando", loc: "Galle", text: "Ordered a monitor and keyboard bundle. Great packaging, arrived perfectly. Love NP Computers!", rating: 4 },
];

function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">What Customers Say</p>
          <h2 className="text-3xl lg:text-4xl font-black text-secondary" style={{ fontFamily: "'Sora', sans-serif" }}>
            Trusted by Thousands
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-primary/60 rounded-2xl p-6 border border-accent/10 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 mb-4">
                <StarRating rating={t.rating} />
              </div>
              <p className="text-secondary/80 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm">{t.name}</p>
                  <p className="text-secondary/50 text-xs">{t.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="py-16 bg-primary border-t border-accent/10">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">Stay Updated</p>
        <h2 className="text-2xl lg:text-3xl font-black text-secondary mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
          Get Deals Delivered to Your Inbox
        </h2>
        <p className="text-secondary/60 text-sm mb-6">Subscribe and never miss a flash sale or new arrival.</p>

        {sent ? (
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 font-semibold px-6 py-3 rounded-full">
            <MdVerified size={18} /> You&apos;re subscribed — thanks!
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full border border-accent/30 bg-white outline-none focus:border-accent text-secondary text-sm"
            />
            <button
              onClick={() => email && setSent(true)}
              className="px-6 py-3 bg-accent hover:bg-secondary text-white font-bold rounded-full transition-colors text-sm"
            >
              Subscribe
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Main LandingPage
export default function LandingPage() {
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingNew, setLoadingNew] = useState(true);

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL;

    axios
      .get(`${base}/products/`)
      .then((res) => {
        const all = res.data || [];
        // featured: top-rated / first 12
        setFeatured(all.slice(0, 12));
        // new arrivals: last 8 items (most recently added)
        setNewArrivals([...all].reverse().slice(0, 8));
      })
      .catch(() => {})
      .finally(() => {
        setLoadingFeatured(false);
        setLoadingNew(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-primary font-sans">
      {/* Google font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <HeroSection />
      <TrustBar />
      <CategoriesSection />
      <ProductSlider
        title="Featured Products"
        subtitle="Top Picks"
        products={featured}
        loading={loadingFeatured}
      />
      <BannerCTA />
      <ProductSlider
        title="New Arrivals"
        subtitle="Just Landed"
        products={newArrivals}
        loading={loadingNew}
      />
      <Testimonials />
      <Newsletter />

    </div>
  );
}
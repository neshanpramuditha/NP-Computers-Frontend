import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";

export default function NotFound() {
  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center bg-secondary overflow-hidden py-12 font-sans"
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
      <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/10 blur-[60px] pointer-events-none" />

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

      {/* 404 Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
        
        {/* Massive Gradient 404 */}
        <h1
          className="text-[120px] sm:text-[180px] font-black leading-none text-transparent bg-clip-text drop-shadow-2xl mb-4 select-none"
          style={{
            backgroundImage: "linear-gradient(135deg, #02a9f7 0%, #7de8ff 100%)",
          }}
        >
          404
        </h1>

        {/* Glassmorphism Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-lg w-full flex flex-col items-center animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Page Not Found
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/80 text-white font-black px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(2,169,247,0.3)] hover:shadow-[0_0_25px_rgba(2,169,247,0.5)] hover:scale-105 tracking-wide"
          >
            <MdHome size={24} />
            BACK TO HOME
          </Link>
        </div>
        
      </div>
    </div>
  );
}
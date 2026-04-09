import { Link } from "react-router-dom";
import {
  MdArrowRightAlt,
  MdVerified,
  MdLocalShipping,
  MdHeadsetMic,
  MdSecurity,
  MdOutlineLaptop,
  MdGroups,
  MdEmojiEvents,
  MdHandshake,
  MdStar,
} from "react-icons/md";
import { FiTarget, FiEye, FiHeart, FiTrendingUp } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

// Team Members

const TEAM = [
  {
    name: "Neshan Pramuditha",
    role: "Founder & CEO",
    initials: "NP",
    color: "bg-accent/20 text-accent",
    bio: "10+ years in the Sri Lankan tech industry. Passionate about making premium technology accessible to everyone.",
  },
  {
    name: "Malshi Gamage",
    role: "Head of Operations",
    initials: "SM",
    color: "bg-purple-100 text-purple-600",
    bio: "Ensures every order is processed smoothly and every customer receives their products on time.",
  },
  {
    name: "Ravindu Jayasinghe",
    role: "Technical Specialist",
    initials: "RJ",
    color: "bg-teal-100 text-teal-600",
    bio: "Our go-to expert for product recommendations, compatibility checks, and technical support.",
  },
  {
    name: "Dilini Wijeratne",
    role: "Customer Success",
    initials: "DW",
    color: "bg-rose-100 text-rose-600",
    bio: "Dedicated to ensuring every customer leaves with a smile. Available Mon–Sat for support.",
  },
];

// Milestones

const MILESTONES = [
  { year: "2015", title: "Founded", desc: "NP Computers opens its first store in Colombo." },
  { year: "2018", title: "Online Store", desc: "Launched our e-commerce platform to serve customers island-wide." },
  { year: "2020", title: "500+ Products", desc: "Expanded our catalog to over 500 products across all categories." },
  { year: "2023", title: "12,000+ Customers", desc: "Reached a milestone of over 12,000 happy customers across Sri Lanka." },
];

// Values

const VALUES = [
  {
    icon: <FiTarget size={26} />,
    title: "Our Mission",
    desc: "To make world-class technology accessible and affordable for every Sri Lankan - whether you're a student, a gamer, or a business professional.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: <FiEye size={26} />,
    title: "Our Vision",
    desc: "To be Sri Lanka's most trusted technology partner, known for genuine products, expert advice, and outstanding after-sales support.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <FiHeart size={26} />,
    title: "Our Values",
    desc: "Integrity in every transaction. Transparency in pricing. Empathy in every customer interaction. These aren't just words - they're how we operate.",
    color: "bg-rose-100 text-rose-600",
  },
];

// Stats

const STATS = [
  { value: "500+", label: "Products", icon: <MdOutlineLaptop size={22} /> },
  { value: "12k+", label: "Happy Customers", icon: <MdGroups size={22} /> },
  { value: "40+", label: "Brands", icon: <MdEmojiEvents size={22} /> },
  { value: "9yrs", label: "Experience", icon: <FiTrendingUp size={22} /> },
];

// Trust Features

const TRUST = [
  { icon: <MdLocalShipping size={26} />, title: "Free Delivery", desc: "On orders over Rs. 15,000" },
  { icon: <MdVerified size={26} />, title: "Genuine Products", desc: "100% authentic guarantee" },
  { icon: <MdHeadsetMic size={26} />, title: "Expert Support", desc: "Mon-Sat, 9AM-7PM" },
  { icon: <MdSecurity size={26} />, title: "Secure Payments", desc: "SSL-encrypted checkout" },
];

// Page

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary" style={{ fontFamily: "'Sora', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Hero */}
      <section className="relative bg-secondary overflow-hidden pt-28 pb-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(2,169,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(2,169,247,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/15 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/10 blur-[60px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <HiOutlineSparkles />
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Powering Sri Lanka's{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #02a9f7 0%, #7de8ff 100%)" }}
            >
              Digital Future
            </span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Since 2015, NP Computers has been the go-to destination for premium technology in Sri Lanka.
            We believe everyone deserves access to the tools that power modern life.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/80 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-accent/30"
          >
            Explore Products <MdArrowRightAlt size={20} />
          </Link>
        </div>

        {/* wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#d4f0fc" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl p-6 flex flex-col items-center text-center border border-accent/10 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-3">
                  {s.icon}
                </div>
                <p className="text-3xl font-black text-secondary">{s.value}</p>
                <p className="text-secondary/50 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">What Drives Us</p>
            <h2 className="text-3xl lg:text-4xl font-black text-secondary">Mission, Vision & Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-primary/50 rounded-2xl p-8 border border-accent/10 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${v.color}`}>
                  {v.icon}
                </div>
                <h3 className="text-xl font-black text-secondary mb-3">{v.title}</h3>
                <p className="text-secondary/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">How We Got Here</p>
            <h2 className="text-3xl lg:text-4xl font-black text-secondary">Our Journey</h2>
          </div>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-px bg-accent/20 -translate-x-1/2" />

            <div className="flex flex-col gap-10">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-6 lg:gap-0 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* dot */}
                  <div className="absolute left-5 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-primary z-10 mt-1.5" />

                  {/* card */}
                  <div className={`ml-14 lg:ml-0 lg:w-[45%] ${i % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}>
                    <div className="bg-white rounded-2xl p-6 border border-accent/10 hover:shadow-md transition-shadow">
                      <span className="inline-block bg-accent/10 text-accent text-xs font-black px-3 py-1 rounded-full mb-3">
                        {m.year}
                      </span>
                      <h3 className="text-lg font-black text-secondary mb-1">{m.title}</h3>
                      <p className="text-secondary/60 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">The People Behind NP</p>
            <h2 className="text-3xl lg:text-4xl font-black text-secondary">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="group bg-primary/50 rounded-2xl p-6 border border-accent/10 hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-4 ${member.color}`}
                >
                  {member.initials}
                </div>
                <h3 className="font-black text-secondary text-base">{member.name}</h3>
                <p className="text-accent text-xs font-bold uppercase tracking-wider mt-0.5 mb-3">{member.role}</p>
                <p className="text-secondary/60 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-14 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST.map((f) => (
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

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent text-xs font-bold px-3 py-1 rounded-full mb-5">
            <MdHandshake size={14} /> Let's Work Together
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-secondary mb-4">
            Ready to Upgrade Your Tech?
          </h2>
          <p className="text-secondary/60 mb-8 text-base leading-relaxed">
            Browse our full catalog or reach out to our team<br/>
            we're here to help you find the perfect setup.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-accent hover:bg-secondary text-white font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-accent/20"
            >
              Shop Now <MdArrowRightAlt size={20} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-secondary/20 hover:border-accent text-secondary hover:text-accent font-bold px-8 py-3.5 rounded-full transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
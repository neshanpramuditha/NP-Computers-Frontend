import { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import {
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdAccessTime,
  MdSend,
  MdVerified,
  MdCheckCircle,
} from "react-icons/md";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

// Contact Info
const INFO = [
  {
    icon: <MdLocationOn size={24} />,
    title: "Visit Us",
    lines: ["123 Main Street, Bibile", "Uva Province, Sri Lanka"],
    color: "bg-accent/10 text-accent",
  },
  {
    icon: <MdPhone size={24} />,
    title: "Call Us",
    lines: ["+94 71 245 2135", "+94 76 718 0351"],
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <MdEmail size={24} />,
    title: "Email Us",
    lines: ["neshanpramu2@gmail.com", "sales@npcomputers.lk"],
    color: "bg-teal-100 text-teal-600",
  },
  {
    icon: <MdAccessTime size={24} />,
    title: "Working Hours",
    lines: ["Mon - Fri: 9:00 AM - 7:00 PM", "Saturday: 9:00 AM - 5:00 PM"],
    color: "bg-amber-100 text-amber-600",
  },
];

const SOCIALS = [
  { icon: <FiFacebook size={20} />, label: "Facebook", href: "#" },
  { icon: <FiInstagram size={20} />, label: "Instagram", href: "#" },
  { icon: <FiTwitter size={20} />, label: "Twitter / X", href: "#" },
  { icon: <FiYoutube size={20} />, label: "YouTube", href: "#" },
];

const SUBJECTS = [
  "Product Inquiry",
  "Order Support",
  "Technical Help",
  "Bulk / Business Order",
  "Warranty Claim",
  "Other",
];

// Page Component
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // handleSubmit function
  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const AUTO_REPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Send message to your email
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone || "N/A",
          subject: form.subject || "No Subject",
          message: form.message,
        },
        PUBLIC_KEY
      );

      // Auto reply to User
      await emailjs.send(
        SERVICE_ID,
        AUTO_REPLY_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );

      setSent(true);
      toast.success("Message sent! We'll get back to you soon.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-primary"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Hero Section */}
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

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-16 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <HiOutlineSparkles />
            We'd Love to Hear From You
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Get in{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #02a9f7 0%, #7de8ff 100%)",
              }}
            >
              Touch
            </span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
            Have a question, need advice on a product,
            <br />
            or want to place a bulk order?
            <br />
            Our team is ready to help - just reach out.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z"
              fill="#d4f0fc"
            />
          </svg>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INFO.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-accent/10 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}
                >
                  {item.icon}
                </div>
                <h3 className="font-black text-secondary text-base mb-2">
                  {item.title}
                </h3>
                {item.lines.map((line) => (
                  <p key={line} className="text-secondary/60 text-sm leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-6 pb-20 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-8 lg:p-10 border border-accent/10 shadow-sm">
              <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">
                Send a Message
              </p>
              <h2 className="text-2xl lg:text-3xl font-black text-secondary mb-8">
                How can we help you?
              </h2>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <MdCheckCircle size={36} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-black text-secondary">Message Sent!</h3>
                  <p className="text-secondary/60 text-sm max-w-xs">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-2 text-accent font-bold text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {/* Form Rows */}
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-secondary/60 uppercase tracking-wider">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Kamal Perera"
                        className="h-12 px-4 rounded-xl border border-secondary/15 bg-primary/40 text-secondary text-sm outline-none focus:border-accent focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-secondary/60 uppercase tracking-wider">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="kamal@example.com"
                        className="h-12 px-4 rounded-xl border border-secondary/15 bg-primary/40 text-secondary text-sm outline-none focus:border-accent focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-secondary/60 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="+94 77 000 0000"
                        className="h-12 px-4 rounded-xl border border-secondary/15 bg-primary/40 text-secondary text-sm outline-none focus:border-accent focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-secondary/60 uppercase tracking-wider">
                        Subject
                      </label>
                      <select
                        value={form.subject}
                        onChange={set("subject")}
                        className="h-12 px-4 rounded-xl border border-secondary/15 bg-primary/40 text-secondary text-sm outline-none focus:border-accent focus:bg-white transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select a subject</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-secondary/60 uppercase tracking-wider">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      rows={5}
                      placeholder="Tell us what you need, we're happy to help..."
                      className="px-4 py-3 rounded-xl border border-secondary/15 bg-primary/40 text-secondary text-sm outline-none focus:border-accent focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="group self-start inline-flex items-center gap-2 bg-accent hover:bg-secondary text-white font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-accent/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <MdSend
                          className="group-hover:translate-x-1 transition-transform"
                          size={18}
                        />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Right Panel */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Map embed */}
              <div className="bg-white rounded-3xl overflow-hidden border border-accent/10 shadow-sm flex-1 min-h-[260px]">
                <iframe
                  title="NP Computers Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.6989761934497!2d81.22540839999999!3d7.160757599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4f3000de78f55%3A0x20be28fecd6e769b!2zQmliaWxlIHRvd24sIOC2tuC3kuC2tuC3kuC2vSDgtrHgtpzgtrvgtrou!5e0!3m2!1sen!2slk!4v1775620327927!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "260px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-3xl p-6 border border-accent/10 shadow-sm">
                <h3 className="font-black text-secondary text-base mb-1">
                  Follow Us
                </h3>
                <p className="text-secondary/50 text-xs mb-4">
                  Stay connected for deals & updates
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-secondary/10 bg-primary/40 hover:border-accent hover:bg-accent/5 text-secondary/70 hover:text-accent transition-all text-sm font-semibold"
                    >
                      {s.icon}
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick guarantee */}
              <div className="bg-secondary rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MdVerified className="text-accent" size={20} />
                  <h3 className="text-white font-black text-sm">Our Promise</h3>
                </div>
                <p className="text-white/60 text-xs leading-relaxed">
                  We respond to all inquiries within 24 hours. For urgent
                  matters, give us a call during working hours and our team will
                  assist you immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ strip */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-10">
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">
              Quick Answers
            </p>
            <h2 className="text-2xl lg:text-3xl font-black text-secondary">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                q: "Do you offer island-wide delivery?",
                a: "Yes! We deliver to all 25 districts across Sri Lanka. Free delivery on orders over LKR 20,000.",
              },
              {
                q: "Can I track my order?",
                a: "Absolutely. Once your order is confirmed, you'll receive a tracking number via SMS/email.",
              },
              {
                q: "Do you accept bulk orders?",
                a: "Yes, we cater to bulk & corporate orders with special pricing. Contact us directly for inquiries.",
              },
              {
                q: "Can I return a product if damaged?",
                a: "Definitely. We have a 7-day return policy for damaged items. Our team will guide you step by step.",
              },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-secondary/10 rounded-xl hover:shadow-lg transition-all">
                <h4 className="font-black text-secondary text-sm mb-2">{item.q}</h4>
                <p className="text-secondary/60 text-xs">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
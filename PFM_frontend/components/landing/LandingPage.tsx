import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

interface LandingPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const features = [
  { title: "Track Expenses", desc: "Easily monitor your daily and monthly expenses." },
  { title: "Set Budgets", desc: "Stay on top of your finances by setting smart budgets." },
  { title: "View Reports", desc: "Visualize your spending with clean analytics." },
  { title: "Sync Accounts", desc: "Connect multiple bank accounts securely." },
  { title: "Smart Insights", desc: "AI-driven insights to help you save more." },
  { title: "Secure & Private", desc: "Your data stays safe with end-to-end encryption." },
];

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onSignup }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-poppins text-white overflow-hidden">
      {/* ====== HERO SECTION (FULL SCREEN) ====== */}
      <div
        id="home"
        className="relative min-h-screen bg-gradient-to-br from-[#0f4ba3] to-[#092f63] flex flex-col"
      >
        {/* Background dots */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Floating Circles */}
        <div className="absolute top-[15%] left-[10%] w-[100px] h-[100px] bg-white/10 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-[40%] right-[15%] w-[60px] h-[60px] bg-white/10 rounded-full blur-sm animate-pulse"></div>

        {/* ====== NAVBAR ====== */}
        <header className="z-10 flex justify-between items-center px-10 py-6 sticky top-0 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white">FinancePal</h1>

          <nav className="flex items-center space-x-8">
            <button onClick={() => scrollToSection("home")} className="hover:text-[#ffe35a] transition">
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-[#ffe35a] transition">
              About Us
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-[#ffe35a] transition">
              Contact Us
            </button>
          </nav>

          <div className="space-x-4">
            <Button
              onClick={onLogin}
              variant="outline"
              className="border-white text-white hover:bg-white/20"
            >
              Login
            </Button>
            <Button
              onClick={onSignup}
              className="bg-[#ffe35a] text-[#0f4ba3] hover:bg-[#fff06b]"
            >
              Sign Up
            </Button>
          </div>
        </header>

        {/* ====== HERO CONTENT ====== */}
        <motion.section
          className="relative z-10 flex flex-col items-center justify-center text-center flex-grow px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Take Control of Your <span className="text-[#ffe35a]">Finances</span>
          </h2>
          <p className="text-[#cdd6f3] text-lg max-w-2xl mb-10">
            Manage your money smarter with insights, tracking, and reports — all in one beautiful dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={onSignup}
              className="bg-[#ffe35a] text-[#0f4ba3] rounded-full px-8 py-3 font-semibold hover:bg-[#fff06b] transition"
            >
              Get Started
            </Button>
            <Button
              onClick={onLogin}
              variant="outline"
              className="border-2 border-white text-white rounded-full px-8 py-3 font-semibold hover:bg-white/20 transition"
            >
              Login
            </Button>
          </div>
        </motion.section>
      </div>

      {/* ====== ABOUT US + FEATURES SECTION ====== */}
      <section id="about" className="bg-white text-[#0f4ba3] py-20 px-6 text-center">
        {/* About FinancePal */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-4xl font-bold mb-6">About FinancePal</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            FinancePal is your trusted partner in smart money management. Our mission is to help you
            gain financial clarity through intuitive tools that track your spending, plan your budgets,
            and generate actionable insights. Whether you're a student managing expenses or a professional
            aiming for smarter savings, FinancePal empowers you to stay in control with ease and confidence.
          </p>
        </div>

        {/* Why Choose Us */}
        <h3 className="text-3xl font-bold mb-12">Why Choose FinancePal?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#f5f8ff] rounded-2xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition"
            >
              <div className="flex items-center justify-center w-[70px] h-[70px] bg-[#0f4ba3] text-white rounded-full mx-auto mb-4 text-xl font-bold">
                {feature.title.charAt(0)}
              </div>
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====== CONTACT SECTION ====== */}
      <section
        id="contact"
        className="bg-[#f0f4ff] text-[#0f4ba3] py-20 text-center px-6"
      >
        <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
        <p className="text-gray-700 max-w-xl mx-auto mb-8">
          Have questions or feedback? Reach out to us and we'll get back to you as soon as possible.
        </p>
        <Button className="bg-[#0f4ba3] text-white hover:bg-[#092f63] px-8 py-3 rounded-full">
          Contact Us
        </Button>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="bg-[#0f4ba3] text-white text-center py-6">
        <p>© {new Date().getFullYear()} FinancePal — Smart Finance Management</p>
      </footer>
    </div>
  );
};

export default LandingPage;

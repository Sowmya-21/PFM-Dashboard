import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import {
  Wallet,
  Target,
  BarChart3,
  Link,
  Lightbulb,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  PieChart,
} from "lucide-react";

interface LandingPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const features = [
  { title: "Track Expenses", desc: "Easily monitor your daily and monthly expenses.", icon: Wallet },
  { title: "Set Budgets", desc: "Stay on top of your finances by setting smart budgets.", icon: Target },
  { title: "View Reports", desc: "Visualize your spending with clean analytics.", icon: BarChart3 },
  { title: "Sync Accounts", desc: "Connect multiple bank accounts securely.", icon: Link },
  { title: "Smart Insights", desc: "AI-driven insights to help you save more.", icon: Lightbulb },
  { title: "Secure & Private", desc: "Your data stays safe with end-to-end encryption.", icon: ShieldCheck },
];

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onSignup }) => {
  const [scrollOpacity, setScrollOpacity] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 300; // Distance to scroll before fully opaque
      const opacity = Math.min(scrollPosition / maxScroll, 1);
      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-poppins text-white overflow-hidden">
      {/* ====== NAVBAR ====== */}
      <header 
  className="fixed top-0 left-0 right-0 z-50 w-full flex justify-between items-center px-10 py-6 transition-all duration-300"
  style={{
    backgroundColor: `rgba(15, 75, 163, ${scrollOpacity})`,
    backdropFilter: scrollOpacity < 0.9 ? 'blur(8px)' : 'none',
    boxShadow: scrollOpacity > 0.5 ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
  }}
>
  <h1 className="text-2xl font-bold text-white">FinancePal</h1>

  <div className="flex items-center space-x-8">
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

    <div className="flex items-center space-x-4">
       <Button onClick={onSignup} className="bg-[#ffe35a] text-[#0f4ba3] hover:bg-[#fff06b]">
        Sign Up
      </Button>
      
      <Button onClick={onLogin} className="bg-[#ffe35a] text-[#0f4ba3] hover:bg-[#fff06b]">
        Login
      </Button>
     
    </div>
  </div>
</header>

      {/* ====== HERO SECTION ====== */}
      <div
        id="home"
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#0a2e87] via-[#104fc8] to-[#02143d]"
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-pulse"></div>

        {/* Floating icons (parallax feel) */}
        <motion.div
          className="absolute top-[20%] left-[10%] opacity-40"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <DollarSign size={48} />
        </motion.div>

        <motion.div
          className="absolute bottom-[15%] right-[10%] opacity-30"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <PieChart size={50} />
        </motion.div>

        <motion.div
          className="absolute top-[40%] right-[25%] opacity-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <TrendingUp size={60} />
        </motion.div>

        {/* ====== HERO CONTENT ====== */}
        <motion.section
          className="relative z-10 flex flex-col items-center justify-center text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-[#ffe35a] to-white bg-clip-text text-transparent drop-shadow-lg">
           FinancePal <br /> Make Every Expense Count 
          </h2>
          <p className="text-[#e0e8ff] text-lg max-w-4xl mb-10 whitespace-nowrap">
  Smarter money management starts here — track, analyze, and plan effortlessly with FinancePal.
</p>

          <div className="flex flex-wrap justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                onClick={onSignup}
                className="bg-[#ffe35a] text-[#0f4ba3] rounded-full w-48 h-14 font-semibold hover:bg-[#fff06b] shadow-lg hover:shadow-2xl transition"
              >
                Get Started
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                onClick={onLogin}
                variant="outline"
                className="border-2 border-white text-white rounded-full w-48 h-14 font-semibold hover:bg-white/20 shadow-lg transition"
              >
                Login
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* ====== ABOUT US SECTION ====== */}
      <section id="about" className="bg-white text-[#0f4ba3] py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-4xl font-bold mb-6">About FinancePal</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            FinancePal is your trusted companion for smarter money management. Our mission is to make financial
            tracking simple, intuitive, and effective. We help you monitor spending, plan budgets, and get actionable
            insights to reach your goals — all in one secure platform.
          </p>
        </div>

        <h3 className="text-3xl font-bold mb-12">Why Choose FinancePal?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#f5f8ff] rounded-2xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition"
              >
                <div className="flex items-center justify-center w-[70px] h-[70px] bg-[#0f4ba3] text-white rounded-full mx-auto mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ====== CONTACT SECTION ====== */}
      <section id="contact" className="bg-[#f0f4ff] text-[#0f4ba3] py-20 text-center px-6">
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
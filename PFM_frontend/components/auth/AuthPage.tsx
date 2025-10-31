import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface Props {
  switchToSignup: () => void;
}

const AuthPage: React.FC<Props> = ({ switchToSignup }) => {
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

     if (res.ok) {
  login(data.token);
  if (data.username) {
    localStorage.setItem("username", data.username);
  }
  alert("Login successful!");
} else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex w-[900px] h-[600px] max-w-6xl rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800">
        {/* Left Side - Welcome Panel */}
        <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-gradient-to-br from-[#0A2E87] to-[#032E73] text-white p-10 animate-slideInLeft">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center text-white/90 mb-6">
            To keep connected with us, please login with your personal info.
          </p>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex w-full md:w-1/2 flex-col justify-center p-10 animate-slideInRight">
          <h2 className="text-3xl font-bold text-center text-[#0A2E87] dark:text-[#0A2E87] mb-6">
            Sign In
          </h2>

          <div className="flex justify-center gap-4 mb-4">
            <button className="border border-gray-300 dark:border-gray-600 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <i className="fab fa-facebook-f text-gray-600 dark:text-gray-300"></i>
            </button>
            <button className="border border-gray-300 dark:border-gray-600 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <i className="fab fa-google text-gray-600 dark:text-gray-300"></i>
            </button>
            <button className="border border-gray-300 dark:border-gray-600 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <i className="fab fa-linkedin-in text-gray-600 dark:text-gray-300"></i>
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <Input id="email" label="Email address" type="email" required />
            <Input id="password" label="Password" type="password" required />
            <Button
              type="submit"
              className="w-full bg-[#0A2E87] hover:bg-[#032E73] text-white rounded-full py-3 transition duration-300 font-semibold"
            >
              SIGN IN
            </Button>
          </form>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-300 text-sm">
            Don't have an account?{' '}
            <button
              onClick={switchToSignup}
              className="text-[#0A2E87] hover:text-[#032E73] font-semibold"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;

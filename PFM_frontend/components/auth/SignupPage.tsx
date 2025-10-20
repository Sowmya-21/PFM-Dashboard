import React from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface Props {
  switchToLogin: () => void;
}

const SignupPage: React.FC<Props> = ({ switchToLogin }) => {
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please login now.");
        switchToLogin(); // switch to login after success
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white dark:bg-gray-800 p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create an account
        </h2>
        <form className="space-y-6" onSubmit={handleSignup}>
          <Input id="username" label="Username" type="text" required />
          <Input id="email" label="Email address" type="email" required />
          <Input id="password" label="Password" type="password" required />
          <Button type="submit" className="w-full">Sign up</Button>
        </form>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <button className="text-blue-500 underline" onClick={switchToLogin}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

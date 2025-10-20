import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface Props {
  switchToSignup: () => void;
}

const AuthPage: React.FC<Props> = ({ switchToSignup }) => {
  const { login } = useAuth();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(); // you can later connect to backend login API
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white dark:bg-gray-800 p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <Input id="email" label="Email address" type="email" required />
          <Input id="password" label="Password" type="password" required />
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Don't have an account?{' '}
          <button className="text-blue-500 underline" onClick={switchToSignup}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

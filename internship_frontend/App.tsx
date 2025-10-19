import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import AuthPage from './components/auth/AuthPage';
import SignupPage from './components/auth/SignupPage';
import Layout from './components/layout/Layout';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showSignup, setShowSignup] = useState(true); // default: Sign-Up first

  if (isAuthenticated) return <Layout />;

  return showSignup ? (
    <SignupPage switchToLogin={() => setShowSignup(false)} />
  ) : (
    <AuthPage switchToSignup={() => setShowSignup(true)} />
  );
};

export default App;

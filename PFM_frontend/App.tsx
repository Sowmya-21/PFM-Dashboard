import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import AuthPage from './components/auth/AuthPage';
import SignupPage from './components/auth/SignupPage';
import Layout from './components/layout/Layout';
import LandingPage from './components/landing/LandingPage';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showSignup, setShowSignup] = useState(true); // default: Sign-Up first
  const [showLanding, setShowLanding] = useState(true);

  if (isAuthenticated) return <Layout />;

  if (showLanding) {
    return (
      <LandingPage
        onLogin={() => {
          setShowLanding(false);
          setShowSignup(false);
        }}
        onSignup={() => {
          setShowLanding(false);
          setShowSignup(true);
        }}
      />
    );
  }

  return showSignup ? (
    <SignupPage switchToLogin={() => setShowSignup(false)} />
  ) : (
    <AuthPage switchToSignup={() => setShowSignup(true)} />
  );
};

export default App;

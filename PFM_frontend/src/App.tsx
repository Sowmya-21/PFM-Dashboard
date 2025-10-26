import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthPage from "../components/auth/AuthPage";
import SignupPage from "../components/auth/SignupPage";
import DashboardPage from "../components/dashboard/DashboardPage";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showSignup, setShowSignup] = useState<boolean>(true);

  // Always show signup/login first. Only when isAuthenticated === true (explicit login in this session)
  // will we render the Dashboard.
  if (!isAuthenticated) {
    return showSignup ? (
      <SignupPage switchToLogin={() => setShowSignup(false)} />
    ) : (
      <AuthPage switchToSignup={() => setShowSignup(true)} />
    );
  }

  return <DashboardPage />;
};

export default App;
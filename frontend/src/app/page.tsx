"use client";

import SignUpPage from "@/components/SignUpPage";
import VerifyModal from "@/components/VerifyModal";
import ModuleLandingPage from "@/components/ModuleLandingPage";
import { useAuth } from "@/context/AuthContext";

const LandingPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <SignUpPage />;
  }

  if (!user.emailVerified) {
    return <VerifyModal />;
  }

  return <ModuleLandingPage />;
};

export default LandingPage;

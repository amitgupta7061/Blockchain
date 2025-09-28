"use client";

import { useState } from "react";
import Welcome from "../components/Welcome";
import Dashboard from "../components/Dashboard";


const Page = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {

    return <Welcome onGetStarted={handleGetStarted} />;
  }

  return <Dashboard/>;
};

export default Page;
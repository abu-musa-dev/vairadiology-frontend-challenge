// src/layouts/MainLayout.tsx
import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";  // ফুটাার ইমপোর্ট করুন
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />  {/* Footer যুক্ত করুন */}
    </div>
  );
};

export default MainLayout;

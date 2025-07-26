// src/layouts/MainLayout.tsx
import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";  // Import Footer component
import { Outlet } from "react-router-dom";

/**
 * MainLayout component serves as the main wrapper layout
 * for all pages, rendering Navbar at the top, page content
 * in the middle via <Outlet />, and Footer at the bottom.
 */
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main content area where child routes are rendered */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default MainLayout;

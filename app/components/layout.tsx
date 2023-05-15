"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  return isLoggedIn ? (
    <>
      <Navbar />

      <Sidebar />
      <main>{children}</main>
      <Footer />
    </>
  ) : (
    <>
      <Navbar />

      {/* <Sidebar /> */}
      <main>{children}</main>
      <Footer />
    </>
  );
}

import React, { useState, useEffect, useLayoutEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Image from "next/image";
import { Inter, Nabla } from "next/font/google";
import styles from "./page.module.css";
import Link from "next/link";
import { useGlobalContext } from "@/lib/context/store";
import { useRouter } from "next/navigation";
import FetchCurrentUser from "@/lib/fetchCurrentUser";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar />

      <Footer />
    </div>
  );
}

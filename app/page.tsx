"use client";
import React from "react";
import Footer from "./components/Footer";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Box>
      <Box className="homepage">
        <Box>
          <Button
            style={{ width: "150px", height: "50px", fontSize: "17px" }}
            onClick={() => router.push("/login")}
          >
            Get Started
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

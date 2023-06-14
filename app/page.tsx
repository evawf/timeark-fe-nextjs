"use client";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Typography from "@mui/joy/Typography";
import isAuth from "@/lib/isAuth";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkIsAuth = async () => {
      const res = await isAuth();
      setIsLoggedIn(res.isLoggedIn);
      return;
    };
    checkIsAuth();
    if (isLoggedIn) router.push("/dashboard");
  }, []);
  console.log("isLoggedIn: ", isLoggedIn);

  return (
    <Box className="homepage" sx={{ height: 100, width: 100 }}>
      <Box className="home">
        <Link href={"/"} style={{ position: "fixed", left: 5, top: 5 }}>
          <Image alt="Time Ark" src="/logo.png" width={150} height={50}></Image>
        </Link>
        <Box
          className="homeContent"
          sx={{
            width: "80%",
            height: "100%",
            left: 5,
            marginTop: 25,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography level="h4" sx={{ textAlign: "center" }}>
            Your Time You Decide
          </Typography>
          <Typography level="body1" sx={{ textAlign: "center" }}>
            A better tool to manage your clients, projects, tasks and invoices
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button
              sx={{
                width: "150px",
                height: "50px",
                fontSize: "17px",
                marginTop: 5,
              }}
              onClick={() => router.push("/login")}
              color="success"
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className="about"></Box>
      {/* <Box className="service">Our Services</Box> */}
      {/* <Box className="testimonial">Clients Testimoinals</Box> */}
      {/* <Box className="contact">Contact Us</Box> */}

      <Footer />
    </Box>
  );
}

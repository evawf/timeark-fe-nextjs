"use client";
import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { green } from "@mui/material/colors";
import Typography from "@mui/joy/Typography";

const green500 = green[800];

export default function Footer() {
  return (
    <BottomNavigation
      showLabels
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        align: "center",
        bgcolor: "none",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* <BottomNavigationAction
        label=" ©    2022 TimeArk™    "
        sx={{ width: 1 }}
      /> */}
      <BottomNavigationAction
        icon={<TwitterIcon />}
        onClick={() => (window.location.href = "https://www.twitter.com")}
        sx={{ color: green500 }}
      />
      <BottomNavigationAction
        icon={<FacebookIcon />}
        onClick={() => (window.location.href = "https://www.facebook.com")}
        sx={{ color: green500 }}
      />
      <BottomNavigationAction
        icon={<YouTubeIcon />}
        onClick={() => (window.location.href = "https://www.youtube.com")}
        sx={{ color: green500 }}
      />
      <BottomNavigationAction label="©2022 TimeArk" sx={{ width: 1 }} />
    </BottomNavigation>
  );
}

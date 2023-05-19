"use client";
import React, { useState, useEffect } from "react";
import FetchDashboardData from "../../lib/fetchDashboardData";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [data, setData] = useState("");
  const router = useRouter();

  const getData = async () => {
    const res = await FetchDashboardData();
    return setData(res.msg);
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? getData() : router.push("/login");
  }, []);

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      {data ? (
        <>
          <div>Dashboard data: {data}</div>
        </>
      ) : (
        <>Loading</>
      )}
    </Box>
  );
}

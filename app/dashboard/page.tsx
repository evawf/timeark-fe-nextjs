"use client";
import React, { useState, useEffect } from "react";
import FetchDashboardData from "../../lib/fetchDashboardData";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [data, setData] = useState("");
  const router = useRouter();
  let isAuth = localStorage.getItem("isAuth");

  const getData = async () => {
    const res = await FetchDashboardData();
    return setData(res.msg);
  };

  useEffect(() => {
    isAuth === "true" ? getData() : router.push("/login");
  }, []);

  return (
    <div>
      <Sidebar />
      <div>Dashboard data: {data}</div>
    </div>
  );
}

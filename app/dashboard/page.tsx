"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../lib/context/store";
import FetchDashboardData from "../../lib/fetchDashboardData";

export default function Dashboard() {
  const { userId, isAuth } = useGlobalContext();
  const [data, setData] = useState({});

  const getData = async () => {
    const result = await FetchDashboardData();
    return setData(result);
  };
  useEffect(() => {
    getData();
  }, []);

  if (data) {
    return <div>Dashboard</div>;
  } else {
    return <div>Unauthorized</div>;
  }
}

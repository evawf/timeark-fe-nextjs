"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../lib/context/store";
import FetchDashboardData from "../../lib/fetchDashboardData";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { userId, isAuth } = useGlobalContext();
  const [data, setData] = useState("");
  const router = useRouter();

  const getData = async () => {
    const res = await FetchDashboardData();
    return setData(res.msg);
  };

  useEffect(() => {
    if (!isAuth) {
      return router.push("/login");
    }
    getData();
  });

  return <div>Dashboard: {data}</div>;
}

"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../lib/context/store";
import FetchDashboardData from "../../lib/fetchDashboardData";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { isAuth, setIsAuth } = useGlobalContext();
  const [data, setData] = useState("");
  const router = useRouter();

  useEffect(() => {
    const stored: string | any = localStorage.getItem("isAuth");
    const isTrue = stored === "true";
    setIsAuth(isTrue);

    if (!isAuth) {
      return router.push("/login");
    }
  }, []);

  const getData = async () => {
    const res = await FetchDashboardData();
    if (res.msg) {
      return setData(res.msg);
    }
  };

  if (isAuth) {
    return <div>Dashboard: {data}</div>;
  }
}

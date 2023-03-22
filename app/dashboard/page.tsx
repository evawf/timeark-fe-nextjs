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

    const getData = async () => {
      const res = await FetchDashboardData();
      return setData(res.msg);
    };
    getData();
  }, []);

  return (
    <>
      {isAuth ? (
        <>
          <div>Dashboard: {data}</div>
        </>
      ) : (
        router.push("/login")
      )}
    </>
  );
}

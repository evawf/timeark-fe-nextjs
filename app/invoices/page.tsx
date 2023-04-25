"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Invoices() {
  const router = useRouter();

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    // isAuth === "true" ? getInvoicesData() : router.push("/login");
  }, []);
  return <div>Invoices page</div>;
}

"use client";
import React, { useState, useEffect } from "react";
import getClients from "../../../lib/client/fetchClients";
import { useRouter } from "next/navigation";
import Client from "../../../types/client";

export default function NewClient() {
  const router = useRouter();

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    console.log("isAuth: ", isAuth);
    let userId: string | any = localStorage.getItem("userId");
    // isAuth === "true" ? getClientsData(userId) : router.push("/login");
  }, []);

  return <div>Add New Client</div>;
}

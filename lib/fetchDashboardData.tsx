import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

interface User {
  userId: string;
}

export default async function FetchDashboardData() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/dashboard`
  );
  console.log("dashboard res: ", res);
  if (!res.data) {
    return "unauthorized";
  }
  return res.data;
}

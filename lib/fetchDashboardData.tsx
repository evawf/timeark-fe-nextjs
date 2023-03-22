import React from "react";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";

axios.defaults.withCredentials = true;

interface User {
  userId: string;
}

export default async function FetchDashboardData() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/dashboard`
    );
    // if (!res.data) {
    //   console.log("dashboard res: ", res.data);
    //   return "unauthorized";
    // }
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}

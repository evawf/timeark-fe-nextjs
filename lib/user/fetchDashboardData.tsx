import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default async function FetchDashboardData() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/dashboard`
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}

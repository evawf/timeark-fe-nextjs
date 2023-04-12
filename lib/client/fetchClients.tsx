import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default async function GetClients() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/myClients`
    );

    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}

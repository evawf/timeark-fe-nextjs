import axios from "axios";
import React from "react";

axios.defaults.withCredentials = true;

export default async function GetSingleClient(id: string) {
  try {
    const clientId: number = Number(id);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/${clientId}`
    );
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.log("msg: ", err);
  }
}

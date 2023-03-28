import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default async function GetClients() {
  try {
    console.log("server req sent");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/clients`
    );

    console.log("backend res: ", res.data);
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}

import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default async function LogoutUser() {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/logout`
    );
    console.log(res);
  } catch (err) {
    console.log("msg: ", err);
  }
}

import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default async function isAuth() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/isAuth`
    );

    console.log("res data: ", res.data);
    if (res.data) {
      return res.data;
    } else {
      return "Unauthorized";
    }
  } catch (err) {
    console.log("msg: ", err);
  }
}

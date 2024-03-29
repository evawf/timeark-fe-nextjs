import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

interface User {
  email: string;
  password: string;
  isActive: boolean;
}

export default async function LoginUser(user: User) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
      user
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

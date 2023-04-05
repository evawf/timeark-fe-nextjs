import axios from "axios";
import React from "react";

axios.defaults.withCredentials = true;

interface User {
  email: string;
  password: string;
  isActive: boolean;
}

export default async function RegisterUser(user: User) {
  try {
    const newUser = {
      ...user,
      isActive: true,
    };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`,
      newUser
    );
    if (res.data) {
      return res.data;
    } else {
      return "Unauthorized";
    }
  } catch (err) {
    console.log("msg: ", err);
  }
}

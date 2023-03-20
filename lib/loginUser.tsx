import axios from "axios";
import React from "react";

axios.defaults.withCredentials = true;

interface User {
  email: string;
  password: string;
}

export default async function LoginUser(user: User) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
    user
  );
  console.log("res: ", res);
  if (res.data) {
    return res.data;
  } else {
    return "Unauthorized";
  }
}

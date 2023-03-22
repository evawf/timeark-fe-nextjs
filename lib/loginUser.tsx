import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

interface User {
  email: string;
  password: string;
}

export default async function LoginUser(user: User) {
  console.log("be: user: ", user);
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

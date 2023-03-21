import axios from "axios";
import React from "react";

axios.defaults.withCredentials = true;

interface User {
  email: string;
  password: string;
}

export default async function RegisterUser(user: User) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`,
    user
  );
  if (res.data) {
    return res.data;
  } else {
    return "Unauthorized";
  }
}

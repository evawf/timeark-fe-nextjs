import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

interface User {
  email: string;
  password: string;
}

export default async function LoginUser(user: User) {
  console.log("backend url: ", process.env.BACKEND_URL);
  const res = await axios.post("http://localhost:8081/users/login", user);
  console.log("res: ", res);
  return res.data;
}

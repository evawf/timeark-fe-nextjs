"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import LoginUser from "@/lib/loginUser";
import { useGlobalContext } from "../../../lib/context/store";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { setUserId, setIsAuth } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      email: email,
      password: password,
    };

    const result = await LoginUser(user);
    if (result.isAuth && result.userId) {
      setUserId(result.userId);
      setIsAuth(true);
      return router.push("/dashboard");
    } else {
      alert("Password or Email is not correct!");
      return router.push("/login");
    }
  };

  return (
    <div className="container mx-auto">
      <div>Login</div>;
      <form onSubmit={handleSubmit} className="">
        <div>
          <label>Email</label>
          <br />
          <input
            type="text"
            id="email"
            placeholder="email"
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            id="password"
            placeholder="******************"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

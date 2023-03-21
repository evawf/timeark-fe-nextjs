"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useGlobalContext } from "../../../lib/context/store";
import { useRouter } from "next/navigation";
import RegisterUser from "@/lib/registerUser";

interface User {
  email: string;
  password: string;
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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

    const result = await RegisterUser(user);
    if (result.userId) {
      return router.push("/login");
    } else {
      alert("Password or Email is not correct!");
      return router.push("/signup");
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
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}

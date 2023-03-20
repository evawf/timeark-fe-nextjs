"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from "./page.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    console.log("user: ", user);
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

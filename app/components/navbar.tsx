"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) setLoggedIn(true);
  }, []);

  return (
    <div>
      <div>TimeArk</div>
      {loggedIn ? (
        <div>
          <Link href={"/logout"}>Logout</Link>
        </div>
      ) : (
        <div>{/* <Link href={"/login"}>Login</Link> */}</div>
      )}
      <div>
        <Link href={"/signup"}>Register</Link>
      </div>
    </div>
  );
}

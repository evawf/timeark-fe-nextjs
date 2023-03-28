"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LogoutUser from "@/lib/logoutUser";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) setLoggedIn(true);
  }, []);

  return (
    <div>
      <div>TimeArk</div>
      {loggedIn ? (
        <div>
          <button
            onClick={() => {
              localStorage.clear();
              LogoutUser();
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>{<Link href={"/login"}>Login</Link>}</div>
      )}
      <div>
        <Link href={"/signup"}>Register</Link>
      </div>
    </div>
  );
}

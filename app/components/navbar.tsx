import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <div>TimeArk</div>
      <Link href={"/login"}>Login</Link>
      <Link href={"/signup"}>Register</Link>
    </div>
  );
}

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <div>TimeArk</div>
      <div>
        <Link href={"/login"}>Login</Link>
      </div>
      <div>
        <Link href={"/signup"}>Register</Link>
      </div>
    </div>
  );
}

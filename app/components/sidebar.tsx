import React from "react";
import Link from "next/link";
import LogoutUser from "@/lib/logoutUser";

export default function Sidebar() {
  return (
    <>
      <main>
        <div>
          <Link href={"/dashboard"}>Dashboard</Link>
        </div>
        <div>
          <button
            onClick={() => {
              localStorage.clear();
              LogoutUser();
            }}
          >
            Logout
          </button>
        </div>
      </main>
    </>
  );
}

import React from "react";
import Link from "next/link";
import LogoutUser from "@/lib/logoutUser";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
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
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      </main>
    </>
  );
}
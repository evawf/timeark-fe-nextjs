"use client";
import React from "react";
import Link from "next/link";
import LogoutUser from "@/lib/logoutUser";
import { useRouter } from "next/navigation";
import moment from "moment";

export default function Sidebar() {
  const router = useRouter();
  const today = moment().format("YYYY-MM-DD");
  return (
    <>
      <main>
        <div>
          <Link href={"/dashboard"}>Dashboard</Link>
        </div>
        <div>
          <Link href={`/calendar`}>Calendar</Link>
        </div>
        <div>
          <Link href={"/clients"}>Clients</Link>
        </div>
        <div>
          <Link href={"/projects"}>Projects</Link>
        </div>
        <div>
          <Link href={"/invoices"}>Invoices</Link>
        </div>
        <div>
          <Link href={"/myprofile"}>Profile</Link>
        </div>

        {/* <div>
          <button
            onClick={() => {
              localStorage.clear();
              LogoutUser();
              router.push("/");
            }}
          >
            Logout
          </button>
        </div> */}
      </main>
    </>
  );
}

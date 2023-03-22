import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      <main>
        <div>
          <Link href={"/dashboard"}>Dashboard</Link>
        </div>
      </main>
    </>
  );
}

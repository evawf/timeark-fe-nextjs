"use client";
import React, { useState, useEffect } from "react";
import getClients from "../../lib/client/fetchClients";
import { useRouter } from "next/navigation";
import Client from "../../types/client";
import Sidebar from "../components/Sidebar";
import Link from "next/link";

import Box from "@mui/material/Box";

export default function Clients() {
  const router = useRouter();
  const [clientList, setClentList] = useState<Client[]>([]);

  const getClientsData = async () => {
    const res = await getClients();
    setClentList(res.clients);
    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    console.log("isAuth: ", isAuth);
    isAuth === "true" ? getClientsData() : router.push("/login");
  }, []);

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        {clientList ? (
          <section>
            <h2>My Clients</h2>
            {clientList.length !== 0 ? (
              <ul>
                {clientList.map((client) => (
                  <li key={client.id}>
                    <Link href={`/clients/${client.id}`}>{client.name}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <h4>You haven't added any client!</h4>
                <button onClick={() => router.push("/clients/newClient")}>
                  New Client
                </button>
              </div>
            )}
          </section>
        ) : (
          <>Loading</>
        )}
      </Box>
    </Box>
  );
}

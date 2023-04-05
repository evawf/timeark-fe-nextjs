"use client";
import React, { useState, useEffect } from "react";
import getClients from "../../lib/client/fetchClients";
import { useRouter } from "next/navigation";
import Client from "../../types/client";
import Sidebar from "../components/Sidebar";
import Link from "next/link";

export default function Clients() {
  const router = useRouter();
  const [clientList, setClentList] = useState<Client[]>([]);

  const getClientsData = async () => {
    console.log("call server...");
    const res = await getClients();
    console.log("res from backend: ", res);
    setClentList(res.clients);
    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    console.log("isAuth: ", isAuth);
    isAuth === "true" ? getClientsData() : router.push("/login");
  }, []);

  return (
    <div>
      {/* <Sidebar /> */}
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
    </div>
  );
}

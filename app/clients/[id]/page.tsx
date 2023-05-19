"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GetSingleClient from "@/lib/client/fetchSingleClient";
import Client from "../../../types/client";
import DeleteClient from "@/lib/client/deleteClient";
import Sidebar from "@/app/components/Sidebar";

import Box from "@mui/material/Box";

interface ClientId {
  id: string;
}

export default function ClientPage({ params }: ClientId | any) {
  const router = useRouter();
  const [client, setClient] = useState<Client>();

  const getSingleClientData = async () => {
    const res = await GetSingleClient(params.id);
    setClient(res.client);
    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? getSingleClientData() : router.push("/login");
  }, []);

  const deleteClient = () => {
    alert("Delete your client profile, are you sure?");
    let input = prompt("Input 'Y' to confirm.");
    if (input === "Y") {
      DeleteClient(params.id);
      alert("Your client has been deleted!");
    }
    return router.push("/clients");
  };

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        <p>Client page: client {params.id}</p>
        {client ? (
          <Box>
            <Box>Name: {client.name}</Box>
            <Box>Country: {client.country}</Box>
            <Box>City: {client.city}</Box>
            <Box>Address: {client.address}</Box>
            <Box>Postalcode: {client.postalCode}</Box>
            <Box>Registration No.: {client.registrationNumber}</Box>
            <Box>Contact: {client.contact}</Box>
            <Box>Email: {client.email}</Box>
            <button onClick={() => router.push(`/clients/${params.id}/update`)}>
              Update Client
            </button>
            <br />
            <button onClick={() => deleteClient()}>Delete Client</button>
          </Box>
        ) : (
          <>Loading</>
        )}
      </Box>
    </Box>
  );
}

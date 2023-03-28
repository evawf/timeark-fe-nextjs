"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GetSingleClient from "@/lib/client/fetchSingleClient";
import Client from "../../../types/client";

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

  return (
    <>
      <div>Client page: client {params.id}</div>
      <div>
        {client ? (
          <div>
            <div>Name: {client.name}</div>
            <div>Country: {client.country}</div>
            <div>City: {client.city}</div>
            <div>Address: {client.address}</div>
            <div>Postalcode: {client.postalCode}</div>
            <div>Registration No.: {client.registrationNumber}</div>
            <button onClick={() => router.push(`/clients/${params.id}/update`)}>
              Update Client
            </button>
            <br />
            <button onClick={() => router.push(`/clients/${params.id}/delete`)}>
              Delete Client
            </button>
          </div>
        ) : (
          <>Loading</>
        )}
      </div>
    </>
  );
}

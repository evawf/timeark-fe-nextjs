"use client";
import React, { useState, useEffect } from "react";
import getClients from "../../../lib/client/fetchClients";
import { useRouter } from "next/navigation";
import Client from "../../../types/client";
import AddNewClient from "@/lib/client/addNewClient";
import Sidebar from "@/app/components/Sidebar";

export default function NewClient() {
  const router = useRouter();
  const [newClient, setNewClient] = useState<Client>({
    id: "",
    name: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    registrationNumber: "",
    contact: "",
    email: "",
  });

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    if (isAuth !== "true") {
      router.push("/login");
    }
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();
    const { id, value } = e.target;
    setNewClient({
      ...newClient,
      [e.target.id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newClient.registrationNumber !== "") {
      const res = await AddNewClient(newClient);
      if (res.msg === "Client already added.") {
        alert("No need to add this client again!");
        const clientId: string = res.clientId;
        return router.push(`/clients/${clientId}`);
      } else {
        alert("You have successfully added a new client.");
        return router.push(`/clients/${res.newClient.id}`);
      }
    }
  };

  return (
    <div>
      <Sidebar />
      Add New Client
      <form action="" onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
        <label htmlFor="">Company Name: </label>
        <input
          type="text"
          id="name"
          value={newClient.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Country: </label>
        <input
          type="text"
          id="country"
          value={newClient.country}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">City: </label>
        <input
          type="text"
          id="city"
          value={newClient.city}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Address: </label>
        <input
          type="text"
          id="address"
          value={newClient.address}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="">Postal Code: </label>
        <input
          type="text"
          id="postalCode"
          value={newClient.postalCode}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Registration No.:</label>
        <input
          type="text"
          id="registrationNumber"
          value={newClient.registrationNumber}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Contact: </label>
        <input
          type="text"
          id="contact"
          value={newClient.contact}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Email: </label>
        <input
          type="text"
          id="email"
          value={newClient.email}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

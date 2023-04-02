"use client";
import React, { useState, useEffect } from "react";
import getClients from "../../../lib/client/fetchClients";
import { useRouter } from "next/navigation";
import Client from "../../../types/client";
import AddNewClient from "@/lib/client/addNewClient";

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
    console.log("isAuth: ", isAuth);
    let userId: string | any = localStorage.getItem("userId");
    // isAuth === "true" ? getClientsData(userId) : router.push("/login");
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { id, value } = e.target;
    setNewClient({
      ...newClient,
      [e.target.id]: value,
    });

    console.log("new Client: ", newClient);
    const res = await AddNewClient(newClient);
    console.log("res from backend: ", res);
    if (newClient.name === "" || newClient.registrationNumber === "")
      alert("Please input client name and registration number!");
    // if (res.msg === "Client already added.") {
    //   alert("You have successfully added a new client.");
    //   return router.push(`/clients/${res.client.id}`);
    // }
  };

  return (
    <div>
      Add New Client
      <form action="" onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
        <label htmlFor="">Company Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={newClient.name}
          onChange={handleSubmit}
        />
        <br />
        <label htmlFor="">Country: </label>
        <input
          type="text"
          id="country"
          name="country"
          value={newClient.country}
          onChange={handleSubmit}
        />
        <br />
        <label htmlFor="">City: </label>
        <input
          type="text"
          id="city"
          value={newClient.city}
          onChange={handleSubmit}
        />
        <br />
        <label htmlFor="">Address: </label>
        <input
          type="text"
          id="address"
          value={newClient.address}
          onChange={handleSubmit}
        />
        <br />

        <label htmlFor="">Postal Code: </label>
        <input
          type="text"
          id="postalCode"
          value={newClient.postalCode}
          onChange={handleSubmit}
        />
        <br />
        <label htmlFor="">Registration No.:</label>
        <input
          type="text"
          id="registrationNumber"
          value={newClient.registrationNumber}
          onChange={handleSubmit}
        />
        <br />
        <label htmlFor="">Contact: </label>
        <input
          type="text"
          id="contact"
          value={newClient.contact}
          onChange={handleSubmit}
        />
        <br />
        <label htmlFor="">Email: </label>
        <input
          type="text"
          id="email"
          value={newClient.email}
          onChange={handleSubmit}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

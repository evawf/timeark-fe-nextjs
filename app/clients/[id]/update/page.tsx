"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GetSingleClient from "@/lib/client/fetchSingleClient";
import Client from "../../../../types/client";
import UpdateClientProfile from "../../../../lib/client/updateClientProfile";

interface ClientId {
  id: string;
}

export default function UpdateClient({ params }: ClientId | any) {
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      country: { value: string };
      city: { value: string };
      address: { value: string };
      postalCode: { value: string };
      registrationNumber: { value: string };
      contact: { value: string };
      email: { value: string };
    };

    const updatedClientData: Client | any = {
      name: target.name.value,
      country: target.country.value,
      city: target.city.value,
      address: target.address.value,
      postalCode: target.postalCode.value,
      registrationNumber: target.registrationNumber.value,
      contact: target.contact.value,
      email: target.email.value,
    };

    console.log("updatedClientData: ", updatedClientData);

    const res = await UpdateClientProfile(updatedClientData, params.id);

    console.log("res from backend: ", res);
    if (res.msg === "Client updated!") {
      alert("You have successfully updated your client profile!");
      return router.push(`/clients/${params.id}`);
    }
  };

  return (
    <div>
      Update Client Page
      {client ? (
        <>
          <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
            <label htmlFor="client name">Name: </label>
            <input type="text" id="name" defaultValue={client.name} />
            <br />
            <label htmlFor="">Country: </label>
            <input type="text" id="country" defaultValue={client.country} />
            <br />
            <label htmlFor="">City: </label>
            <input type="text" id="city" defaultValue={client.city} />
            <br />
            <label htmlFor="">Address: </label>
            <input type="text" id="address" defaultValue={client.address} />
            <br />
            <label htmlFor="">Postalcode: </label>
            <input
              type="text"
              id="postalCode"
              defaultValue={client.postalCode}
            />
            <br />
            <label htmlFor="">Registration No.: </label>
            <input
              type="text"
              id="registrationNumber"
              defaultValue={client.registrationNumber}
            />
            <br />
            <label htmlFor="">Contact: </label>
            <input type="text" id="contact" defaultValue={client.contact} />
            <br />
            <label htmlFor="">Email: </label>
            <input type="text" id="email" defaultValue={client.email} />
            <br />
            <button type="submit">Update</button>
          </form>
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

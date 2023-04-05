import React from "react";
import axios from "axios";
import Client from "../../types/client";
axios.defaults.withCredentials = true;

export default async function AddNewClient(client: Client) {
  try {
    console.log("client: ", client);
    const newClient = {
      name: client.name,
      country: client.country,
      city: client.city,
      address: client.address,
      postalCode: client.postalCode,
      registrationNumber: client.registrationNumber,
      contact: client.contact,
      email: client.email,
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/newClient`,
      newClient
    );

    console.log("res data: ", res.data);
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.log("msg: ", err);
  }
}

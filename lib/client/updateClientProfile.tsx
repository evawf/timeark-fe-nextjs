import React from "react";
import Client from "../../types/client";
import axios from "axios";

axios.defaults.withCredentials = true;

export default async function UpdateClientProfile(client: Client, id: string) {
  try {
    const clientId: number = Number(id);
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/${clientId}/update`,
      client
    );

    console.log("res data: ", res.data);
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.log("msg: ", err);
  }
}

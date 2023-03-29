import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default async function DeleteClient(id: string) {
  try {
    const clientId: number = Number(id);
    console.log("client id from front end: ", clientId);
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/${clientId}/delete`
    );

    console.log("res data: ", res.data);
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.log("msg: ", err);
  }
}

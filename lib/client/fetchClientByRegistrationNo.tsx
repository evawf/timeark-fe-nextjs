import axios from "axios";
import React from "react";
axios.defaults.withCredentials = true;

export default async function getClientByRegistrationNo(
  registrationNumber: string
) {
  try {
    const body: any = {
      registrationNumber: registrationNumber,
    };
    console.log("registrationNumber: ", registrationNumber);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/searchClient/${registrationNumber}`
    );
    console.log("res data: ", res.data);
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}

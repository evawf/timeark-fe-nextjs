import axios from "axios";
import React from "react";
import Task from "@/types/task";
axios.defaults.withCredentials = true;

export default async function getInvoices() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices`
    );
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}

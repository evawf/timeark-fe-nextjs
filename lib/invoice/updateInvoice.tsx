import React from "react";
import axios from "axios";
import Task from "@/types/task";
axios.defaults.withCredentials = true;

export default async function updateInvoice(invoiceId: string) {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices/${invoiceId}/update`
    );

    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}

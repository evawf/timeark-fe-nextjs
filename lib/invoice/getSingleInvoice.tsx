import axios from "axios";
import { invalid } from "moment";
import React from "react";

axios.defaults.withCredentials = true;

export default async function getSingleInvoice(invoiceId: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices/${invoiceId}`
    );
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}

import React from "react";
import Invoice from "@/types/invoice";
import axios from "axios";
axios.defaults.withCredentials = true;

interface Props {
  month: number;
  year: number;
  projectId: number;
}

export default async function addNewInvoice(invoice: Props) {
  try {
    const newInvoiceReq = {
      month: invoice.month,
      year: invoice.year,
      projectId: invoice.projectId,
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices/newInvoice`,
      newInvoiceReq
    );
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}

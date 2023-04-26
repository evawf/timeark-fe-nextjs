"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import Invoice from "@/types/invoice";
import getSingleInvoice from "@/lib/invoice/getSingleInvoice";

interface InvoiceId {
  id: string;
}

export default function InvoicePage({ params }: InvoiceId | any) {
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice>();

  const getSingleInvoiceData = async () => {
    const res = await getSingleInvoice(params.id);
    console.log("invoice: ", res);
    return setInvoice(res.invoice);
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? getSingleInvoiceData() : router.push("/login");
  }, []);

  return (
    <div>
      <h4>Single Invoice Page: invoice no. {params.id}</h4>
      <div>
        <h5>My Business Info: </h5>
        <div>
          <p>{invoice?.project.user.companyName}</p>
          <p>{invoice?.project.user.address}</p>
          <p>{invoice?.project.user.city}</p>
          <p>{invoice?.project.user.country} </p>
          <p>{invoice?.project.user.postalCode} </p>
          <p>{invoice?.project.user.contact} </p>
        </div>
      </div>
      <div>
        <h5>Bill To:</h5>
        <div>
          <p>{invoice?.project.client.name}</p>
          <p>{invoice?.project.client.address}</p>
          <p>{invoice?.project.client.city}</p>
          <p>{invoice?.project.client.country} </p>
          <p>{invoice?.project.client.postalCode} </p>
          <p>{invoice?.project.client.contact} </p>
          <p>{invoice?.project.client.email} </p>
        </div>
      </div>
      <div>
        <h5>Invoice info:</h5>
        <p>Invoice No.: {invoice?.id}</p>
        <p>Issue date: {moment(invoice?.issueDate).format("YYYY-MM-DD")}</p>
      </div>
      <div>
        <h5>Billing details:</h5>
      </div>
    </div>
  );
}

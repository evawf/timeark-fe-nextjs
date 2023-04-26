"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import Invoice from "@/types/invoice";
import getSingleInvoice from "@/lib/invoice/getSingleInvoice";
import updateInvoice from "@/lib/invoice/updateInvoice";

interface InvoiceId {
  id: string;
}

export default function InvoicePage({ params }: InvoiceId | any) {
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice>();
  const [dueAmount, setDueAmount] = useState(Number);

  const getSingleInvoiceData = async () => {
    const res = await getSingleInvoice(params.id);
    const invoice = res.invoice;
    setInvoice(invoice);
    const chargeableTasks = invoice.chargeable_tasks;
    const totalAmount = chargeableTasks.reduce(
      (a: number, c: any) =>
        a + Number(c.timeSpent) * Number(invoice.project.ratePerHour),
      0
    );

    return setDueAmount(totalAmount);
  };

  const handlePaymentStatusChange = async () => {
    console.log("coucou");
    const res = await updateInvoice(params.id);
    console.log("is paid: ", res.isPaid);
    if (invoice?.isPaid === false) {
      setInvoice({ ...invoice, isPaid: true });
    }

    if (invoice?.isPaid === true) {
      setInvoice({ ...invoice, isPaid: false });
    }
    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? getSingleInvoiceData() : router.push("/login");
  }, []);

  return (
    <div>
      <h4>Single Invoice Page: invoice no. {params.id}</h4>
      {invoice ? (
        <div>
          {/******************** invoice Details *********************/}
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
            <p>Invoice No.: #0000{invoice?.id}</p>
            <p>Issue date: {moment(invoice?.issueDate).format("YYYY-MM-DD")}</p>
            <p>
              Payment status:
              {invoice.isPaid ? (
                <>
                  <button onClick={() => handlePaymentStatusChange()}>
                    PAID
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handlePaymentStatusChange()}>
                    UNPAID
                  </button>
                </>
              )}
            </p>
          </div>
          <div>
            <h5>Payment: </h5>
            <p>
              Due date:
              {moment(invoice?.issueDate).add(1, "month").format("YYYY-MM-DD")}
            </p>
            <p>S${dueAmount.toFixed(2)}</p>
          </div>
          <div>
            <h5>Billing details:</h5>
            <ul>
              {invoice.chargeable_tasks.map((ct) => (
                <li key={ct.id}>
                  <p>Task name: {ct?.taskName}</p>
                  <p>Chargeable time(hours): {ct.timeSpent}</p>
                  <p>
                    Rate per hour(S$):{" "}
                    {Number(invoice.project.ratePerHour).toFixed(2)}
                  </p>
                  <p>
                    Subtotal:{" "}
                    {(
                      Number(ct.timeSpent) * Number(invoice.project.ratePerHour)
                    ).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>You have no invoice</>
      )}
    </div>
  );
}

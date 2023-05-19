"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getInvoices from "@/lib/invoice/getInvoices";
import Invoice from "@/types/invoice";
import moment from "moment";
import Link from "next/link";
import Sidebar from "../components/Sidebar";

export default function Invoices() {
  const router = useRouter();
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);

  const getInvoicesData = async () => {
    const res = await getInvoices();
    console.log("invoice data: ", res);
    return setInvoiceList(res.invoices);
  };

  console.log("invoiceList: ", invoiceList);

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? getInvoicesData() : router.push("/login");
  }, []);
  return (
    <div>
      <Sidebar />
      <h4>My Invoices: </h4>
      <button onClick={() => router.push(`/invoices/newInvoice`)}>
        Generate New Invoice
      </button>
      <div>
        {invoiceList.length !== 0 ? (
          <ul>
            {invoiceList.map((i) => (
              <li key={i.id}>
                <p>Project name: {i.project.name}</p>
                <p>Client name: {i.project.client.name}</p>
                <p>Issue date: {moment(i.issueDate).format("YYYY-MM-DD")}</p>
                <p>Payment: {i.isPaid ? <>PAID</> : <>UNPAID</>}</p>
                {/* <Link href={`/invoices/${i.id}`}>View</Link> */}
                <button onClick={() => router.push(`/invoices/${i.id}`)}>
                  View
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <h4>You haven't generated any invoice yet.</h4>
          </>
        )}
      </div>
    </div>
  );
}

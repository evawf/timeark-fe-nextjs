"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import Invoice from "@/types/invoice";
import getSingleInvoice from "@/lib/invoice/getSingleInvoice";
import updateInvoice from "@/lib/invoice/updateInvoice";
import Sidebar from "@/app/components/Sidebar";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        {invoice ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/******************** invoice Details *********************/}
            <Card
              sx={{
                width: "80%",
                margin: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "lightblue",
                height: "auto",
              }}
            >
              <CardContent
                sx={{
                  mt: 10,
                  mr: 10,
                  mb: 2,
                }}
              >
                <Box sx={{ pl: "80%" }}>
                  <h1>Invoice</h1>
                  <p>No.: #00{invoice?.id}</p>
                  <p>
                    Issue date:{" "}
                    {moment(invoice?.issueDate).format("YYYY-MM-DD")}
                  </p>
                  <p>
                    Payment status:
                    {invoice.isPaid ? (
                      <>
                        <Button onClick={() => handlePaymentStatusChange()}>
                          PAID
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handlePaymentStatusChange()}>
                          UNPAID
                        </Button>
                      </>
                    )}
                  </p>
                </Box>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "space-around",
                  width: "100%",
                  pl: 10,
                }}
              >
                <Box sx={{ width: "50%", ml: 5 }}>
                  <h5>From: </h5>
                  <p>{invoice?.project.user.companyName}</p>
                  <p>{invoice?.project.user.address}</p>
                  <p>{invoice?.project.user.city}</p>
                  <p>{invoice?.project.user.country} </p>
                </Box>
                <Box sx={{ width: "50%", ml: 5 }}>
                  <h5>To:</h5>
                  <p>{invoice?.project.client.name}</p>
                  <p>{invoice?.project.client.address}</p>
                  <p>{invoice?.project.client.city}</p>
                  <p>{invoice?.project.client.country} </p>
                </Box>
              </CardContent>
              <CardContent sx={{ pl: 15, width: "100%" }}>
                <h5>Payment: </h5>
                <p>
                  Due date:{" "}
                  {moment(invoice?.issueDate)
                    .add(1, "month")
                    .format("YYYY-MM-DD")}
                </p>
                <p>Amount Due: S${dueAmount.toFixed(2)}</p>
              </CardContent>
              <h3 style={{ textAlign: "center" }}>Billing details:</h3>
              <CardContent sx={{ mx: 2 }}>
                <TableContainer component={Paper}>
                  <Table aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Tasks</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Time(hours)
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Rate(S$/hour)
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Subtotal
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoice.chargeable_tasks.map((ct) => (
                        <TableRow key={ct.id}>
                          <TableCell>{ct?.taskName}</TableCell>
                          <TableCell>{ct.timeSpent}</TableCell>
                          <TableCell>
                            {Number(invoice.project.ratePerHour).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            {(
                              Number(ct.timeSpent) *
                              Number(invoice.project.ratePerHour)
                            ).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell
                          colSpan={2}
                          sx={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          Total
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "red" }}>
                          {Number(dueAmount).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <>You have no invoice</>
        )}
      </Box>
    </Box>
  );
}

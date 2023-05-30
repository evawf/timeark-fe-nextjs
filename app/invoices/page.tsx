"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getInvoices from "@/lib/invoice/getInvoices";
import Invoice from "@/types/invoice";
import moment from "moment";
import Link from "next/link";
import Sidebar from "../components/Sidebar";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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

import VisibilityIcon from "@mui/icons-material/Visibility";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            my: 1,
          }}
        >
          <Typography sx={{ textAlign: "center" }} variant="h4">
            My Invoices
          </Typography>
          <Button
            onClick={() => router.push(`/invoices/newInvoice`)}
            color="success"
            variant="contained"
          >
            Generate New Invoice
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Project Name</StyledTableCell>
                <StyledTableCell align="right">Client Name</StyledTableCell>
                <StyledTableCell align="right">Rate(S$/hour)</StyledTableCell>
                <StyledTableCell align="right">Time(hours)</StyledTableCell>
                <StyledTableCell align="right">Amount(S$)</StyledTableCell>
                <StyledTableCell align="right">Issue Date</StyledTableCell>
                <StyledTableCell align="right">Payment Status</StyledTableCell>

                <StyledTableCell align="right">View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceList.length !== 0 ? (
                <>
                  {invoiceList.map((i) => (
                    <StyledTableRow key={i.id}>
                      <StyledTableCell component="th" scope="row">
                        {i.project.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {i.project.client.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {i.project.ratePerHour}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {i.chargeable_tasks
                          .reduce((a, b) => a + Number(b.timeSpent), 0)
                          .toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {(
                          i.chargeable_tasks.reduce(
                            (a, b) => a + Number(b.timeSpent),
                            0
                          ) * Number(i.project.ratePerHour)
                        ).toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {moment(i.issueDate).format("YYYY-MM-DD")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {i.isPaid ? <>PAID</> : <>UNPAID</>}
                      </StyledTableCell>
                      {/* <Link href={`/invoices/${i.id}`}>View</Link> */}
                      <StyledTableCell align="right">
                        <VisibilityIcon
                          onClick={() => router.push(`/invoices/${i.id}`)}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </>
              ) : (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    You haven't generated any invoice yet.
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

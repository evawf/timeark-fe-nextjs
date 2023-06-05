"use client";
import React, { useState, useEffect } from "react";
import FetchDashboardData from "../../lib/fetchDashboardData";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar";
import PieChart from "../components/PieChart";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import BarChart from "../components/BarChart";
import moment from "moment";

export default function Dashboard() {
  const [barData, setBarData] = useState<any>([]);
  const router = useRouter();

  const getData = async () => {
    const res = await FetchDashboardData();
    const chartData = res.barChartData;
    chartData.sort((a: any, b: any) => a.issueDate - b.issueDate);
    const data = chartData.map((d: any) => {
      const amount =
        Number(d.project.rate_per_hour) *
        d.chargeable_tasks.reduce(
          (a: any, c: any) => a + Number(c.time_spent),
          0
        );
      return {
        projectName: d.project.name,
        amount: amount,
        issueDate: moment(d.issueDate).format("DD-MM-YYYY"),
      };
    });

    console.log("data: ", data);

    let barCartData = {
      months: [],
      projects: [],
      amount: [],
    };

    setBarData(data);
    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? getData() : router.push("/login");
  }, []);

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ mt: "20px" }}>
          <h2>Dashboard</h2>
        </Box>
        {barData ? (
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <BarChart barData={barData} />
            </Grid>
            <Grid item xs={6}>
              <PieChart />
            </Grid>
            <Grid item xs={6}>
              <PieChart />
            </Grid>
            <Grid item xs={6}>
              <PieChart />
            </Grid>
          </Grid>
        ) : (
          <>Loading</>
        )}
      </Box>
    </Box>
  );
}

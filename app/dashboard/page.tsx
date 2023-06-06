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
  const [barChartData, setBarChartData] = useState<any>({});
  const [dateArr, setDateArr] = useState<any>([]);

  const router = useRouter();

  const getData = async () => {
    const res = await FetchDashboardData();
    const project = res.barChartData.pop();
    console.log("my project:", project);

    const dataPerMonth: any = {};
    project.invoices.forEach((i: any) => {
      if (i.year === 2023) {
        let amount = 0;
        i.chargeable_tasks.forEach((t: any) => {
          amount += t.time_spent * project.rate_per_hour;
        });
        dataPerMonth[i.month] = amount;
      }
    });
    // dataPerMonth = { 1: 12, 5:20, 6:18 }
    const dataArray: any = [];
    for (let i = 1; i <= 12; i++) {
      dataArray.push(dataPerMonth[i]);
    }
    const serie = {
      name: project.name,
      data: dataArray,
    };

    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [serie],
    };
    setBarChartData(data);
    // setDateArr(dateArr);

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
        {barChartData ? (
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <BarChart barChartData={barChartData} />
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

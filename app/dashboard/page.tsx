"use client";
import React, { useState, useEffect } from "react";
import FetchDashboardData from "../../lib/fetchDashboardData";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar";
import PieChart from "../components/PieChart";
import Grid from "@mui/material/Grid";
import BarChart from "../components/BarChart";
import RoseChart from "../components/RoseChart";
import ArcChart from "../components/ArcChart";

export default function Dashboard() {
  const [barChartData, setBarChartData] = useState<any>({});
  const [pieChartData, setPieChartData] = useState<any>([]);
  const [roseChartData, setRoseChartData] = useState<any>([]);
  const [arcChartData, setArcChartData] = useState<any>({});
  const router = useRouter();

  const getData = async () => {
    const res = await FetchDashboardData();

    // Multiple projects data process for Bar Chart:
    const projects = res.barChartData;
    const seriesArr: any = [];
    const pieChartDataArr: any = [];
    const roseChartDataArr: any = [];
    const arcChartData: any = { unpaid: 0, paid: 0 };
    let unpaidValue: any = 0;
    let paidValue: any = 0;

    projects.forEach((p: any) => {
      const dataPerMonth: any = {};
      let totalTime = 0; // pieChart
      p.invoices.forEach((i: any) => {
        // To do: User can change the year to show different year's data
        if (i.year === 2023) {
          let amount = 0;
          i.chargeable_tasks.forEach((t: any) => {
            amount += t.time_spent * p.rate_per_hour;
          });
          dataPerMonth[i.month] = amount.toFixed(2);
        }

        // pieChart: get the sum of total time from each invoice:
        i.chargeable_tasks.forEach((t: any) => {
          totalTime += Number(t.time_spent); // pieChart
        });

        // arcChart: get unpaid value and paid value
        i.chargeable_tasks.forEach((t: any) => {
          if (i.is_paid) {
            paidValue += t.time_spent * p.rate_per_hour;
          } else {
            unpaidValue += t.time_spent * p.rate_per_hour;
          }
        });
      });

      //**************** barChart data *********************
      const dataArray: any = [];
      for (let i = 1; i <= 12; i++) {
        if (dataPerMonth[i]) {
          dataArray.push(dataPerMonth[i]);
        } else {
          dataArray.push(0);
        }
      }
      const serie = {
        name: p.name,
        data: dataArray,
      };
      seriesArr.push(serie);

      // **************** pieChart data *********************
      const amount = totalTime * p.rate_per_hour;
      const pieData = {
        value: amount.toFixed(2),
        name: p.name,
      };
      pieChartDataArr.push(pieData);

      //********************* roseChart data *********************
      const roseData = {
        value: totalTime.toFixed(2),
        name: p.name,
      };
      roseChartDataArr.push(roseData);
    });

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
      series: seriesArr,
    };

    //********************* roseChart data *********************
    arcChartData.unpaid = unpaidValue;
    arcChartData.paid = paidValue;

    setBarChartData(data);
    setPieChartData(pieChartDataArr);
    setRoseChartData(roseChartDataArr);
    setArcChartData(arcChartData);

    return;
  };

  console.log("arcChartData: ", arcChartData);
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
              <PieChart pieChartData={pieChartData} />
            </Grid>
            <Grid item xs={6}>
              <BarChart barChartData={barChartData} />
            </Grid>
            <Grid item xs={6}>
              <RoseChart roseChartData={roseChartData} />
            </Grid>
            <Grid item xs={6}>
              <ArcChart arcChartData={arcChartData} />
            </Grid>
          </Grid>
        ) : (
          <>Loading</>
        )}
      </Box>
    </Box>
  );
}

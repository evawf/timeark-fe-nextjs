import ReactEchart from "echarts-for-react";
import React, { useState, useEffect } from "react";
import FetchDashboardData from "../../lib/fetchDashboardData";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";

const PieChart = () => {
  const [data, setData] = useState({});
  const router = useRouter();

  const getData = async () => {
    const res = await FetchDashboardData();
    return setData(res.msg);
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? getData() : router.push("/login");
  }, []);

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  return (
    <Paper
      elevation={4}
      style={{
        margin: "10px",
        paddingTop: "30px",
        backgroundColor: "#FFFFFF",
        flexGrow: "1",
        borderRadius: "20px",
      }}
    >
      <ReactEchart option={option} />
    </Paper>
  );
};

export default PieChart;

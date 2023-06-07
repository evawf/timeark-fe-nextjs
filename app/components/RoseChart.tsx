import ReactEchart from "echarts-for-react";
import React, { useState, useEffect } from "react";
import FetchDashboardData from "../../lib/fetchDashboardData";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";

interface Props {
  roseChartData: [{ value: number; name: string }];
}

const RoseChart = ({ roseChartData }: Props) => {
  console.log("roseChartData: ", roseChartData);

  const option = {
    legend: {
      top: "top",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [15, 120],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: roseChartData,
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

export default RoseChart;

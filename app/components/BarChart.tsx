import ReactEchart from "echarts-for-react";
import React, { useState, useEffect } from "react";
import FetchDashboardData from "../../lib/user/fetchDashboardData";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import moment from "moment";

interface Props {
  barChartData: [
    {
      name: string;
      type: string;
      data: number;
    }
  ];
}

const BarChart = ({ barChartData }: any) => {
  const router = useRouter();
  const colors = ["#5470C6", "#91CC75", "#EE6666"];
  const series: any = [];

  console.log("barChartData: ", barChartData);
  if (barChartData.series) {
    barChartData.series.forEach((s: any) => {
      series.push({
        name: s.name,
        type: "bar",
        yAxisIndex: 0,
        stack: "total",
        data: s.data,
      });
    });
  }

  const option = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    title: {
      text: "Monthly Income(S$)/Project",
      subtext: "Total time spent for each project",
      left: "center",
    },
    grid: {
      right: "20%",
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      orient: "vertical",
      right: 30,
      top: "center",
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        data: barChartData.labels,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "S$",
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[2],
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
    ],
    series: series,
  };

  return (
    <Paper
      elevation={4}
      style={{
        margin: "5px",
        paddingTop: "30px",
        backgroundColor: "#FFFFFF",
        flexGrow: "1",
        borderRadius: "20px",
      }}
    >
      <ReactEchart option={option} style={{ height: "350px" }} />
    </Paper>
  );
};

export default BarChart;

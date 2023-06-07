import ReactEchart from "echarts-for-react";
import React, { useState, useEffect } from "react";
import FetchDashboardData from "../../lib/fetchDashboardData";
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

  console.log("barChartData: ", barChartData);
  console.log("series: ", series);

  const option = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
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
      //data: projects,
      // data: ["Project 1", "Project 2", "Project 3"],
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        // prettier-ignore
        //data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
    // series: [
    //   {
    //     name: "Project 1",
    //     type: "bar",
    //     // yAxisIndex: 0,
    //     data: [
    //       2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
    //     ],
    //   },
    //   {
    //     name: "Project 2",
    //     type: "bar",
    //     // yAxisIndex: 1,
    //     data: [
    //       2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
    //     ],
    //   },
    //   {
    //     name: "Project 3",
    //     type: "bar",
    //     // yAxisIndex: 2,
    //     data: [
    //       2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
    //     ],
    //   },
    // ],
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

export default BarChart;

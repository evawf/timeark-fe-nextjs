import ReactEchart from "echarts-for-react";
import React from "react";
import Paper from "@mui/material/Paper";

interface Props {
  arcChartData: { paid: number; unpaid: number };
}

const ArcChart = ({ arcChartData }: Props) => {
  const option = {
    title: {
      text: "Paid vs Unpaid",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      right: 30,
      top: "center",
    },
    series: [
      {
        name: "S$",
        type: "pie",
        radius: ["40%", "60%"],
        center: ["50%", "70%"],
        // adjust the start angle
        startAngle: 180,
        label: {
          show: true,
          // formatter(param) {
          //   // correct the percentage
          //   return param.name + " (" + param.percent! * 2 + "%)";
          // },
        },
        data: [
          {
            value: arcChartData.paid,
            name: "Paid",
            itemStyle: {
              color: "green",
              // decal: {
              //   symbol: "none",
              // },
            },
          },
          {
            value: arcChartData.unpaid,
            name: "Unpaid",
            itemStyle: {
              color: "red",
              // decal: {
              //   symbol: "none",
              // },
            },
          },
          {
            // make an record to fill the bottom 50%
            value: arcChartData.paid + arcChartData.unpaid,
            itemStyle: {
              // stop the chart from rendering this piece
              color: "none",
              decal: {
                symbol: "none",
              },
            },
            label: {
              show: false,
            },
          },
        ],
      },
    ],
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

export default ArcChart;

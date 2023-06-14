import ReactEchart from "echarts-for-react";
import React from "react";
import Paper from "@mui/material/Paper";

interface Props {
  pieChartData: [{ value: number; name: string }];
}

const PieChart = ({ pieChartData }: Props) => {
  let totalIncome: any = 0;
  pieChartData.forEach((d) => {
    totalIncome += Number(d.value);
  });

  const option = {
    title: {
      text: `Total Income(S$): ${totalIncome.toFixed(2)} `,
      subtext: "All Projects",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: 50,
      top: "center",
    },
    series: [
      {
        name: "Income(S$)",
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
        data: pieChartData,
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
      <ReactEchart option={option} style={{ height: "400px" }} />
    </Paper>
  );
};

export default PieChart;

import ReactEchart from "echarts-for-react";
import React from "react";
import Paper from "@mui/material/Paper";

interface Props {
  roseChartData: [{ value: number; name: string }];
}

const RoseChart = ({ roseChartData }: Props) => {
  let totalHours: any = 0;
  roseChartData.forEach((d) => {
    totalHours += Number(d.value);
  });

  const option = {
    title: {
      text: `Total Hours(h): ${totalHours.toFixed(2)}`,
      subtext: "Total time spent for each project",
      left: "center",
    },
    legend: {
      orient: "vertical",
      left: 50,
      top: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
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
        name: "Hours",
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

export default RoseChart;

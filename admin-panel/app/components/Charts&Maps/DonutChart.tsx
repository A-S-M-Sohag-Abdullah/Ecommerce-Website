"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type DonutChartProps = {
  value: number;
  label: string;
  color: string;
};

const DonutChart = ({ value, label, color }: DonutChartProps) => {
  const series = [value];
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "60%",
        },
        dataLabels: {
          name: {
            show: false, // hides the default name label
          },
          value: {
            show: true,
            fontSize: "18px",
            fontWeight: 600, // semibold
            color: "#1F2937", // Tailwind's gray-800 (dark)
            offsetY: 5,
            formatter: () => `${value}%`, // hardcoded label
          },
        },
      },
    },
    labels: [""], // Avoid showing duplicate outer label
    colors: [color],
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height={200}
    />
  );
};

export default DonutChart;

"use client";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { ApexOptions } from "apexcharts";
const AverageOrderLineChart = () => {
  const series = [{ name: "Order Value", data: [25, 45, 30, 55, 40, 60, 45,50,75] }];
  const options: ApexOptions = {
    chart: { type: "line", toolbar: { show: false } },
    yaxis: {
      labels: {
        formatter: (value) => `$${value}`, // Add dollar sign
        style: {
          fontSize: "14px",
          colors: "#6B7280", // Optional: Tailwind gray-500
        },
      },
    },
    stroke: { curve: "straight", width: 3 },
    xaxis: {
      categories: ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    colors: ["#1E5EFF"],
    grid: {
      strokeDashArray: 4, // 4px dash, you can adjust this
      borderColor: "#E5E7EB", // Optional: Tailwind gray-200
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={250}
    />
  );
};

export default AverageOrderLineChart;

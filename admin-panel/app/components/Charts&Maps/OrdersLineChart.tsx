"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const OrdersLineChart: React.FC = () => {
  const series = [
    {
      name: "May 22",
      data: [15, 25, 30, 34, 40, 32, 27, 28, 33, 30, 25, 27, 20, 30],
    },
    {
      name: "May 21",
      data: [12, 20, 28, 22, 24, 21, 18, 20, 22, 18, 15, 19, 30, 35],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: 3,
      curve: "straight",
    },
    colors: ["#1E5EFF", "#D9E1EC"], // Tailwind blue-500 and gray-300
    xaxis: {
      categories: [
        "",
        "4 am",
        "5 am",
        "6 am",
        "7 am",
        "8 am",
        "9 am",
        "10 am",
        "11 am",
        "12 pm",
        "1 pm",
        "2 pm",
        "3 pm",
      ],
      labels: {
        style: {
          colors: "#94A3B8", // gray-400
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94A3B8",
        },
      },
    },
    grid: {
      borderColor: "#E2E8F0", // gray-200
    },
    tooltip: {
      theme: "light",
      x: {
        show: true,
        formatter: (val: string | number) => {
          // If your x-axis values are numbers (e.g., 4, 5, 6), convert to '4am', '5am'
          if (typeof val === "number") {
            return `${val}am`;
          }
          // If already a string like '4am', return as is
          return val;
        },
      },
      y: {
        formatter: (val: number) => `${val} orders`, // Customize value text
        title: {
          formatter: (seriesName: string) => `${seriesName}:`,
        },
      },
      style: {
        fontSize: "14px",
        fontFamily: "inherit",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: "#64748B", // gray-500
      },
      markers: {
        shape: "square",
      },
    },
  };
  return (
    <div className="w-11/12 px-3">
      <div className="bg-white py-6 w-full relative">
        <div className="flex justify-between items-center mb-4 w-full">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-5">
              Orders Over Time
            </h3>
            <div className="text-sm text-gray-500 flex absolute left-9 space-x-5">
              <div>
                {" "}
                <h2 className="text-lg text-black font-semibold">645</h2> Orders
                on May 22
              </div>
              <div>
                <h2 className="text-lg text-black font-semibold">472</h2> Orders
                on May 21
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">Last 12 Hours</div>
        </div>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={400}
          width="100%"
        
        />
      </div>
    </div>
  );
};

export default OrdersLineChart;

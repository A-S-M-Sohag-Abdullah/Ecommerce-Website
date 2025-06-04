"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const StoreFunnelChart = () => {
  const values = [420, 320, 230, 160];
  const funnelLabels = ["73%", "65%", "58%", "50%"];
  const categories = [
    "Visited Site",
    "Added to Cart",
    "Proceed to Checkout",
    "Made a Purchase",
  ];

  const series = [
    {
      name: "Conversion",
      data: values,
    },
  ];

  // Create annotations dynamically based on bar height
  const annotations = funnelLabels.map((label, i) => ({
    x: categories[i],
    y: values[i] + 30, // slightly above bar height
    label: {
      text: label,
      borderRadius: 4,
      borderColor: "#2563eb", // Tailwind blue-600
      style: {
        background: "#1f2937", // dark gray
        color: "#fff",
        fontSize: "12px",
        fontWeight: 600,
      },
    },
  }));

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "40%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    annotations: {
      points: annotations,
    },
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
      strokeDashArray: 5,
    },
    colors: ["#2563eb"], // Tailwind blue-600
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-md font-semibold">Store Funnel</h2>
          <p className="text-sm">
            Conversion Rate <span className="font-bold">28%</span>{" "}
            <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded ml-2">
              4% Increase
            </span>
          </p>
        </div>
        <div className="text-sm text-gray-500">Last 7 Days ▼</div>
      </div>

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default StoreFunnelChart;

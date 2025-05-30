"use client";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { ApexOptions } from "apexcharts";
const AgeDistribution = () => {
  const series = [50, 30, 10, 10];
  const options: ApexOptions = {
    labels: ["0-18 years", "18-30 years", "30-40 years", "Other"], // empty labels to avoid showing duplicate outer label
    colors: ["#3B82F6", "#FACC15", "#F97316", "#10B981"],
    stroke: {
      colors: ["#fff"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
      position: "bottom",
      horizontalAlign: "left",
      fontSize: "24px",
      markers: {
        shape: "square", // square markers for legend
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
  const ageGroups = [
    { color: "#3B82F6", label: "0-18 years", value: "50%" },
    { color: "#FACC15", label: "18-30 years", value: "30%" },
    { color: "#F97316", label: "30-40 years", value: "10%" },
    { color: "#10B981", label: "Other", value: "10%" },
  ];

  return (
    <div className="bg-white py-6 rounded-lg shadow-md w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width="100%"
      />

      <ul className="space-y-2 mt-4 px-4">
        {ageGroups.map((group, idx) => (
          <li key={idx} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: group.color }}
              />
              <span className="text-gray-700">{group.label}</span>
            </div>
            <span className="font-semibold text-gray-900">{group.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgeDistribution;

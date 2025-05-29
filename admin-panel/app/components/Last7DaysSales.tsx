"use client";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const series = [
  {
    name: "Revenue",
    data: [1500, 2100, 1900, 3000, 2800, 3200, 3546],
  },
];

const options = {
  chart: {
    id: "last7days",
    toolbar: { show: false },
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  plotOptions: {
    bar: {
      columnWidth: "40%", // adjust bar width here
      borderRadius: 4, // rounded corners if you like
    },
  },
  colors: ["#1FD286"], // customize bar color here
  dataLabels: {
    enabled: false, // hide the numbers on bars
  },
};

export default function Last7DaysSales() {
  return (
    <div className="bg-white w-full py-6">
      <h2 className="text-lg font-semibold">Last 7 Days Sales</h2>
      <p className="text-sm text-gray-500">1,259 Items Sold</p>
      <p className="text-2xl font-bold">$12,546</p>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={400}
         // adjust width as needed
      />
    </div>
  );
}

"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const CustomersBarChart: React.FC = () => {
  const series = [
    {
      name: "Returning Customers",

      data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70],
    },
    {
      name: "New Customers",
      data: [90, 160, 120, 60, 40, 90, 100, 90, 160, 120, 60, 40],
    },
  ];

  const options: ApexOptions = {
    chart: { id: "customerBarChart", toolbar: { show: false } },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%", // adjust bar width here
        borderRadius: 6, // rounded corners if you like
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 7,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} customers`;
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken", // or "lighten"
          // amount to darken or lighten
        },
      },
    },
    colors: ["#D7DBEC", "#1E5EFF"],
    legend: {
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: "#64748B", // gray-500
      },
      markers: {
        shape: "square", // square markers for legend
      },
    },
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-sm w-full">
        <div className="flex justify-between items-center mb-4 w-full">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Customer Growth
            </h3>
          </div>
          <div className="text-sm text-gray-500">Last 12 Hours</div>
        </div>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={400}
          width="100%"
        />
      </div>
    </div>
  );
};

export default CustomersBarChart;

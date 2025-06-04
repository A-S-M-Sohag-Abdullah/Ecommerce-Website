import React from "react";
import CustomersBarChart from "../../components/Charts&Maps/CustomerBarChart";
import SummaryCard from "../../components/Others/SummaryCard";
import DonutChart from "../../components/Charts&Maps/DonutChart";
import AverageOrderLineChart from "../../components/Charts&Maps/AverageOrderLineChart";
import CustomerByMap from "../../components/Charts&Maps/CustomerByMap";
import AgeDistribution from "../../components/Charts&Maps/AgeDistributionChart";
import TopCustomers from "../../components/Tables/TopCustomers";
import TopProducts from "../../components/Tables/TopProducts";
import StoreFunnelChart from "../../components/Charts&Maps/StoreFunnelChart";

function Reports() {
  return (
    <div className="bg-gray-200 p-6 w-full">
      <CustomersBarChart />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 p-6 bg-white rounded-xl">
        <SummaryCard title="Existing Users" value="5.653" growth={5.3} />
        <SummaryCard title="New Users" value="1.650" growth={5.3} />
        <SummaryCard title="Total Visits" value="9.504" growth={-5.3} />
        <SummaryCard title="Unique Visits" value="5.423" growth={-5.3} />
      </div>

      <div className="w-full flex space-x-5 mt-6 h-fit">
        <div className="w-3/12 bg-white rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Sales Goal</h3>
          <DonutChart value={75} label="Sales Goal" color="#FFC700" />{" "}
          <div className="flex justify-between items-center text-sm ">
            <span className="text-gray-400 font-medium">Sold for:</span>
            <span className="font-semibold">$15,000</span>
          </div>
          <div className="flex justify-between items-center text-sm ">
            <span className="text-gray-400 font-medium">Month goal:</span>
            <span className="font-semibold">$20,000</span>
          </div>
          <div className="flex justify-between items-center text-sm ">
            <span className="text-gray-400 font-medium">Left:</span>
            <span className="font-semibold">$5,000</span>
          </div>
        </div>
        <div className="w-3/12 bg-white rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Conversion Rate</h3>
          <DonutChart value={25} label="Sales Goal" color="#1FD286" />{" "}
          <div className="flex justify-between items-center text-sm ">
            <span className="text-gray-400 font-medium">Cart::</span>
            <span className="font-semibold">35%</span>
          </div>
          <div className="flex justify-between items-center text-sm ">
            <span className="text-gray-400 font-medium">Checkout:</span>
            <span className="font-semibold">29%</span>
          </div>
          <div className="flex justify-between items-center text-sm ">
            <span className="text-gray-400 font-medium">Purchase:</span>
            <span className="font-semibold">25%</span>
          </div>
        </div>
        <div className="w-6/12 bg-white rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Average Order Value</h3>

          <AverageOrderLineChart />
        </div>
      </div>

      <div className="w-full mt-6 flex space-x-5 h-fit">
        <CustomerByMap />
        <AgeDistribution />
      </div>
      <div className="w-full flex justify-between items-stretch mt-6 space-x-5">
      <TopCustomers/>
      <TopProducts/>
      </div>

      <div className="w-full">
        <StoreFunnelChart />
      </div>
    </div>
  );
}

export default Reports;

import Image from "next/image";
import ApexCharts from "apexcharts";
import OrdersLineChart from "@/app/components/Charts&Maps/OrdersLineChart";
import Last7DaysSales from "../components/Charts&Maps/Last7DaysSales";
import RecentTransactions from "../components/Tables/RecentTransactions";
import TopProducts from "../components/Tables/TopProducts";

export default function Dashboard() {
  return (
    <>
      <div className="flex  w-full space-x-2">
        <div className="w-3/4 flex-grow-1 flex space-x-0">
          <OrdersLineChart />
        </div>
        <div className="w-1/4 flex-shrink-0">
          <Last7DaysSales />
        </div>
      </div>
      <div className="w-full flex px-6 space-x-5">
        <RecentTransactions />
        <TopProducts />
      </div>
    </>
  );
}

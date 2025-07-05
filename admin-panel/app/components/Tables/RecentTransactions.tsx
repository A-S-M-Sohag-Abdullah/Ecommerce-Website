import { getOrders } from "@/api/orderApi";
import formatDate from "@/lib/dateFormatter";
import { Order } from "@/types";

export default async function RecentTransactions() {
  const { orders } = await getOrders(1, 5);
  const transactions: Order[] = orders;
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-3 w-1/2">
      <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
      <div className="space-y-2">
        <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden text-sm ">
          <thead className="text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-xs">
            {transactions.map((trasaction) => (
              <tr
                key={trasaction._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{trasaction.user.name}</td>
                <td className="px-4 py-2">
                  {formatDate(trasaction.createdAt)}
                </td>
                <td className="px-4 py-2">
                  {trasaction.totalPrice.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 text-sx rounded-sm font-medium ${
                      trasaction.paidStatus
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {trasaction.paidStatus ? "Paid" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

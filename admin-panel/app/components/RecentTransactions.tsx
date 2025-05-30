const transactions = [
  {
    name: "Jugarnath S.",
    date: "24.05.2023",
    amount: "$134.97",
    status: "Paid",
  },
  {
    name: "Anand G.",
    date: "23.05.2023",
    amount: "$157.44",
    status: "Pending",
  },
  { name: "Kartik S.", date: "23.05.2023", amount: "$123.97", status: "Paid" },
  { name: "Rakesh S.", date: "23.05.2023", amount: "$189.55", status: "Paid" },
  { name: "Anup S.", date: "22.05.2023", amount: "$124.86", status: "Paid" },
];

export default function RecentTransactions() {
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
          <tbody className="text-gray-800">
            {transactions.map((tx, idx) => (
              <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">{tx.name}</td>
                <td className="px-4 py-2">{tx.date}</td>
                <td className="px-4 py-2">{tx.amount}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 text-sx rounded-sm font-medium ${
                      tx.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {tx.status}
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

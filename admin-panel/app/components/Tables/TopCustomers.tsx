import React from "react";

function TopCustomers() {
  const Customers = [
    {
      id: 1,
      name: "Rakesh Mishra",
      orders: 5,
      spent: "$99.90",
      image: undefined,
    },
    {
      id: 2,
      name: "Lakshman singh",
      spent: "$49.90",
      orders: 5,
      image: undefined,
    },
    {
      id: 3,
      name: "Dinanath sah",
      spent: "$59.90",
      orders: 5,
      image: undefined,
    },
     {
      id: 4,
      name: "Dinanath sah",
      spent: "$59.90",
      orders: 5,
      image: undefined,
    },
  ];
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-3 w-1/2 h-full">
      <h2 className="text-lg font-semibold mb-2">Top Customers</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Orders</th>
            <th className="px-4 py-2 text-left">Spent</th>
          </tr>
        </thead>
        <tbody>
          {Customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-2 flex items-center gap-2">
                {customer.image ? (
                  <img
                    src={customer.image}
                    alt={customer.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white">{customer.name[0]}</span>
                  </div>
                )}
                <span className=" font-semibold">{customer.name}</span>
              </td>
              <td className="px-4 py-2">{customer.orders}</td>
              <td className="px-4 py-2">{customer.spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopCustomers;

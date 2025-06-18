"use client";

import React, { useEffect, useState } from "react";
import { getOrders } from "@/api/orderApi";
import Link from "next/link";

interface OrderItem {
  product: string;
  name: string;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
}

function Page() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const response = await getOrders();
    if (response?.orders) setOrders(response.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-4">
      {orders?.map((item) => (
        <div key={item._id} className="p-4 rounded-sm bg-gray-200">
          <h2 className="font-bold mb-2">Items:</h2>
          {item.orderItems.map((i) => (
            <div className="flex justify-between" key={i.product}>
              {i.name}
              <Link
                href={`/review/${i.product}`}
                className="bg-red-400 text-white rounded-sm px-3 py-1"
              >
                Give Review
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Page;

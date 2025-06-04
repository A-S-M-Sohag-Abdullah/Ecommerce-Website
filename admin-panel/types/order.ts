export interface Order {
  _id: string;
  user: { name: string; email: string };
  paidStatus: boolean;
  orderStatus: "Ready" | "Shipped" | "Received";
  totalPrice: number;
  createdAt: string;
}

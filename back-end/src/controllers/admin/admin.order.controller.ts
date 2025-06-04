import { Request, Response } from "express";
import Order from "../../models/order.model";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .skip(skip)
      .limit(limit)
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    const total = await Order.countDocuments();

    res.status(200).json({
      success: true,
      orders,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total: total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

export const getLast7DaysSales = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6); // include today, so 7 days total

    const sales = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(sevenDaysAgo.setHours(0, 0, 0, 0)),
            $lte: new Date(now.setHours(23, 59, 59, 999)),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalItems: {
            $sum: {
              $sum: "$orderItems.quantity",
            },
          },
          totalSold: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Ensure all 7 days are represented (even with 0 sales)
    //console.log("Sales data:", sales);
    const result = [];
    const dateMapTotalSold = new Map(sales.map((s) => [s._id, s.totalSold]));
    const dateMapTotalItems = new Map(sales.map((s) => [s._id, s.totalItems]));

    let totalWeekRevenue = 0;
    let totalWeekItems = 0;

    for (let i = 6; i >= 0; i--) {
      /* const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toLocaleDateString("en-US", { weekday: "short" }); */
      const date = new Date();
      date.setDate(date.getDate() - i);
      const keyDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
      const key = date.toLocaleDateString("en-US", { weekday: "short" });
      result.push({
        date: key,
        totalSold: dateMapTotalSold.get(keyDate) || 0,
      });
      totalWeekRevenue += dateMapTotalSold.get(keyDate) || 0;
      totalWeekItems += dateMapTotalItems.get(keyDate) || 0;
    }

    res.json({ graphdata: result, totalWeekRevenue, totalWeekItems });
  } catch (error) {
    console.error("Error getting 7-day sales data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

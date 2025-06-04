import User from "../../models/user.model";
import { Request, Response } from "express";
import Order from "../../models/order.model";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await Order.aggregate([
      {
        $group: {
          _id: "$user",
          totalSpent: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users", // your collection name (usually plural, lowercase)
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          totalSpent: 1,
          totalOrders: 1,
          name: "$user.name", // assuming 'name' field exists
          email: "$user.email", // assuming 'email' field exists
          avatar: "$user.avatar", // assuming 'avatar' field exists
        },
      },
      { $sort: { totalSpent: -1 } }, // optional: sort by most spent
      { $skip: skip },
      { $limit: limit },
    ]);

    const countResult = await Order.aggregate([
      {
        $group: {
          _id: "$userId",
        },
      },
      {
        $count: "totalUsers",
      },
    ]);
    const totalUsers = countResult[0]?.totalUsers || 0;
    const totalPages = Math.ceil(totalUsers / limit);
    res.status(200).json({
      success: true,
      customers: users,
      currentPage: page,
      totalPages: totalPages,
      total: totalUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

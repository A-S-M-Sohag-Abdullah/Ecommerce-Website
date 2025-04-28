import mongoose from "mongoose";
import { seedDatabase } from "../utils/seeder";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
    //await seedDatabase();
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

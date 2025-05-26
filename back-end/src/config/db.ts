import mongoose from "mongoose";
import { importFakeProducts, seedDatabase } from "../utils/seeder";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
    //await seedDatabase();
    //await importFakeProducts();
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

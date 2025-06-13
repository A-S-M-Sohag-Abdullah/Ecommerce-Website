// models/category.model.ts
import mongoose from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  image: string;
  items?: number;
}

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String, required: true },
    items: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;

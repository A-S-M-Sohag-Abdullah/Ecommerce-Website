import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface ShippingAddress {
  companyName?: string;
  streetAddress?: string;
  apartment?: string;
  city?: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  googleId?: string;
  avatar?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  isGoogle?: boolean;
  isAdmin?: boolean;
  phoneNumber?: number;
  shippingAddress?: ShippingAddress;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const shippingAddressSchema = new Schema<ShippingAddress>(
  {
    companyName: { type: String, default: "" },
    streetAddress: { type: String, default: "" },
    apartment: { type: String, default: "" },
    city: { type: String, default: "" },
  },
  { _id: false } // Disable _id for subdocument
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp",
    },
    isGoogle: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    isAdmin: { type: Boolean, default: false },
    phoneNumber: { type: Number },
    shippingAddress: { type: shippingAddressSchema, default: {} },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model<IUser>("User", userSchema);

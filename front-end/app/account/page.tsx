"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { updateUserProfile } from "@/api/userApi";
import { UserType } from "@/types";
import { toast } from "react-toastify";

const Account = () => {
  const user = useSelector(
    (state: RootState) => state.auth.user
  ) as UserType | null;

  const [formData, setFormData] = useState<UserType>({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    avatar: null,
    shippingAddress: {
      companyName: user?.shippingAddress?.companyName || "",
      streetAddress: user?.shippingAddress?.streetAddress || "",
      apartment: user?.shippingAddress?.apartment || "",
      city: user?.shippingAddress?.city || "",
    },
    wishlist: user?.wishlist || [""],
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    group?: string
  ) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({ ...prev, avatar: files[0] }));
    } else if (group) {
      setFormData((prev) => ({
        ...prev,
        [group]: { ...prev[group], [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.newPassword !== formData.confirmNewPassword) {
        toast.error("New Password and confirm password field doesn't match");
        return;
      }
      const response = await updateUserProfile(formData);
      if (response.success) toast.success(response.message);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Phone No:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone No"
            className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 font-medium">Email</label>
        <input
          type="email"
          value={formData.email}
          disabled
          className="w-full px-4 py-2 bg-gray-200 rounded-md cursor-not-allowed"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 font-medium">Avatar</label>
        <input
          type="file"
          name="avatar"
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-200 rounded-md"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 font-bold">Address</label>
        <h3 className="text-sm text-gray-500 mt-3">Company Name:</h3>
        <input
          type="text"
          name="companyName"
          value={formData.shippingAddress?.companyName}
          onChange={(e) => handleChange(e, "shippingAddress")}
          placeholder="Company Name"
          className="w-full px-4 py-2 bg-gray-200 rounded-md"
        />

        <h3 className="text-sm text-gray-500 mt-3">Street Address:</h3>
        <input
          type="text"
          name="streetAddress"
          value={formData.shippingAddress?.streetAddress}
          onChange={(e) => handleChange(e, "shippingAddress")}
          placeholder="Street Address"
          className="w-full px-4 py-2 bg-gray-200 rounded-md"
        />

        <h3 className="text-sm text-gray-500 mt-3">Apartment:</h3>
        <input
          type="text"
          name="apartment"
          value={formData.shippingAddress?.apartment}
          onChange={(e) => handleChange(e, "shippingAddress")}
          placeholder="Apartment"
          className="w-full px-4 py-2 bg-gray-200 rounded-md"
        />

        <h3 className="text-sm text-gray-500 mt-3">City:</h3>
        <input
          type="text"
          name="city"
          value={formData.shippingAddress?.city}
          onChange={(e) => handleChange(e, "shippingAddress")}
          placeholder="City"
          className="w-full px-4 py-2 bg-gray-200 rounded-md"
        />
      </div>

      <div className="mt-6">
        <label className="block text-gray-700 font-medium">
          Password Changes
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Current Password"
          className="w-full px-4 py-2 bg-gray-200 rounded-md mt-2"
        />
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full px-4 py-2 bg-gray-200 rounded-md mt-2"
        />
        <input
          type="password"
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          placeholder="Confirm New Password"
          className="w-full px-4 py-2 bg-gray-200 rounded-md mt-2"
        />
      </div>

      <div className="mt-6 flex justify-end space-x-2">
        <button
          type="button"
          className="px-5 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-red-400 text-white rounded-md hover:bg-red-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Account;

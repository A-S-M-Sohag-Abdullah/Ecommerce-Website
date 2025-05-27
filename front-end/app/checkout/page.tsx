"use client";

import { useEffect, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import CheckoutCart from "@/components/CheckoutCart";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { placeOrder } from "@/api/orderApi";
import { toast } from "react-toastify";

type userType = {
  name: string;
  email: string;
};

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    email: "",
    saveInfo: false,
    paymentMethod: "online",
    coupon: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const auth = useSelector(
    (state: RootState) => state.auth as { user: userType | null }
  );
  const cart = useSelector((state: RootState) => state.cart.items);
  useEffect(() => {
    // You can fetch initial data here if needed
    // For example, fetching user details to pre-fill the form

    const initialData = {
      firstName: auth.user?.name || "",
      companyName: "",
      streetAddress: "",
      apartment: "",
      city: "",
      phoneNumber: "",
      email: auth.user?.email || "",
      paymentMethod: "online",
      saveInfo: true,
    };
    setFormData((prev) => ({ ...prev, ...initialData }));
  }, []);

  const handlePlaceOrder = async () => {
    // You can POST to backend here

    const orderDetails = {
      orderItems: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      paymentMethod: formData.paymentMethod,
      phoneNumber: formData.phoneNumber,
      shippingAddress: {
        companyName: formData.companyName,
        streetAddress: formData.streetAddress,
        apartment: formData.apartment,
        city: formData.city,
      } as {
        companyName: string;
        streetAddress: string;
        apartment: string;
        city: string;
      },
    };

    const res = await placeOrder(orderDetails);

    res && res.success && toast.success("Order placed successfully!");
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <nav className="text-sm text-gray-500 mb-4">
          Account / My Account / Product / View Cart /{" "}
          <span className="text-black font-medium">CheckOut</span>
        </nav>

        <div className="flex space-x-28 w-full">
          <div className="space-y-3 w-1/2">
            <h2 className="text-3xl">Billing Details</h2>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                label="First Name"
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter Your First Name"
              />

              <Input
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter Your Company Name"
              />

              <Input
                label="Street Address"
                required
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                placeholder="Enter Your Street Address"
              />

              <Input
                label="Apartment, floor, etc. (optional)"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                placeholder="Apartment, floor, etc."
              />

              <Input
                label="Town/City"
                required
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter Your Town/City"
              />

              <Input
                label="Phone Number"
                required
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Your Phone Number"
              />

              <Input
                label="Email Address"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email Address"
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                  className="hidden peer"
                />
                <label
                  htmlFor="saveInfo"
                  className="cursor-pointer flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 rounded-md peer-checked:bg-red-400 me-2"
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="fa fa-check text-white hidden peer-checked:block"
                  />
                </label>
                Save this information for faster check-out next time
              </div>
            </form>
          </div>

          <div className="w-1/3 mt-12">
            {/* Product List */}
            <div className="product-list space-y-2 w-full">
              <CheckoutCart></CheckoutCart>
            </div>

            {/* Pricing */}
            <div className="pricing-area mt-4 space-y-2">
              {/* Payment Options */}
              <Radio
                label="Online"
                name="paymentMethod"
                value="online"
                checked={formData.paymentMethod === "online"}
                onChange={handleChange}
              />
              <div className="flex items-center space-x-2 ml-6">
                {[1, 2, 3, 4].map((i) => (
                  <Image
                    key={i}
                    src={`/pay-m-${i}.png`}
                    alt={`payment ${i}`}
                    width={40}
                    height={20}
                  />
                ))}
              </div>

              <Radio
                label="Cash on Delivery"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />

              {/* Coupon */}
              <div className="flex justify-between items-center mt-4">
                <input
                  type="text"
                  name="coupon"
                  value={formData.coupon}
                  onChange={handleChange}
                  placeholder="Coupon Code"
                  className="border rounded-sm outline-0 px-4 h-10"
                />
                <button className="px-4 h-10 bg-red-400 text-white rounded">
                  Apply Coupon
                </button>
              </div>

              <button
                className="w-full h-10 bg-red-400 text-white rounded mt-5"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper Components
const Input = ({ label, required = false, ...props }: any) => (
  <div>
    <label className="block mb-1 text-sm">
      {label}
      {required && <span className="text-red-300">*</span>}
    </label>
    <input
      {...props}
      className="block w-full p-3 rounded-sm bg-gray-100 outline-0 placeholder:text-gray-400"
    />
  </div>
);

const Radio = ({
  label,
  name,
  value,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: any;
}) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden peer"
    />
    <span className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:border-gray-950 peer-checked:[&_span]:opacity-100">
      <span className="w-3 h-3 bg-gray-950 rounded-full opacity-0"></span>
    </span>
    <span className="text-gray-700 font-medium">{label}</span>
  </label>
);

export default CheckoutPage;

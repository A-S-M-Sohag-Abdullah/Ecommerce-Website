import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const CheckoutPage = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <nav className="text-sm text-gray-500 mb-4">
          Account / My Account / Product / View Cart /{" "}
          <span className="text-black font-medium">CheckOut</span>{" "}
        </nav>

        <div className="flex space-x-28 w-full">
          <div className="space-y-3 w-1/2">
            <h2 className="text-3xl">Billing Details</h2>

            <form action="" className="space-y-3">
              <div>
                <label className="block mb-1 text-sm">
                  First Name<span className="text-red-300">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full p-3 rounded-sm bg-gray-100 outline-0 placeholder:text-gray-400"
                  placeholder="Enter Your First Name"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Company Name</label>
                <input
                  type="text"
                  className="block w-full p-3 rounded-sm bg-gray-100 outline-0 placeholder:text-gray-400"
                  placeholder="Enter Your Company Name"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">
                  Street Address<span className="text-red-300">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full p-3 rounded-sm bg-gray-100 outline-0 placeholder:text-gray-400"
                  placeholder="Enter Your Street Address*"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">
                  Apartment, floor, etc. (optional)
                </label>
                <input
                  type="text"
                  className="block w-full p-3 rounded-sm bg-gray-100 outline-0 placeholder:text-gray-400"
                  placeholder="Enter Your Apartment, floor, etc. (optional)"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">
                  Town/City<span className="text-red-300">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full p-3 rounded-sm bg-gray-100 outline-0 placeholder:text-gray-400"
                  placeholder="Enter Your Town/City"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">
                  Phone Numbe<span className="text-red-300">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full p-3 rounded-sm bg-gray-100 outline-0 placeholder:text-gray-400"
                  placeholder="Enter Your Phone Numbe"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">
                  Email Address<span className="text-red-300">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full p-3 rounded-sm bg-gray-100 outline-0 placeholder:text-gray-400"
                  placeholder="Enter Your Email Address"
                />
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="checkbox" className="hidden peer" />
                <label
                  htmlFor="checkbox"
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
            <div className="product-list space-y-2 w-full">
              <div className="product flex justify-between items-center w-full">
                <div className="product-pic-name flex items-center font-medium">
                  <img src="/product.png" alt="" className="me-3 w-12 " /> LCD
                  Monitor
                </div>
                <div className="product-price font-medium">$650</div>
              </div>
              <div className="product flex justify-between items-center w-full">
                <div className="product-pic-name flex items-center font-medium">
                  <Image
                    src={"/product.png"}
                    alt="product image"
                    width={50}
                    height={50}
                    className="me-3 w-12 "
                    priority={true}
                  />
                  LCD Monitor
                </div>
                <div className="product-price font-medium">$650</div>
              </div>
            </div>

            <div className="pricing-area mt-4 space-y-2">
              <div className="subtotal flex justify-between font-medium pb-2 border-b">
                Subtotal <span className="amount">$1750</span>
              </div>

              <div className="shipping flex justify-between font-medium pb-2 border-b ">
                Shipping <span className="amount">Free</span>
              </div>

              <div className="total flex justify-between font-medium pb-2 ">
                Total <span className="amount">$1750</span>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="customRadio"
                  className="hidden peer"
                  id="radio1"
                />
                <span className="w-6 h-6 shrink-0 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:border-gray-950 peer-checked:[&_span]:opacity-100">
                  <span className="w-3 h-3 bg-gray-950 rounded-full opacity-0"></span>
                </span>

                <span className="text-gray-700 font-medium flex justify-between w-full">
                  Online
                  <ul className="flex items-center space-x-2">
                    <li>
                      <Image
                        src="/pay-m-1.png"
                        alt="bkash"
                        width={40}
                        height={20}
                        priority={true}
                      />
                    </li>
                    <li>
                      <Image
                        src="/pay-m-2.png"
                        alt="bkash"
                        width={40}
                        height={20}
                        priority={true}
                      />
                    </li>
                    <li>
                      <Image
                        src="/pay-m-3.png"
                        alt="bkash"
                        width={40}
                        height={20}
                        priority={true}
                      />
                    </li>
                    <li>
                      <Image
                        src="/pay-m-4.png"
                        alt="bkash"
                        width={40}
                        height={20}
                        priority={true}
                      />
                    </li>
                  </ul>
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="customRadio"
                  className="hidden peer"
                  id="radio1"
                />
                <span className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:border-gray-950 peer-checked:[&_span]:opacity-100">
                  <span className="w-3 h-3 bg-gray-950 rounded-full opacity-0"></span>
                </span>

                <span className="text-gray-700 font-medium ">
                  Cash on Delivery{" "}
                </span>
              </label>

              <div className="flex justify-between items-center mt-4">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="border rounded-sm outline-0 px-4 h-10"
                />

                <button className="px-4 h-10 bg-red-400 text-white rounded cursor-pointer">
                  Apply Coupon
                </button>
              </div>

              <button className="w-full h-10 bg-red-400 text-white rounded mt-5 cursor-pointer">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;

import Image from "next/image";

const cart = () => {
  return (
    <section>
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-md">
        <nav className="text-sm text-gray-500 mb-4">Home / Cart</nav>

        <div className="grid grid-cols-4 gap-y-6">
          <div className="flex items-center gap-4">
            <p className="font-semibold">Product</p>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <p className="font-semibold">Price</p>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <p className="font-semibold">Quantity</p>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <p className="font-semibold">Subtotal</p>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src={"/product.png"}
              alt="product image"
              width={50}
              height={50}
              className="me-3 w-12 "
              priority={true}
            />

            <div>
              <h3 className="font-semibold">Hi Gamepad</h3>
              <p className="text-gray-500">$150</p>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <p className="font-semibold">$850</p>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <input
              type="number"
              value="1"
              className="w-12 border text-center"
            />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <p className="font-semibold">$850</p>
          </div>

          <div className="flex items-center gap-4">
            <Image
              src={"/product.png"}
              alt="product image"
              width={50}
              height={50}
              className="me-3 w-12 "
              priority={true}
            />
            <div>
              <h3 className="font-semibold">Hi Gamepad</h3>
              <p className="text-gray-500">$150</p>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <p className="font-semibold">$850</p>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <input
              type="number"
              value="1"
              className="w-12 border text-center"
            />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <p className="font-semibold">$850</p>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-pointer">
            Return To Shop
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-pointer">
            Update Cart
          </button>
        </div>

        <div className="flex justify-between items-center mt-6">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border p-2 w-1/2"
          />
          <button className="px-4 py-2 bg-red-400 text-white rounded cursor-pointer">
            Apply Coupon
          </button>
        </div>

        <div className="mt-6 p-4 border rounded-md w-1/2 ms-auto">
          <h2 className="text-lg font-bold">Cart Total</h2>
          <p className="flex justify-between">
            <span>Subtotal:</span> <span>$1150</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping:</span> <span>Free</span>
          </p>
          <p className="flex justify-between font-bold text-lg">
            <span>Total:</span> <span>$1150</span>
          </p>
          <button className="w-full mt-4 bg-red-400 text-white py-2 rounded cursor-pointer">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default cart;

import ApplyCoupon from "@/components/CartPageComponents/ApplyCoupon";
import CartItems from "@/components/CartPageComponents/CartItems";
import CartTotal from "@/components/CartPageComponents/CartTotal";

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

          <CartItems />
        </div>

        <div className="flex justify-between mt-6">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-pointer">
            Return To Shop
          </button>
        </div>

        <ApplyCoupon></ApplyCoupon>

        <CartTotal />
      </div>
    </section>
  );
};

export default cart;

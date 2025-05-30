export default function CreateCouponPage() {
  return (
    <div className="p-6 w-full bg-gray-100 mx-auto space-y-6">
      <button className="text-blue-600 hover:underline">&larr; Back</button>
      <h1 className="text-2xl font-semibold">Create Coupon</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-2">Coupon Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Coupon Name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Coupon Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Fixed Discount",
              "Percentage Discount",
              "Free Shipping",
              "Price Discount",
            ].map((type, idx) => (
              <button
                key={idx}
                className="border border-blue-500 text-blue-500 rounded px-4 py-2 text-sm hover:bg-blue-50"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Discount Value"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
            <option>Applies to</option>
            <option>All Products</option>
            <option>Specific Category</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Amount of uses"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>Don't set duration</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>Don't limit amount of uses</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-4 py-2">
          Cancel
        </button>
        <button className="bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2">
          Save
        </button>
      </div>
    </div>
  );
}

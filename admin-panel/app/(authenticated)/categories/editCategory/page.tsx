import Image from "next/image";

export default function EditCategoryPage() {
  return (
    <div className="p-6 w-full mx-auto space-y-6 bg-gray-100">
      <button className="text-gray-600 hover:underline">&larr; Back</button>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Women Clothes</h1>
        <div className="flex justify-end space-x-2">
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-4 py-2">
            Cancel
          </button>
          <button className="bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2">
            Save
          </button>
        </div>
      </div >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium">
            Products <span className="text-sm text-gray-500">12</span>
          </h2>
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border border-gray-200 rounded p-2"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded"></div>
                <span>Women White T-Shirt</span>
              </div>
              <div className="flex items-center space-x-5 pe-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/edit.svg"}
                    alt="Edit"
                  />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  {" "}
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/delete.svg"}
                    alt="Edit"
                  />
                </button>
              </div>
            </div>
          ))}
          <button className="text-blue-600 text-sm hover:underline">
            + Add Product
          </button>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-lg shadow h-fit sticky top-16">
       
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Category Info</h2>
            <input
              type="text"
              placeholder="Category Name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              defaultValue="Women Clothes"
            />
            <div className="border border-dashed rounded-md p-6 text-center cursor-pointer text-sm text-gray-500">
              <p>Drag and drop files or click to add</p>
              <button className="mt-2 bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2">
                Add File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

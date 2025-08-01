import { Product } from "@/types";

type Props = {
  product: Product;
};

export default function ProductDetailsForm({ product }: Props) {
  return (
    <form>
      <div className="mt-4">
        <span className="text-gray-700 font-semibold">Colours:</span>
        <div className="flex space-x-2 mt-2">
         

          {product.color.map((c, i) => {
            return (
              <label key={i} htmlFor={c}>
                <input
                  type="radio"
                  name="color"
                  id={c}
                  className="hidden peer"
                />
                <span
                  className={`block w-6 h-6 rounded-full cursor-pointer border-2 border-transparent peer-checked:border-red-400`}
                  style={{ backgroundColor: c }}
                ></span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <span className="text-gray-700 font-semibold">Size:</span>

        {product.size.map((s, i) => {
          return (
            <label key={i} htmlFor={s}>
              <input type="radio" name="size" id={s} className="hidden peer" />
              <span className="cursor-pointer px-3 py-1 border rounded text-sm peer-checked:bg-red-400 peer-checked:text-white peer-checked:border-red-400">
                {s}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <span className="text-gray-700 font-semibold">Quantity:</span>
        <input
          type="number"
          defaultValue={1}
          min={1}
          className="w-16 border p-1 text-center rounded outline-0"
        />
      </div>

      <button className="mt-4 w-full bg-red-400 text-white py-2 rounded hover:bg-red-500 cursor-pointer">
        Buy Now
      </button>
    </form>
  );
}

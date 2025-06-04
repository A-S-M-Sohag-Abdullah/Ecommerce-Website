import { getTopProducts } from "@/api/productApi";
import { TopProduct } from "@/types";

export default async function TopProducts() {
  const { topProducts } = await getTopProducts();
  const products: TopProduct[] = topProducts;
  console.log("Top Products:", products);
  return (
    <div className="bg-white p-6  rounded-lg border border-gray-200 shadow-sm mb-3 w-1/2 h-fit">
      <h2 className="text-lg font-semibold mb-2">Top Products by Units Sold</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Units Sold</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr
              key={prod._id}
              className="border-t border-gray-200 hover:bg-gray-50 text-xs"
            >
              <td className="px-4 py-2">{prod.name.slice(0,15)}...</td>
              <td className="px-4 py-2">{prod.price}</td>
              <td className="px-4 py-2">{prod.totalSold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

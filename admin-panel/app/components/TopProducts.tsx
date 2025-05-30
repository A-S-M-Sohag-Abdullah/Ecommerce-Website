const products = [
  { name: "Men Grey Hoodies", units: 204, price: "$140" },
  { name: "Women Striped T-Shirt", units: 204, price: "$120" },
  { name: "Men Black T-Shirt", units: 204, price: "$110" },
  { name: "Women White T-Shirt", units: 204, price: "$130" },
  { name: "Women Red T-Shirt", units: 155, price: "$140" },
];

export default function TopProducts() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-3 w-1/2 h-full">
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
          {products.map((prod, idx) => (
            <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">{prod.name}</td>
              <td className="px-4 py-2">{prod.price}</td>
              <td className="px-4 py-2">{prod.units}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

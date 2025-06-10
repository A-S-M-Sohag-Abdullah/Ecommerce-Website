import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

function Categories() {
  // Sample categories data
  const categories = [
    { id: 1, name: "Hoodies", image: "/categories/hoodie.png", items: 12 },
    {
      id: 2,
      name: "T-Shirts",
      image: "/categories/tshirt-striped.png",
      items: 12,
    },
    {
      id: 3,
      name: "Accessories",
      image: "/categories/accessories.png",
      items: 12,
    },
    { id: 4, name: "Footwear", image: "/categories/footwear.png", items: 12 },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      {" "}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold">Categories</h2>
        <div className="flex gap-2">
          <Link href={'/categories/addCategory'} className="px-6 py-2 bg-[#1E5EFF] text-white rounded hover:bg-blue-700 text-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faPlus} className="text-sm w-5" /> Add
            Category
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg overflow-hidden shadow-md mb-4 flex flex-col  flex-wrap"
          >
            <div className="w-full flex-shrink-0 relative group">
              <img
                src={category.image}
                alt={category.name}
                className="w-full object-cover"
              />
              <div className="w-full h-full absolute top-0 left-0 bg-[#00000084] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white text-blue-600 rounded flex items-center gap-2 hover:bg-gray-100">
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/edit.svg"}
                    alt="Edit"
                  />{" "}
                  Edit
                </button>
              </div>
            </div>

            <div className="flex-1 p-5">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-gray-500"> {category.items} Items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;

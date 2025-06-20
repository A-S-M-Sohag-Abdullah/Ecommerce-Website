import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/api/categoryApi";
import { Category } from "@/types";

async function Categories() {
  // Sample categories data
  const categories: Category[] = (await getCategories()) || [];

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      {" "}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold">Categories</h2>
        <div className="flex gap-2">
          <Link
            href={"/categories/addCategory"}
            className="px-6 py-2 bg-[#1E5EFF] text-white rounded hover:bg-blue-700 text-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} className="text-sm w-5" /> Add
            Category
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-lg overflow-hidden shadow-md mb-4 flex flex-col  flex-wrap"
          >
            <div className="w-full flex-shrink-0 relative group">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${category.image}`}
                width={100}
                height={100}
                alt={category.name}
                className="w-full h-44"
              />
              <div className="w-full h-full absolute top-0 left-0 bg-[#00000084] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  href={`/categories/editCategory?category=${category.name}`}
                  className="px-4 py-2 bg-white text-blue-600 rounded flex items-center gap-2 hover:bg-gray-100"
                >
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/edit.svg"}
                    alt="Edit"
                  />{" "}
                  Edit
                </Link>
              </div>
            </div>

            <div className="flex-1 p-5">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-gray-500">{category.items} Items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;

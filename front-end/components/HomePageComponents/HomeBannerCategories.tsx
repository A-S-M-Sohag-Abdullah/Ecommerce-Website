import { getCategories } from "@/api/categoruApi";
import { category } from "@/types";
import Link from "next/link";

const HomeBannerCategories = async () => {
  const categories: category[] = (await getCategories()) || [];

  return (
    <ul className="space-y-3 text-sm font-medium [&>li>a:hover]:font-semibold [&>li>a]:hover:text-red-600 [&>li>a]:transition-all">
      {categories.map((category) => (
        <li key={category._id}>
          <Link href={`/products?category=${category.name}`}>
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HomeBannerCategories;

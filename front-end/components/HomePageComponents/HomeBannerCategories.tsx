
import axios from "axios";

const fetchCategories = async (): Promise<string[] | null> => {
  try {
    const response = await axios.get("");
    return response.data;
  } catch (error) {
    console.log("Error fetching categories:",error);
    return null;
  }
};

const HomeBannerCategories = async () => {
  const categories: string[] = (await fetchCategories()) || [
    "woman's fashion",
    "Men's fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];

  return (
    <ul className="space-y-3 text-sm font-medium [&>li>a:hover]:font-semibold [&>li>a]:hover:text-red-600 [&>li>a]:transition-all">
      {categories.map((category, index) => (
        <li key={index}>
          <a href="">{category}</a>
        </li>
      ))}
    </ul>
  );
};

export default HomeBannerCategories;

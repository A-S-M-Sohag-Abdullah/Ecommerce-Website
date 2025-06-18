import { category, Product } from "@/types"; // your product type

import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "@/components/HomePageComponents/AddToCartBtn";
import AddtoWishListBtn from "@/components/HomePageComponents/AddtoWishListBtn";
import { searchProducts } from "@/api/productApi";
import CategorySelector from "@/components/Others/CategorySelector";
import { getCategories } from "@/api/categoruApi";

interface SearchParams {
  searchParams: Promise<{ query: string; category: string }>;
}

export default async function SearchPage({ searchParams }: SearchParams) {
  const { query, category } = await searchParams;
  const products = await searchProducts(query, category);

  const categories: category[] = await getCategories();

  return (
    <div>
      <CategorySelector categories={categories}></CategorySelector>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product: Product) => (
          <div key={product._id} className="w-full">
            <div className="rounded-sm overflow-hidden w-full aspect-square relative flex items-center justify-center bg-gray-200 group">
              {product.images.length > 0 && (
                <Image
                  src={`${product.images[0]}`}
                  alt="product picture"
                  width={100}
                  height={100}
                  className="w-3/4"
                />
              )}
              <AddToCartBtn product={product} />
              <AddtoWishListBtn productId={product._id} />
            </div>

            <Link
              href={`/products/${product._id}`}
              className="font-medium mt-2"
            >
              {product.name}
            </Link>
            <p className="text-red-400 font-medium">
              ${product.price}{" "}
              <span className="ms-1 line-through text-gray-400">$160</span>
            </p>
            <div className="flex space-x-1">
              {Array.from({ length: Math.round(product.rating) }).map(
                (_, starIndex) => (
                  <Image
                    key={starIndex}
                    src="/gold-star.png"
                    alt="Gold Star"
                    width={15}
                    height={15}
                    className="object-contain"
                  />
                )
              )}
              <div className="text-gray-400 font-medium">
                ({product.numReviews})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

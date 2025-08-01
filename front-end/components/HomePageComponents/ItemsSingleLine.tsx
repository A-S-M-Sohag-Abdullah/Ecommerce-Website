import { getProducts } from "@/api/productApi";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import { Product } from "@/types";
import AddtoWishListBtn from "./AddtoWishListBtn";

const ItemsSingleLine = async () => {
  const products: Product[] = await getProducts() || [];
  return (
    <section>
      <div className="container mx-auto my-5 ">
        <div className="grid space-x-10 flex-wrap space-y-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {products.map((product) => (
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
    </section>
  );
};

export default ItemsSingleLine;

import { getProducts } from "@/api/productApi";
import { get } from "http";
import Image from "next/image";

interface product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ItemsSingleLine = async () => {
  const products: product[] = await getProducts();
  return (
    <section>
      <div className="container mx-auto my-5 ">
        <div className="grid space-x-10 flex-wrap space-y-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {products.map((product, index) => (
            <div key={product.id} className="w-full">
              <div className="rounded-sm overflow-hidden w-full aspect-square relative flex items-center justify-center bg-gray-200 group">
                <Image
                  src={product.image}
                  alt="product picture"
                  width={100}
                  height={100}
                  className="w-3/4"
                />
                <div className="absolute bottom-0 left-0 bg-black text-white text-center w-full h-10 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  Add to cart
                </div>
                <button className="rounded-full size-7 flex items-center justify-center bg-white absolute top-3 right-3 cursor-pointer">
                  <Image
                    src="/add-to-fav.png"
                    alt="add to favourite"
                    width={15}
                    height={15}
                    className="object-contain"
                  />
                </button>
              </div>

              <h3 className="font-medium mt-2">{product.title}</h3>
              <p className="text-red-400 font-medium">
                ${product.price}{" "}
                <span className="ms-1 line-through text-gray-400">$160</span>
              </p>
              <div className="flex space-x-1">
                {Array.from({ length: Math.round(product.rating.rate) }).map(
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
                  ({product.rating.count})
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

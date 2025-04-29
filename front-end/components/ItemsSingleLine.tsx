import Image from "next/image";

type Props = {
  items: string[];
};

const ItemsSingleLine = () => {
  return (
    <section>
      <div className="container mx-auto my-5 ">
        <div className="grid space-x-10 flex-wrap space-y-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">  
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-full">
              <div className="rounded-sm overflow-hidden w-full aspect-square relative flex items-center justify-center bg-gray-200 group">
                <Image
                  src="/product.png"
                  alt="Gold Star"
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

              <h3 className="font-medium mt-2">HAVIT HV-G92 Gamepad</h3>
              <p className="text-red-400 font-medium">
                $130{" "}
                <span className="ms-1 line-through text-gray-400">$160</span>
              </p>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Image
                    key={starIndex}
                    src="/gold-star.png"
                    alt="Gold Star"
                    width={15}
                    height={15}
                    className="object-contain"
                  />
                ))}
                <div className="text-gray-400 font-medium">(88)</div>
              </div>
            </div>
          ))}

          {/* <div className="size-1/5">
            <div className="rounded-sm overflow-hidden w-full aspect-square relative flex items-center justify-center bg-gray-200 group">
              <img
                src="./image/product.png"
                alt="product picture"
                className="size-1/2"
              />
              <div className="absolute bottom-0 left-0 bg-black text-white text-center w-full h-10 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                Add to cart
              </div>
              <button className="rounded-full size-7 flex items-center justify-center bg-white absolute top-3 right-3 cursor-pointer">
                <img src="./image/add-to-fav.svg" alt="" />
              </button>
            </div>
            <h3 className="font-medium">HAVIT HV-G92 Gamepad</h3>
            <p className="text-red-400 font-medium">
              $130 <span className="ms-1 line-through text-gray-400">$160</span>
            </p>
            <div className="flex space-x-1">
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <div className="text-gray-400 font-medium">(88)</div>
            </div>
          </div>
          <div className="size-1/5">
            <div className="rounded-sm overflow-hidden w-full aspect-square relative flex items-center justify-center bg-gray-200 group">
              <img
                src="./image/product.png"
                alt="product picture"
                className="size-1/2"
              />
              <div className="absolute bottom-0 left-0 bg-black text-white text-center w-full h-10 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                Add to cart
              </div>
              <button className="rounded-full size-7 flex items-center justify-center bg-white absolute top-3 right-3 cursor-pointer">
                <img src="./image/add-to-fav.svg" alt="" />
              </button>
            </div>
            <h3 className="font-medium">HAVIT HV-G92 Gamepad</h3>
            <p className="text-red-400 font-medium">
              $130 <span className="ms-1 line-through text-gray-400">$160</span>
            </p>
            <div className="flex space-x-1">
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <div className="text-gray-400 font-medium">(88)</div>
            </div>
          </div>
          <div className="size-1/5">
            <div className="rounded-sm overflow-hidden w-full aspect-square relative flex items-center justify-center bg-gray-200 group">
              <img
                src="./image/product.png"
                alt="product picture"
                className="size-1/2"
              />
              <div className="absolute bottom-0 left-0 bg-black text-white text-center w-full h-10 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                Add to cart
              </div>
              <button className="rounded-full size-7 flex items-center justify-center bg-white absolute top-3 right-3 cursor-pointer">
                <img src="./image/add-to-fav.svg" alt="" />
              </button>
            </div>
            <h3 className="font-medium">HAVIT HV-G92 Gamepad</h3>
            <p className="text-red-400 font-medium">
              $130 <span className="ms-1 line-through text-gray-400">$160</span>
            </p>
            <div className="flex space-x-1">
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <div className="text-gray-400 font-medium">(88)</div>
            </div>
          </div>
          <div className="size-1/5">
            <div className="rounded-sm overflow-hidden w-full aspect-square relative flex items-center justify-center bg-gray-200 group">
              <img
                src="./image/product.png"
                alt="product picture"
                className="size-1/2"
              />
              <div className="absolute bottom-0 left-0 bg-black text-white text-center w-full h-10 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                Add to cart
              </div>
              <button className="rounded-full size-7 flex items-center justify-center bg-white absolute top-3 right-3 cursor-pointer">
                <img src="./image/add-to-fav.svg" alt="" />
              </button>
            </div>
            <h3 className="font-medium">HAVIT HV-G92 Gamepad</h3>
            <p className="text-red-400 font-medium">
              $130 <span className="ms-1 line-through text-gray-400">$160</span>
            </p>
            <div className="flex space-x-1">
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <Image
                src="/gold-star.png"
                alt="Gold Star"
                width={15}
                height={15}
                className="object-contain"
              />
              <div className="text-gray-400 font-medium">(88)</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ItemsSingleLine;

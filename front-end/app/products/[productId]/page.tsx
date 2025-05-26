import { getProductById } from "@/api/productApi";
import ProductDetailsForm from "@/components/ProductDetailsForm";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: {
    productId: string;
  };
};




const productDetails = async ({ params }: Props) => {
  const { productId } = params;
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="flex flex-col space-y-4">
            <Image
              src={product.image}
              alt="Gamepad"
              width={800}
              height={600}
              className="w-full rounded-lg shadow-2xl"
            />
            <div className="hidden space-x-4 [&>img]:flex-auto">
              <Image
                src="/thumb-1.png"
                alt="Thumb 1"
                width={64}
                height={64}
                className="w-16 aspect-square rounded-lg shadow-2xl cursor-pointer"
              />
              <Image
                src="/thumb-2.png"
                alt="Thumb 2"
                width={64}
                height={64}
                className="w-16 aspect-square rounded-lg shadow-2xl cursor-pointer"
              />
              <Image
                src="/thumb-3.png"
                alt="Thumb 3"
                width={64}
                height={64}
                className="w-16 aspect-square rounded-lg shadow-2xl cursor-pointer"
              />
              <Image
                src="/thumb-4.png"
                alt="Thumb 4"
                width={64}
                height={64}
                className="w-16 aspect-square rounded-lg shadow-2xl cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-2 text-yellow-500 mt-2">
            <span className="flex items-center space-x-1">
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
            </span>
            <span className="text-gray-500 text-sm">
              ({product.rating.count} Reviews)
            </span>
          </div>
          <p className="text-gray-600 mt-4">${product.price}</p>
          <p className="text-sm text-gray-500 mt-2">{product.description}</p>

          <ProductDetailsForm />

          <div className="mt-6 text-sm text-gray-600 border-t pt-4">
            <p>✅ Free Delivery</p>
            <p>✅ Return Delivery (Easy 30 Days Return &amp; Refund)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default productDetails;

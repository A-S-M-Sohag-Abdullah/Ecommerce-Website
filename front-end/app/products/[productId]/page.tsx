import { getProductById } from "@/api/productApi";
import ProductDetailsForm from "@/components/ProductComponents/ProductDetailsForm";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ productId: string }>;
};

const productDetails = async ({ params }: Props) => {
  const { productId } = await params;
  const product = await getProductById(productId);
  console.log(product);
  if (!product) {
    notFound();
  }
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="flex flex-col space-y-4">
            {product.images.length > 0 && (
              <Image
                src={`${product.images[0]}`}
                alt="product picture"
                width={100}
                height={100}
                className="w-3/4"
              />
            )}
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
            </span>
            <span className="text-gray-500 text-sm">
              ({product.numReviews} Reviews)
            </span>
          </div>
          <p className="text-gray-600 mt-4">${product.price}</p>
          <p className="text-sm text-gray-500 mt-2">{product.description}</p>

          <ProductDetailsForm product={product} />

          <div className="mt-6 text-sm text-gray-600 border-t pt-4">
            <p>✅ Free Delivery</p>
            <p>✅ Return Delivery (Easy 30 Days Return &amp; Refund)</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        {product.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          product.reviews.map((review) => (
            <div
              key={review.user}
              className="border border-gray-300 rounded p-4 mb-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">{review.name}</h3>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      key={review.user + i}
                      className={`cursor-pointer transition-colors text-2xl ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString()
                  : "Unknown date"}
              </p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default productDetails;

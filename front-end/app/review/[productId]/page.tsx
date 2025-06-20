"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import { getProductById, sendReview } from "@/api/productApi";
import Image from "next/image";
import { toast } from "react-toastify";

const ReviewPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<Product>();
  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Placeholder logic - replace with actual API call
    console.log({ rating, comment });
    try {
      const response = await sendReview(productId, { rating, comment });
      if (response.success) {
        setRating(0);
        setComment("");
        toast.success("Review Added Successfully");
      }
    } catch (error) {
      console.log(error);
    }
    // Reset form
  };

  const fetchProduct = useCallback(async () => {
    try {
      const response = await getProductById(productId);
      if (response) setProduct(response);
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <section className="py-10 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Write a Review</h1>
      {product && <h2 className="text-3xl font-semibold">{product.name}</h2>}
      {product && product.images.length > 0 && (
        <Image
          src={`${product.images[0]}`}
          alt="product picture"
          width={100}
          height={100}
          className="w-3/4"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">Your Rating:</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                icon={faStar}
                key={star}
                className={`cursor-pointer transition-colors text-2xl ${
                  (hovered ?? rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-lg font-medium mb-2">
            Your Comment:
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Write your thoughts about the product..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-red-400 text-white px-6 py-2 rounded-md hover:bg-red-500 transition"
        >
          Submit Review
        </button>
      </form>
    </section>
  );
};

export default ReviewPage;

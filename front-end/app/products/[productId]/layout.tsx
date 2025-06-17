import React from "react";
import { getProductById } from "@/api/productApi";
import type { Metadata  } from "next";

type Props = {
  params: Promise<{ productId: string }>;
};

// Correct typing for generateMetadata
export async function generateMetadata(
  { params }: Props

): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProductById(productId);

  return {
    title: `${product?.name} | Exclusive`,
    description: product?.description,
    openGraph: {
      title: product?.name,
      description: product?.description,
      images: product?.images || [],
    },
  };
}

// Layout component
export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

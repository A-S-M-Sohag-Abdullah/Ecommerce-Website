import { getProductById } from "@/api/productApi";
import { Metadata } from "next";

type Props = {
  params: {
    productId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = params;
  const product = await getProductById(productId);

  return {
    title: `${product?.name} | Exclusive`,
    description: product?.description,
    openGraph: {
      title: product?.name,
      description: product?.description,
      images: [product?.image!],
    },
  };
}

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

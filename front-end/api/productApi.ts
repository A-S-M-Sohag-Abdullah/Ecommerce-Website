interface Product {
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

export const getProducts: () => Promise<Product[]> = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store", // SSR — no caching
    });

    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
    
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

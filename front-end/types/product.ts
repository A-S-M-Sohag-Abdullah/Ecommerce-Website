export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  size: string[];
  color: string[];
  rating: {
    rate: number;
    count: number;
  };
}

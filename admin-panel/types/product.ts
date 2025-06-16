export interface TopProduct {
  _id: string;
  name: string;
  price: number;
  totalSold: number;
}

export interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  countInStock: number;
  category: string;
  color?: string[];
  size?: string[];
  tags?: string[];
  discountPrice?: number;
  rating: {
    rate: number;
    count: number;
  };
}

interface IReview {
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: string[];
  size: string[];
  color: string[];
  tags?: string[];
  reviews: IReview[];
  rating: number;
  numReviews: number;
}

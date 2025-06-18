export interface UserType {
  _id?: string;
  name: string;
  email: string;
  avatar?: File | null;
  phone?: string;
  shippingAddress?: {
    companyName?: string;
    streetAddress?: string;
    apartment?: string;
    city?: string;
  };
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  wishlist: string[];
  [key: string]: any; // allow any additional dynamic fields
}

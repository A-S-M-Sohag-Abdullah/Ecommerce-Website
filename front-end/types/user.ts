export interface UserType {
  _id?: string;
  name: string;
  email: string;
  avatar?: File | null;
  phone?: string;
  address?: {
    company?: string;
    street?: string;
    apartment?: string;
    city?: string;
  };
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  [key: string]: any; // allow any additional dynamic fields
}

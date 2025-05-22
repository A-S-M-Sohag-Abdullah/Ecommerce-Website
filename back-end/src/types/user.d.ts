
export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  isGoogle?: boolean;
  // Add any other custom fields here
}
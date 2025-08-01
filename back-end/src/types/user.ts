export interface UserPayload {
  id: string;
}

export interface IUser {
  _id: string;
  name: string;
  googleId:string;
  email: string;
  avatar?: string;
  isGoogle?: boolean;
  // Add any other custom fields here
}
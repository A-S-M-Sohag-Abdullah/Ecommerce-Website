import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

import jwt, { Jwt } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isValidToken = (token: string, secret: string): boolean => {
  return jwt.verify(
    token,
    secret,
    (error, decoded) => {
      if (error) return false;
      return true;
    }
  );
};

export default isValidToken;

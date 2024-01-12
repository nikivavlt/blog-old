import jwt, { Jwt } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// verifyToken ...
const isValidToken = (token: string, secret: string): boolean => {
  return jwt.verify(
    token,
    secret,
    (error, decoded) => {
      // if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
      if (error) return false;
      return true;
    }
  );
};

export default isValidToken;

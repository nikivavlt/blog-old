import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateAccessToken = (username: string, role: string): string => {
  const token = jwt.sign({ username, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  return token;
};

const generateRefreshToken = (username: string): string => {
  const token = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
  return token;
};

export {
  generateAccessToken,
  generateRefreshToken
};

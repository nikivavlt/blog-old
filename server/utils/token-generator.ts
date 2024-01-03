import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// generate random key and add additional data for token creation (id + smth..)
const generateAccessToken = (id: number, username: string, role: string): string => {
  const token = jwt.sign({ id, username, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
  return token;
};

const generateRefreshToken = (id: number, username: string, role: string): string => {
  const token = jwt.sign({ id, username, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
  return token;
};

export {
  generateAccessToken,
  generateRefreshToken
};

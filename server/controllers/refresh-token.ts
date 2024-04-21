import { deleteRefreshToken, getRefreshToken } from '../models/Token.js';
import { generateAccessToken } from '../utils/token-generator.js';
import jwt from 'jsonwebtoken';
import isValidToken from '../utils/token-verifier.js';

const handleRefreshToken = (request, response) => {
  // const authenticationHeader = request.headers.authorization || request.headers.Authorization;
  const refreshToken = request.cookies['refresh_token'];
  if (!refreshToken) return response.status(401).json('Unauthorized!');

  // const accessToken = authenticationHeader.split(' ')[1];
  const { id: userId, username, role } = jwt.decode(refreshToken); // use verify instead

  getRefreshToken(userId, (error, databaseRefreshToken) => {
    if (error !== null) console.log(error); // return 403 if not exists cookie

    const isTokensEqual = (refreshToken === databaseRefreshToken);

    if (!isTokensEqual) return response.status(401).json('Invalid refresh token.');

    if (
      !isValidToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    ) {
      deleteRefreshToken(userId, (error, data) => {
        if (error !== null) console.log(error);
      });

      return response.clearCookie('refresh_token', {
        httpOnly: true,
        sameSite: 'none', // strict instead
        secure: true
      }).status(401).json('Refresh token expired.');
    }

    const newAccessToken = generateAccessToken(userId, username, role);

    return response.status(200).json({ id: userId, username, newAccessToken });
  });
};

export default handleRefreshToken;

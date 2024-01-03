import dotenv from 'dotenv';

import isValidToken from '../utils/token-verifier.js';

dotenv.config();

// verifyToken middleware instead
const authMiddleware = (request, response, next) => {
  const authenticationHeader = request.headers.authorization || request.headers.Authorization;
  const refreshToken = request.cookies['refresh_token'];

  if (!refreshToken) return next();

  if (!authenticationHeader) return response.sendStatus(401);

  if (!authenticationHeader?.startsWith('Bearer ')) return response.sendStatus(401);

  const accessToken = authenticationHeader.split(' ')[1];

  return (isValidToken(accessToken, process.env.ACCESS_TOKEN_SECRET))
    ? next()
    : response.status(401).json('Invalid access token.'); // 403 INSTEAD
  // create constants and pass username and userroles for next steps request.username = decoded.userData.username
  // req.user = decoded.UserInfo.username;
  // req.roles = decoded.UserInfo.roles;
};

export default authMiddleware;

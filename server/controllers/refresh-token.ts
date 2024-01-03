// find user in db by refresh token
// 401 if no cookie
// 403 return if not exists

import { generateAccessToken } from "../utils/token-generator.js";
import jwt from "jsonwebtoken";

const handleRefreshToken = (request, response) => {
  const authenticationHeader = request.headers.authorization || request.headers.Authorization;
  const refreshToken = request.cookies['refresh_token'];
    
  // const accessToken = authenticationHeader.split(' ')[1];

  const { username, role } = jwt.decode(refreshToken) // use verify instead
  const newAccessToken = generateAccessToken(username, role)

  // try { // VERIFY REFRESH TOKEN AND CLEAR
  //   jwt.verify(token, process.env.JWT_SECRET);
  // } catch (error) {
  //   return response.clearCookie('access_token', {
  //     httpOnly: true,
  //     sameSite: 'none',
  //     secure: true
  //   }).status(401).json('Access token expired.'); // sameSite 'none'
  // }
  // return response.status(200).json('Access token valid.');

  // and delete cookie inside database after verify
//   return response.clearCookie('refresh_token', {
//     // DELETE TOKEN IN DATABASE
//     sameSite: 'none',
//     secure: true
//   }).status(403).json('Unknown or invalid refresh token.'); // sameSite 'none'
  return response.status(200).json({ username, newAccessToken })
};

export default handleRefreshToken

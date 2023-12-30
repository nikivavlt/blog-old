import jwt from 'jsonwebtoken'

// verifyToken middleware instead
const authMiddleware = (request, response, next) => {
  const token = request.cookies.access_token
  // authHeader = request.headers['authorization'] || req.headers.Authorization; - access

  if (!token) return response.sendStatus(401)
  // if !token.startsWith('Bearer ')
  // token = authHeader.split(' ')[1];

  try {
    // instead of try catch use anonymus
    if (token) {
      jwt.verify(token,
        process.env.ACCES_TOKEN_SECRET,
        (error, decoded) => {
          // 403 invalid token instead
          if (error) return response.sendStatus(401)
          // create constants and pass username and userroles for next steps request.username = decoded.userData.username
        })
    }
    next()
  } catch (error) {
    return response.clearCookie('access_token', {
      sameSite: 'none',
      secure: true
    }).status(401).json('Access token expired.') // sameSite 'none'
  }
}

export default authMiddleware

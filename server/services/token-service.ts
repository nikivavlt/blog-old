import jwt from 'jsonwebtoken'

class TokenService {
  generateAccessToken(userId: number) {
    const token = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })

    return token
  }
  generateRefreshToken(userId: number) {
    const token = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

    return token
  }

  verifyRefreshToken() {

  }

  saveRefreshToken(userId: number, refreshToken: string) {
      // check if token exists
  }
}

export default new TokenService()

import http from 'utils/axios'

import type IUser from 'models/user'

class UserService {
  async signIn (username: string, password: string): Promise<IUser> {
    const response = await http.post('/auth/signin', { username, password })

    return response.data
  }

  async signOut (username: string, password: string): Promise<void> {
    await http.post('/auth/signout', [username, password])
  }

  async signUp (username: string, email: string, password: string): Promise<void> {
    await http.post('/auth/signup', { username, email, password })
  }

  async verifyUser (): Promise<boolean> {
    try {
      await http.post('/auth/verify')
    } catch (error) {
      if (error.response.status === 401) {
        return false
      }
    }
    return true
  }
}

export default new UserService()

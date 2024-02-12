import { axiosInstance } from 'utils/axios'

import type IUser from 'models/user'

class UserService {
  async signIn (username: string, password: string): Promise<IUser> {
    const response = await axiosInstance.post('/auth/signin', { username, password })

    return response.data
  }

  async signOut (): Promise<void> {
    await axiosInstance.post('/auth/signout')
  }

  async signUp (username: string, email: string, password: string): Promise<void> {
    await axiosInstance.post('/auth/signup', { username, email, password })
  }

  async verifyUser (): Promise<boolean> {
    try {
      await axiosInstance.post('/auth/verify')
    } catch (error) {
      if (error.response.status === 401) {
        return false
      }
    }
    return true
  }

  async getUser (username: string): Promise<void> {
    try {
      const response = await axiosInstance.get(`/users/${username}`);

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default new UserService()

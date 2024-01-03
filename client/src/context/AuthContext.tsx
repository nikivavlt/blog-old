import React, { type ReactNode, createContext, useEffect, useState } from 'react'

import UserService from 'services/user'
import { setToken } from 'store/actions/token'
import store from 'store/store'
import http from 'utils/axios'

export const AuthContext = createContext<any>({})

interface Props {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: Props): JSX.Element => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

  http.interceptors.response.use((response) => response,
    async (error) => {
      const { dispatch } = store
      const originalRequest = error.config
      if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
          const response = await http.post('/refresh');

          const { newAccessToken } = response.data;
          dispatch(setToken(newAccessToken));
          return await http.request(originalRequest);
        } catch (error) {
          console.log(error);
        }
        setCurrentUser(null);
        // OR await signOut(); SO THEN cleancookie not necessary in backend
      }
    })

  const signIn = async (inputs: { username: string, password: string }): Promise<void> => {
    const { username, password } = inputs

    const responseData = await UserService.signIn(username, password);

    const { token, ...otherData } = responseData;

    setCurrentUser(otherData);

    return responseData;
  }

  const signOut = async (): Promise<void> => {
    await UserService.signOut()
    const { dispatch } = store;

    dispatch(setToken(null))

    setCurrentUser(null)
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])// Change this instead!!!

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signOut, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

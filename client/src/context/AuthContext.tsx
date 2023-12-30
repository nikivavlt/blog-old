import React, { type ReactNode, createContext, useEffect, useState } from 'react'

import UserService from 'services/user'
import http from 'utils/axios'

export const AuthContext = createContext<any>({})

interface Props {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: Props): JSX.Element => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

  http.interceptors.response.use((response) => response,
    async (error) => {
      if (error.response.status === 401) {
        setCurrentUser(null)
        return await http(error.config)
        // return await http.request(error.config)
      }
    })

  const signIn = async (inputs: { username: string, password: string }): Promise<void> => {
    const { username, password } = inputs

    const responseData = await UserService.signIn(username, password)

    setCurrentUser(responseData)
  }

  const signOut = async (inputs: { username: string, password: string }): Promise<void> => {
    await UserService.signOut(inputs.username, inputs.password)

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

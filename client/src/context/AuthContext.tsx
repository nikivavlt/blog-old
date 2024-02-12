import React, { type ReactNode, createContext, useEffect, useState } from 'react'

import UserService from 'services/users'
import { setToken } from 'store/actions/token'
import store from 'store/store'
import type IUser from 'models/user'

export const AuthContext = createContext<any>({})

interface Props {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: Props): JSX.Element => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  const signIn = async (inputs: { username: string, password: string }): Promise<IUser> => {
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

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signOut, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

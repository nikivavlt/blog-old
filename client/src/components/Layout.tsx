import { Outlet, useLocation } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header/Header'
import UserService from 'services/user'
import { AuthContext } from 'context/AuthContext'

const Layout = (): JSX.Element => {
  // const location = useLocation()
  // const { setCurrentUser } = useContext(AuthContext)

  // useEffect(() => {

  // if (currentUser) {
  //   if (currentUser.expirationTime < Date.now()) {
  //     const verify = async (): Promise<boolean> => {
  //       const response = await UserService.verifyUser()
  
  //       if (response === false) setCurrentUser(null)
  //     }
  //     verify();
  //   }
  // }

  //   const verifyRefreshToken = async () => {
  //     try {
  //         const response = await axios.get('http://localhost:8080/refresh', {
  //             withCredentials: true
  //         });
  //         console.log(response.data)
  //         dispatch(setCredentials({ accessToken: response.data.accessToken, user: response.data.user }))
  //         navigate('/welcome')
  //     }
  //     catch (err) {
  //         console.error(err);
  //     }
  // }

  // GET TOKEN FROM STATE
  // if (!token) verifyRefreshToken();
  // }, [location])

  // <> </> - React.Fragment alternative
  return (
        <React.Fragment>
            <Header />
            <Outlet />
            <Footer />
        </React.Fragment>
  )
}

export default Layout

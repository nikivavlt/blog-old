import { Outlet, useLocation } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'

import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'

const Layout = (): JSX.Element => {
  return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
  )
}

export default Layout

import { Outlet, useLocation } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header/Header'

const Layout = (): JSX.Element => {
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

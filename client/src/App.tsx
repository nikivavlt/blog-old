import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from 'utils/router'
import './styles.scss'

function App (props: any): JSX.Element {
  return (
    <div className='app'>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App

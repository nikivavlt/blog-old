import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from 'App'
import { AuthContextProvider } from 'context/AuthContext'
import store from 'store/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
)

// DELETE NOT NECESSARY DEPENDENCIES , WEB VITALS...
// implement observer aka listener pattern
// ADD COOKIES POP-Up
// change lambda to functions
// optimize redux store (action types, reducer, store, middlewares and pass as prop to component - connect)
// lazyloading

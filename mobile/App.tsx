import React, { FC } from 'react'
import { Provider } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import App from './src/App'

const store = configureStore({ reducer: {} })

const Loader: FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Loader

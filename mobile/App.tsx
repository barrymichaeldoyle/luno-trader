import React, { FC } from 'react'
import { Provider } from 'react-redux'

import App from './src/App'
import store from './src/reducer/store'

const Loader: FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Loader

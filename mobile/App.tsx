import React, { FC } from 'react'
import { Keyboard } from 'react-native'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components/native'

import App from './src/App'
import store from './src/reducer/store'
import theme from './src/styles/theme'

Keyboard.dismiss()

const Loader: FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
)

export default Loader

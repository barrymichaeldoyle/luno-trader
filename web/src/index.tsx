import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import Layout from './layout'
import store from './reducer/store'
import Routes from './Routes'
import { GlobalStyles, theme } from './styles'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Routes />
        </Layout>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

/// <reference types="react-scripts" />

import store from './reducer/store'
import theme from './styles/theme'

declare module 'styled-components' {
  type Theme = typeof theme
  interface DefaultTheme extends Theme {}
}

declare module 'react-redux' {
  const state = store.getState()
  type AppState = typeof state
  interface DefaultRootState extends AppState {}
}

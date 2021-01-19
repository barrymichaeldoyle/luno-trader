/// <reference types="react-scripts" />

import 'styled-components'

import store from './reducer/store'
import theme from './styles/theme'

type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

const state = store.getState()
type AppState = typeof state

declare module 'react-redux' {
  interface DefaultRootState extends AppState {}
}

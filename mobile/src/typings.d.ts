import store from './reducer/store'
import theme from './styles/theme'

declare module 'react-redux' {
  const state = store.getState()
  type AppState = typeof state
  interface DefaultRootState extends AppState {}
}

declare module 'styled-components/native' {
  type Theme = typeof theme
  interface DefaultTheme extends Theme {}
}

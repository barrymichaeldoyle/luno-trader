import { AppState } from './reducer/interfaces'
import theme from './styles/theme'

declare module 'react-redux' {
  interface DefaultRootState extends AppState {}
}

declare module 'styled-components/native' {
  type Theme = typeof theme
  interface DefaultTheme extends Theme {}
}

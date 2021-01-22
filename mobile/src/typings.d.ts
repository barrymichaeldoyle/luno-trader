import theme from './styles/theme'

declare module 'styled-components/native' {
  type Theme = typeof theme
  interface DefaultTheme extends Theme {}
}

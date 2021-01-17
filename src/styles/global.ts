import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
  ${({ theme }) => css`
    html {
      height: 100%;
      min-height: 100%;
      overflow-y: none;

      & > body {
        background-color: ${theme.darkBlue};
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0;
        min-height: fit-content;

        & > #root {
          color: ${theme.black};
          height: 100%;
          font-family: Greycliff, 'Helvetica Neue', Helvetica, Arial, sans-serif;
          min-height: fit-content;
          padding: 0 15px;
        }
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${theme.darkBlue};
      text-align: center;
    }

    p {
      color: ${theme.black};
      overflow-wrap: break-word;
      text-align: center;
      word-break: break-word;
      word-wrap: break-word;
    }

    a {
      color: ${theme.darkBlue};
      font-weight: bold;
      text-decoration: none;
      transition: ${theme.transition};

      &:hover {
        color: ${theme.blue};
      }
    }
  `}
`

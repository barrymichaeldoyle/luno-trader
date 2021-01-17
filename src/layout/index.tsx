import React, { FC } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  ${({ theme }) => css`
    margin: 0 auto;
    max-width: 650px;
    width: 100%;

    & > h2 {
      color: ${theme.white};
    }
  `}
`

const Content = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.white};
    border-radius: 20px;
    padding: 20px;
  `}
`

const Layout: FC = ({ children }) => (
  <Wrapper>
    <h2>Luno Trader</h2>
    <Content>{children}</Content>
    <br />
  </Wrapper>
)

export default Layout

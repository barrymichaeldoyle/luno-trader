import React, { FC } from 'react'
import styled, { css } from 'styled-components'

export const Container = styled.button<{ outline?: number }>`
  ${({ outline, theme }) => css`
    background-color: ${theme.blue};
    border: solid 2px ${theme.blue};
    border-radius: 24px;
    color: ${theme.white};
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    height: 48px;
    letter-spacing: 1.5px;
    margin: 10px auto;
    padding: 0 20px;
    transition: ${theme.transition};

    &:disabled {
      background-color: ${theme.gray};
      border-color: ${theme.gray};
      color: ${theme.black};
      cursor: default;
    }

    &:focus {
      border-color: ${theme.darkBlue};
      outline: none;
    }

    &:hover {
      opacity: 0.8;

      &:disabled {
        opacity: 1;
      }
    }

    ${outline &&
    css`
      background-color: ${theme.white};
      border-color: ${theme.blue};
      color: ${theme.blue};
    `}
  `}
`

interface Props {
  disabled?: boolean
  onClick?: () => void
  outline?: boolean
}

const Button: FC<Props> = ({ children, outline, ...rest }) => (
  <Container outline={outline ? 1 : 0} {...rest}>
    {children}
  </Container>
)

export default Button

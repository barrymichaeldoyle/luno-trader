import styled, { css } from 'styled-components'

export const ColorDiv = styled.div<{ color: string }>`
  color: ${({ color, theme }) => theme[color] ?? theme.black};
`

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

export const LinkButton = styled.div`
  ${({ theme }) => css`
    color: ${theme.darkBlue};
    cursor: pointer;
    font-weight: bold;
    transition: ${theme.transition};

    &:hover {
      color: ${theme.blue};
    }
  `}
`

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 10px auto;
  width: fit-content;

  & > div {
    align-items: center;
    display: flex;
    height: 25px;

    &:first-child {
      font-weight: bold;
    }
  }
`

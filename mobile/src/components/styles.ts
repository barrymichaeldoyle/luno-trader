import styled, { css } from 'styled-components/native'

interface CellProps {
  align?: 'left' | 'center' | 'right'
  bold?: boolean
  color?: string
  width?: number
}

export const Cell = styled.Text<CellProps>`
  ${({
    align = 'left',
    bold = false,
    color = 'black',
    width = 100,
    theme
  }) => css`
    color: ${theme[color]};
    font-size: 16px;
    font-weight: ${bold ? 'bold' : 'normal'};
    height: 22px;
    text-align: ${align};
    width: ${width}px;
  `}
`

export const Row = styled.View<{
  justify?: 'flex-start' | 'center' | 'flex-end'
}>`
  justify-content: ${({ justify = 'center' }) => justify};
  flex-direction: row;
  width: 100%;
`

export const Heading = styled.Text`
  ${({ theme }) => css`
    color: ${theme.darkBlue};
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  `}
`

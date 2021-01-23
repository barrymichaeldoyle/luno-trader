import styled, { css } from 'styled-components/native'

interface CellProps {
  bold?: boolean
  align?: 'left' | 'center' | 'right'
  width?: number
}

export const Cell = styled.Text<CellProps>`
  ${({ align = 'left', bold = false, width = 100 }) => css`
    font-size: 16px;
    font-weight: ${bold ? 'bold' : 'normal'};
    height: 22px;
    text-align: ${align};
    width: ${width}px;
  `}
`

export const Row = styled.View`
  flex-direction: row;
`

export const Heading = styled.Text`
  ${({ theme }) => css`
    color: ${theme.darkBlue};
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  `}
`

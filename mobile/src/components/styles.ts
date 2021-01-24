import styled, { css } from 'styled-components/native'

interface CellProps {
  align?: 'left' | 'center' | 'right'
  bold?: boolean
  color?: string
  width?: number
}

export const Cell = styled.Text<CellProps>`
  ${({ align = 'left', bold = false, color = 'black', width, theme }) => css`
    color: ${theme[color]};
    font-size: 16px;
    flex: 1;
    font-weight: ${bold ? 'bold' : 'normal'};
    height: 22px;
    text-align: ${align};
    ${width && `width: ${width}px;`}
  `}
`

interface RowProps {
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between'
}

export const Row = styled.View<RowProps>`
  ${({ justify = 'center' }) => css`
    flex-direction: row;
    justify-content: ${justify};
    width: 100%;
  `}
`

export const Heading = styled.Text`
  ${({ theme }) => css`
    color: ${theme.darkBlue};
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  `}
`

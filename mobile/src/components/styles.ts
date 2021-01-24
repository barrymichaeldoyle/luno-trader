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
    font-weight: ${bold ? 'bold' : 'normal'};
    height: 22px;
    text-align: ${align};
    ${width ? `width: ${width}px` : 'flex: 1'};
  `}
`

interface RowProps {
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between'
}

export const Row = styled.View<RowProps>`
  ${({ justify = 'center' }) => css`
    flex-direction: row;
    flex-shrink: 1;
    flex-wrap: wrap;
    flex: 1;
    justify-content: ${justify};
    width: 100%;
  `}
`

export const TouchableRow = styled.TouchableOpacity<RowProps>`
  ${({ justify = 'center' }) => css`
    flex-direction: row;
    flex-shrink: 1;
    flex-wrap: wrap;
    flex: 1;
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
    text-align: center;
  `}
`

export const Text = styled.Text<{ bold?: boolean }>`
  ${({ bold, theme }) => css`
    color: ${theme.white};
    font-size: 16px;
    flex-shrink: 1;
    flex: 1;
    flex-wrap: wrap;
    font-weight: ${bold ? 'bold' : 'normal'};
    height: 20px;
    text-align: center;
    width: 100%;
  `}
`

export const Warning = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.orange};
    border-radius: 10px;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 10px;
    justify-content: center;
    padding: 10px;
    width: 100%;
    flex: 1;
    flex-grow: 1;
  `}
`

import styled, { css } from 'styled-components/native'

export const Heading = styled.Text`
  ${({ theme }) => css`
    color: ${theme.darkBlue};
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  `}
`

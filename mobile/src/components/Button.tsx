import React, { FC } from 'react'
import { ActivityIndicator } from 'react-native'
import styled, { css } from 'styled-components/native'

import theme from '../styles/theme'

interface ButtonProps {
  loading?: boolean
  outline?: boolean
  width?: number
}

const Container = styled.TouchableOpacity<ButtonProps>`
  ${({ loading, outline, theme, width }) => css`
    background-color: ${outline ? theme.white : theme.blue};
    border: 1px solid ${outline ? theme.blue : theme.white};
    flex-direction: row;
    justify-content: center;
    padding: 15px ${loading ? 18 : 30}px;
    border-radius: 30px;
    margin: 5px;
    ${width && `width: ${width}px;`}
  `}
`

const Text = styled.Text<ButtonProps>`
  ${({ loading, outline, theme }) => css`
    color: ${outline ? theme.blue : theme.white};
    font-size: 18px;
    font-weight: bold;
    margin-left: ${loading ? 8 : 0}px;
  `}
`

interface Props {
  accessibilityLabel?: string
  disabled?: boolean
  label?: string
  loading?: boolean
  onPress?: () => void
  outline?: boolean
  width?: number
}

const Button: FC<Props> = ({
  accessibilityLabel,
  disabled = false,
  label = 'Button Label',
  loading = false,
  onPress,
  outline = false,
  width
}) => (
  <Container
    accessibilityLabel={accessibilityLabel ?? label}
    disabled={loading || disabled}
    loading={loading}
    onPress={onPress}
    outline={outline}
    width={width}
  >
    {loading && (
      <ActivityIndicator color={outline ? theme.blue : theme.white} size={16} />
    )}
    <Text loading={loading} outline={outline}>
      {label}
    </Text>
  </Container>
)

export default Button

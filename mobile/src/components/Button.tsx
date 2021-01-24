import React, { FC } from 'react'
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native'
import styled, { css } from 'styled-components/native'

import theme from '../styles/theme'

interface ButtonProps {
  error?: boolean
  loading?: boolean
  outline?: boolean
  width?: number
}

const Container = styled.TouchableOpacity<ButtonProps>`
  ${({ error, loading, outline, theme, width }) => css`
    background-color: ${error ? theme.red : outline ? theme.white : theme.blue};
    border: 1px solid
      ${error ? theme.white : outline ? theme.blue : theme.white};
    flex-direction: row;
    justify-content: center;
    padding: 15px ${loading ? 18 : 30}px;
    border-radius: 30px;
    margin: 5px;
    ${width && `width: ${width}px;`}
  `}
`

const Text = styled.Text<ButtonProps>`
  ${({ error, loading, outline, theme }) => css`
    color: ${error ? theme.white : outline ? theme.blue : theme.white};
    font-size: 18px;
    font-weight: bold;
    margin-left: ${loading ? 8 : 0}px;
  `}
`

interface Props {
  accessibilityLabel?: string
  disabled?: boolean
  error?: boolean
  label?: string
  loading?: boolean
  onPress?: () => void
  outline?: boolean
  style?: StyleProp<ViewStyle>
  width?: number
}

const Button: FC<Props> = ({
  accessibilityLabel,
  disabled = false,
  error = false,
  label = 'Button Label',
  loading = false,
  onPress,
  outline = false,
  style,
  width
}) => (
  <Container
    accessibilityLabel={accessibilityLabel ?? label}
    disabled={loading || disabled}
    error={error}
    loading={loading}
    onPress={onPress}
    outline={outline}
    style={style}
    width={width}
  >
    {loading && (
      <ActivityIndicator
        color={error ? theme.white : outline ? theme.blue : theme.white}
        size={16}
      />
    )}
    <Text error={error} loading={loading} outline={outline}>
      {label}
    </Text>
  </Container>
)

export default Button

import Clipboard from 'expo-clipboard'
import React, { FC, useCallback } from 'react'
import styled, { css } from 'styled-components/native'

import { MaterialIcons } from '@expo/vector-icons'

import theme from '../styles/theme'

const Container = styled.View`
  margin-bottom: 20px;
  width: 100%;
`

const Label = styled.Text`
  color: ${({ theme }) => theme.darkBlue};
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 3px;
`

const IconContainer = styled.TouchableOpacity`
  background-color: ${theme.darkBlue};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 100%;
  width: 40px;
  padding: 6px;
`

const InputContainer = styled.View`
  align-items: center;
  flex-direction: row;
`

const StyledInput = styled.TextInput<{ paste: boolean }>`
  ${({ paste, theme }) => css`
    height: 40px;
    border: solid 1px ${theme.darkBlue};
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: ${paste ? 0 : 10}px;
    border-bottom-right-radius: ${paste ? 0 : 10}px;
    flex: 1;
    padding: 5px;
  `}
`

interface Props {
  defaultValue: string
  label: string
  onChangeText: (text: string) => void
  paste?: boolean
}

const Input: FC<Props> = ({
  defaultValue,
  label,
  onChangeText,
  paste = false
}) => {
  const handlePaste = useCallback(async () => {
    const text = await Clipboard.getStringAsync()
    if (text.length > 0) onChangeText(text)
  }, [])

  return (
    <Container>
      <Label>{label}</Label>
      <InputContainer>
        <StyledInput
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          paste={paste}
        />
        {paste && (
          <IconContainer onPress={handlePaste}>
            <MaterialIcons name="content-paste" size={28} color={theme.white} />
          </IconContainer>
        )}
      </InputContainer>
    </Container>
  )
}

export default Input

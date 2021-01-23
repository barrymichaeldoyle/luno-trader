import React, { FC, useState } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'

import { Input } from '../../components'
import Prices from './Prices'

const Wrapper = styled.View`
  align-items: center;
  background-color: #13326b;
  flex: 1;
  justify-content: flex-start;
  padding: 65px 25px 40px 25px;
`

const Container = styled.View`
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  justify-content: flex-start;
  padding: 20px;
  width: 100%;
`

const Title = styled.Text`
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 6px;
  margin-bottom: 15px;
  text-align: center;
`

const Auth: FC = () => {
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Wrapper>
        <Title>Luno Trader</Title>
        <Container>
          <Prices />
          <Input
            defaultValue={apiKey}
            label="API Key"
            onChangeText={setApiKey}
            paste
          />
          <Input
            defaultValue={apiSecret}
            label="API Secret"
            onChangeText={setApiSecret}
            paste
          />
        </Container>
      </Wrapper>
    </TouchableWithoutFeedback>
  )
}

export default Auth

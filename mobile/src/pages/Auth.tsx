import React, { FC } from 'react'
import { Text, TextInput } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled.View`
  align-items: center;
  background-color: #13326b;
  flex: 1;
  justify-content: center;
  padding: 60px 25px 40px 25px;
`

const Container = styled.View`
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  flex: 1;
  justify-content: center;
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
  return (
    <Wrapper>
      <Title>Luno Trader</Title>
      <Container>
        <Text>API Key</Text>
        <TextInput />
        <Text>Secret</Text>
        <TextInput />
        <Text>Something Else</Text>
        <TextInput />
      </Container>
    </Wrapper>
  )
}

export default Auth

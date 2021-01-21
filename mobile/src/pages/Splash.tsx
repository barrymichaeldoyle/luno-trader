import React, { FC } from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  align-items: center;
  background-color: #13326b;
  flex: 1;
  justify-content: center;
`

const Title = styled.Text`
  color: #fff;
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 16px;
  text-align: center;
`

const Splash: FC = () => (
  <Container>
    <Title>Luno Trader</Title>
  </Container>
)

export default Splash

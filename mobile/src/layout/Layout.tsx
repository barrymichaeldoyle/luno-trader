import React, { FC } from 'react'
import { Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'

import theme from '../styles/theme'

const Wrapper = styled.View`
  align-items: center;
  background-color: #13326b;
  flex: 1;
  justify-content: flex-start;
  padding: 60px 25px 40px 25px;
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

interface Props {
  title?: string
}

const Layout: FC<Props> = ({ children, title = 'Luno Trader' }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <ScrollView style={{ backgroundColor: theme.darkBlue }}>
      <Wrapper>
        <Title>{title}</Title>
        <Container>{children}</Container>
      </Wrapper>
    </ScrollView>
  </TouchableWithoutFeedback>
)

export default Layout

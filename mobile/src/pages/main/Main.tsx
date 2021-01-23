import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import { MaterialIcons } from '@expo/vector-icons'

import { Prices, Row } from '../../components'
import Layout from '../../layout'
import { updateAuth } from '../../reducer/auth'
import theme from '../../styles/theme'
import Wallets from './wallets'

const Main: FC = () => {
  const dispatch = useDispatch()

  return (
    <Layout>
      <Row justify="flex-end" style={{ marginRight: -25, marginTop: -15 }}>
        <TouchableOpacity onPress={() => dispatch(updateAuth(true))}>
          <MaterialIcons name="settings" size={28} color={theme.darkBlue} />
        </TouchableOpacity>
      </Row>
      <Prices />
      <Wallets />
    </Layout>
  )
}

export default Main

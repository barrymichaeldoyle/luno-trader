import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Prices } from '../../components'
import Layout from '../../layout'
import Credentials from './Credentials'

const Auth: FC = () => {
  const isUpdatingConfig = useSelector(({ config }) => config.isUpdating)

  return (
    <Layout title={isUpdatingConfig ? 'Settings' : 'Luno Trader'}>
      {!isUpdatingConfig && <Prices />}
      <Credentials />
    </Layout>
  )
}

export default Auth

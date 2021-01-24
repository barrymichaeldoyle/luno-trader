import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Heading, Prices } from '../../components'
import Layout from '../../layout'
import Credentials from './Credentials'

const Auth: FC = () => {
  const isUpdatingConfig = useSelector(({ config }) => config.isUpdating)

  return (
    <Layout>
      {isUpdatingConfig ? (
        <Heading style={{ marginBottom: 30 }}>Update API Key</Heading>
      ) : (
        <Prices />
      )}
      <Credentials />
    </Layout>
  )
}

export default Auth

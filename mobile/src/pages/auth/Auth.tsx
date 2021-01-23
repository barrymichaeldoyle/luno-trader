import React, { FC } from 'react'

import Layout from '../../layout'
import Credentials from './Credentials'
import Prices from './Prices'

const Auth: FC = () => (
  <Layout>
    <Prices />
    <Credentials />
  </Layout>
)

export default Auth

import React, { FC } from 'react'

import Prices from './prices/Prices'
import Refresh from './Refresh'
import Wallets from './wallets'

const Main: FC = () => (
  <>
    <Prices />
    <Wallets />
    <Refresh />
  </>
)

export default Main

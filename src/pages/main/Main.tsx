import React, { FC } from 'react'

import Prices from './prices/Prices'
import Wallets from './wallets'

const Main: FC = () => {
  return (
    <>
      <Prices />
      <Wallets />
    </>
  )
}

export default Main

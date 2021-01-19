import React, { FC } from 'react'

import BuySell from './BuySell'
import SellBuy from './SellBuy'

interface Props {
  refresh: () => void
}

const TradeButtons: FC<Props> = ({ refresh }) => (
  <div>
    <BuySell refresh={refresh} />
    <SellBuy refresh={refresh} />
  </div>
)

export default TradeButtons

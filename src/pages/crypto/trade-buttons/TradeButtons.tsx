import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { getAsset } from '../../../reducer/selectedAsset'
import BuySell from './BuySell'

interface Props {
  refresh: () => void
}

const configs = {
  XBT: {
    pair: 'XBTZAR',
    precision: 6,
    minTradable: 0.0005
  },
  ETH: {
    pair: 'ETHZAR',
    precision: 6,
    minTradable: 0.0005
  },
  LTC: {
    pair: 'LTCZAR',
    precision: 4,
    minTradable: 0.001
  },
  XRP: {
    pair: 'XRPZAR',
    precision: 0,
    minTradable: 1
  }
}

const TradeButtons: FC<Props> = ({ refresh }) => {
  const selectedAsset = useSelector(getAsset)

  return (
    <div>
      <BuySell refresh={refresh} {...configs[selectedAsset]} />
    </div>
  )
}

export default TradeButtons

import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import BuySell from './BuySell'

interface Props {
  refresh: () => void
}

const configs = {
  XBT: {
    pair: 'XBTZAR',
    precision: 6,
    minTradable: 0.0005,
    zarPrecision: 0
  },
  ETH: {
    pair: 'ETHZAR',
    precision: 6,
    minTradable: 0.0005,
    zarPrecision: 0
  },
  LTC: {
    pair: 'LTCZAR',
    precision: 4,
    minTradable: 0.001,
    zarPrecision: 0
  },
  XRP: {
    pair: 'XRPZAR',
    precision: 0,
    minTradable: 1,
    zarPrecision: 2
  }
}

const TradeButtons: FC<Props> = ({ refresh }) => {
  const asset = useSelector(state => state.selected.asset)

  if (!asset) return null

  return (
    <div>
      <BuySell refresh={refresh} {...configs[asset]} />
    </div>
  )
}

export default TradeButtons

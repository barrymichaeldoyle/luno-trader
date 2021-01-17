import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { ColorDiv } from '../../../components'
import { format, pairLabel, TickerPair } from '../../../utils'

interface Props {
  pair: TickerPair
}

const Price: FC<Props> = ({ pair }) => {
  const pairOrders = useSelector<any, any>(
    state => state.pendingOrders.orders[pair] ?? []
  )
  const tickerPair = useSelector<any, any>(state => state.tickers.tickers[pair])

  const nearestOpenOrderPrice = useMemo(() => {
    if (pairOrders.length === 0) return undefined

    let result: number | undefined
    let smallestDifference = Infinity
    pairOrders.forEach(order => {
      if (order.pair === pair) {
        const currentTickerPrice =
          (Number(tickerPair.ask) + Number(tickerPair.bid)) / 2
        const difference = Math.abs(
          Number(order.limit_price) - currentTickerPrice
        )
        if (difference < smallestDifference) {
          smallestDifference = difference
          result = Number(order.limit_price)
        }
      }
    })
    return result
  }, [pairOrders, tickerPair])

  return (
    <div>
      <div>{pairLabel(pair as TickerPair)}</div>
      <div>R {format(Number(tickerPair.ask))}</div>
      <ColorDiv
        color={
          (nearestOpenOrderPrice ?? 0) > Number(tickerPair.ask)
            ? 'green'
            : 'red'
        }
      >
        {nearestOpenOrderPrice ? format(nearestOpenOrderPrice) : ''}
      </ColorDiv>
    </div>
  )
}

export default Price

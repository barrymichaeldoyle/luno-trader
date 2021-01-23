import React, { FC, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useAuthValid } from '../../reducer/auth'
import { format, pairLabel, TickerPair } from '../../utils'
import { Cell, Row } from '../styles'

interface Props {
  pair: TickerPair
  priceView: 'Ask' | 'Bid'
}

const Price: FC<Props> = ({ pair, priceView }) => {
  const isValid = useAuthValid()
  const dispatch = useDispatch()
  const pairOrders = useSelector(
    state => state.pendingOrders.orders[pair] ?? []
  )
  const tickerPair = useSelector(state => state.tickers.tickers[pair])

  const nearestOpenOrderPrice = useMemo(() => {
    if (pairOrders.length === 0 || !tickerPair) return undefined

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
  }, [pair, pairOrders, tickerPair])

  if (!tickerPair) return null

  return (
    <Row>
      <Cell width={80}>{pairLabel(pair as TickerPair)}</Cell>
      <Cell align="right">
        R {format(tickerPair[priceView.toLowerCase()], pair === 'XRPZAR')}
      </Cell>
      {isValid && (
        <Cell
          align="right"
          color={
            (nearestOpenOrderPrice ?? 0) >
            Number(tickerPair[priceView.toLowerCase()])
              ? 'green'
              : 'red'
          }
        >
          {nearestOpenOrderPrice
            ? format(nearestOpenOrderPrice.toString(), pair === 'XRPZAR')
            : ''}
        </Cell>
      )}
    </Row>
  )
}

export default Price

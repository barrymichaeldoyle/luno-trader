import React, { FC, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ColorDiv, LinkButton } from '../../../components'
import { selectAsset } from '../../../reducer/selected'
import { format, pairLabel, TickerPair } from '../../../utils'

interface Props {
  pair: TickerPair
}

const Price: FC<Props> = ({ pair }) => {
  const dispatch = useDispatch()
  const pairOrders = useSelector(
    state => state.pendingOrders.orders[pair] ?? []
  )
  const tickerPair = useSelector(state => state.tickers.tickers[pair])

  if (!tickerPair) return null

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

  const viewAsset = useCallback(
    () => dispatch(selectAsset(pair.substring(0, 3))),
    [dispatch, pair]
  )

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
      <div>
        <LinkButton onClick={viewAsset}>View</LinkButton>
      </div>
    </div>
  )
}

export default Price

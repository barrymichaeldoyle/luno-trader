import moment from 'moment'
import React, { FC, useMemo } from 'react'

import { ColorDiv } from '../../../components'
import { format, Order } from '../../../utils'

const OrderComponent: FC<Order> = ({
  base,
  completed_timestamp,
  counter,
  limit_price,
  limit_volume,
  type
}) => {
  const { price, amount } = useMemo(() => {
    if (type === 'BUY' || type === 'SELL')
      return {
        price: (Number(counter) / Number(base)).toString(),
        amount: base
      }
    return { price: limit_price, amount: limit_volume }
  }, [base, counter, limit_price, limit_volume, type])

  const value = useMemo(() => (Number(price) * Number(amount)).toString(), [
    amount,
    price
  ])

  return (
    <div>
      <div>R {format(price)}</div>
      <ColorDiv color={type === 'ASK' || type === 'SELL' ? 'red' : 'green'}>
        {amount}
      </ColorDiv>
      <ColorDiv color={type === 'ASK' || type === 'SELL' ? 'green' : 'red'}>
        R {format(value)}
      </ColorDiv>
      <div>{moment(completed_timestamp).fromNow()}</div>
    </div>
  )
}

export default OrderComponent

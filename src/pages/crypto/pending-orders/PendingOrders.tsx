import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Table } from '../../../components/styles'
import Order from './Order'

const OrdersTable = styled(Table)`
  & > div > div {
    &:nth-child(1) {
      margin-right: 20px;
      text-align: right;
      width: 130px;
    }
    &:nth-child(2) {
      text-align: left;
      width: 100px;
    }
    &:nth-child(3) {
      text-align: right;
      width: 80px;
    }
    &:nth-child(4) {
      margin-left: 20px;
      text-align: left;
    }
  }
`

const PendingOrders: FC = () => {
  const orders = useSelector(
    state => state.pendingOrders.orders[`${state.selected.asset}ZAR`]
  )

  return (
    <OrdersTable>
      <div>
        <div>Price</div>
        <div>Amount</div>
        <div>Value</div>
        <div>When</div>
      </div>
      {orders.map(order => (
        <Order key={order.order_id} {...order} />
      ))}
    </OrdersTable>
  )
}

export default PendingOrders

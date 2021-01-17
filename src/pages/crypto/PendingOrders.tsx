import { FC } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { ColorDiv, Table } from '../../components'

const OrdersTable = styled(Table)`
  & > div > div {
    &:nth-child(1) {
      text-align: center;
      width: 130px;
    }

    &:nth-child(2) {
      text-align: center;
      width: 130px;
    }

    &:nth-child(3) {
      text-align: center;
      width: 130px;
    }

    &:nth-child(4) {
      text-align: center;
      width: 130px;
    }
  }
`

const PendingOrders: FC = () => {
  const orders = useSelector<any, any>(
    state => state.pendingOrders.orders[`${state.selectedAsset}ZAR`]
  )

  return (
    <OrdersTable>
      <div>
        <div>Price</div>
        <div>Amount</div>
        <div>Fee</div>
      </div>
      {orders.map(order => (
        <div>
          <ColorDiv color={order.type === 'ASK' ? 'green' : 'red'}>
            {order.limit_price}
          </ColorDiv>
          <ColorDiv color={order.type === 'ASK' ? 'green' : 'red'}>
            {order.limit_volume}
          </ColorDiv>
          <ColorDiv color={order.type === 'ASK' ? 'green' : 'red'}>
            {order.fee_base}
          </ColorDiv>
        </div>
      ))}
    </OrdersTable>
  )
}

export default PendingOrders

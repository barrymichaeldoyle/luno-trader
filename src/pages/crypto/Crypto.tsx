import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Container } from '../../components'
import { fetchCompleteOrders } from '../../reducer/completeOrders'
import { fetchPendingOrders } from '../../reducer/pendingOrders'
import { fetchWallets } from '../../reducer/wallets'
import BackButton from './BackButton'
import CompleteOrders from './completed-orders'
import Heading from './Heading'
import PendingOrders from './pending-orders'
import TradeButtons from './trade-buttons'
import ValueRecord from './ValueRecord'

const Crypto: FC = () => {
  const dispatch = useDispatch()

  const refresh = useCallback(() => {
    dispatch(fetchPendingOrders())
    dispatch(fetchCompleteOrders())
    dispatch(fetchWallets())
  }, [dispatch])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <Container>
      <Heading />

      <ValueRecord />

      <h3>Open Orders</h3>
      <PendingOrders />

      <h3>Recent Orders</h3>
      <CompleteOrders />

      <TradeButtons refresh={refresh} />

      <div>
        <BackButton />
        <Button onClick={refresh}>Refresh</Button>
      </div>
    </Container>
  )
}

export default Crypto

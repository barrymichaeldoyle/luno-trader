import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Container } from '../../components'
import { fetchBalances } from '../../reducer/balances'
import { fetchPendingOrders } from '../../reducer/pendingOrders'
import BackButton from './BackButton'
import Heading from './Heading'
import PendingOrders from './PendingOrders'
import ValueRecord from './ValueRecord'

const Crypto: FC = () => {
  const dispatch = useDispatch()

  const refresh = useCallback(() => {
    dispatch(fetchPendingOrders())
    dispatch(fetchBalances())
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
      <h4>Work In Progress</h4>

      <Button onClick={refresh}>Refresh</Button>
      <BackButton />
    </Container>
  )
}

export default Crypto

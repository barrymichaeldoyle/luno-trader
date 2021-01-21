import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container } from '../../components'
import { fetchPendingOrders } from '../../reducer/pendingOrders'
import { fetchWallets } from '../../reducer/wallets'

const Refresh: FC = () => {
  const isLoading = useSelector(
    state =>
      state.wallets.status === 'LOADING' ||
      state.pendingOrders.status === 'LOADING'
  )
  const dispatch = useDispatch()

  const fetch = useCallback(async () => {
    dispatch(fetchWallets())
    dispatch(fetchPendingOrders())
  }, [dispatch])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <Container>
      <Button disabled={isLoading} onClick={fetch} outline>
        Refresh{isLoading ? 'ing' : ''}
      </Button>
    </Container>
  )
}

export default Refresh

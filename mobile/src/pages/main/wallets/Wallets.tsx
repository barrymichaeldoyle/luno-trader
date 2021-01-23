import React, { FC, useEffect } from 'react'
import { Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { Heading } from '../../../components'
import { fetchWallets } from '../../../reducer/wallets'

const Wallets: FC = () => {
  const dispatch = useDispatch()
  const { error: tickerError, status: tickerStatus, tickers } = useSelector(
    state => state.tickers
  )
  const { assets, savingsChoices } = useSelector(state => state.wallets)

  useEffect(() => {
    dispatch(fetchWallets())
  }, [])

  console.log('SAVINGS', savingsChoices)

  if (savingsChoices) {
    // console.log('Savings Choices', savingsChoices)
    return <Text>Test</Text>
  }

  return (
    <>
      <Heading>Wallets</Heading>
      <Text>Wallets (WIP)</Text>
    </>
  )
}

export default Wallets

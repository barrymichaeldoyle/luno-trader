import React, { FC, useEffect } from 'react'
import { Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { Error, Heading } from '../../../components'
import { useSavingsId } from '../../../reducer/config'
import { fetchWallets } from '../../../reducer/wallets'
import SelectSavings from './SelectSavings'

const Wallets: FC = () => {
  const dispatch = useDispatch()
  const { error: tickerError, status: tickerStatus, tickers } = useSelector(
    state => state.tickers
  )
  const { assets, savingsChoices } = useSelector(state => state.wallets)
  const savingsId = useSavingsId()

  useEffect(() => {
    dispatch(fetchWallets())
  }, [savingsId])

  if (!savingsId && savingsChoices)
    return <SelectSavings wallets={savingsChoices} />

  return (
    <>
      <Heading>Wallets</Heading>
      <Text>Wallets (WIP)</Text>
      <Error
        message="Hello You Stupid Idiot!!"
        retry={() => console.log('GGs')}
      />
      <Error loading message="Hello You Stupid Idiot!!" />
    </>
  )
}

export default Wallets

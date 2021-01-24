import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Cell, Error, Heading, Row } from '../../../components'
import SelectSavings from '../../../components/SelectSavings'
import { useSavingsId } from '../../../reducer/config'
import { fetchWallets } from '../../../reducer/wallets'
import Total from './Total'
import Wallet from './Wallet'

const Wallets: FC = () => {
  const dispatch = useDispatch()
  const { assets, btcWallets, error, status } = useSelector(
    state => state.wallets
  )
  const savingsId = useSavingsId()

  useEffect(() => {
    dispatch(fetchWallets())
  }, [savingsId])

  if (!savingsId && btcWallets.length > 1) return <SelectSavings />

  return (
    <>
      <Heading>Wallets</Heading>
      {status === 'FAILED' ? (
        <Error message={error} retry={() => dispatch(fetchWallets())} />
      ) : (
        <>
          <Row style={{ marginBottom: 5 }}>
            <Cell bold width={80}>
              &nbsp;
            </Cell>
            <Cell align="right" bold width={90}>
              Units
            </Cell>
            <Cell align="right" bold>
              Value
            </Cell>
            <Cell align="right" bold width={20}>
              &nbsp;
            </Cell>
          </Row>
          {assets.SAVINGS && <Wallet asset="SAVINGS" />}
          {assets.XBT && <Wallet asset="XBT" />}
          {assets.ETH && <Wallet asset="ETH" />}
          {assets.LTC && <Wallet asset="LTC" />}
          {assets.XRP && <Wallet asset="XRP" />}
          {assets.ZAR && <Wallet asset="ZAR" />}
          <Total />
        </>
      )}
    </>
  )
}

export default Wallets

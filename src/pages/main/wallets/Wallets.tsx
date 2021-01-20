import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Container, Table } from '../../../components'
import { ASSET } from '../../../utils'
import Total from './Total'
import Wallet from './Wallet'

const WalletTable = styled(Table)`
  & > div {
    &:last-child {
      font-weight: bold;
    }
    & > div {
      &:nth-child(1) {
        width: 120px;
      }
      &:nth-child(2) {
        width: 80px;
      }
      &:nth-child(3) {
        text-align: right;
        width: 120px;
      }
      &:nth-child(4) {
        font-weight: bold;
        text-align: center;
        width: 60px;
      }
      &:nth-child(5) {
        text-align: center;
        width: 50px;
      }
    }
  }
`

const Wallets: FC = () => {
  const { assets, error, status } = useSelector(state => state.wallets)

  const sortedKeys = useMemo(() => {
    const keys = Object.keys(assets)
    if (keys.includes('SAVINGS')) {
      keys.splice(keys.indexOf('SAVINGS'), 1)
      keys.unshift('SAVINGS')
    }
    return keys
  }, [assets])

  return (
    <Container>
      <h2>Wallets</h2>
      {status === 'FAILED' ? (
        <p>{error}</p>
      ) : (
        <WalletTable>
          <div>
            <div>Currency</div>
            <div>Units</div>
            <div>Value</div>
            <div>Trade</div>
            <div></div>
          </div>
          {sortedKeys.map(
            asset =>
              asset !== 'BCH' && <Wallet key={asset} asset={asset as ASSET} />
          )}
          <Total />
        </WalletTable>
      )}
    </Container>
  )
}

export default Wallets

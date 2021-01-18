import { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { Button, Container, Table } from '../../../components'
import { fetchBalances, getBalances } from '../../../reducer/balances'
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
        text-align: right;
        width: 50px;
      }
    }
  }
`

const Wallets: FC = () => {
  const { assets, error, status } = useSelector(getBalances)
  const dispatch = useDispatch()

  const fetch = useCallback(async () => {
    dispatch(fetchBalances())
  }, [dispatch])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <Container>
      <h2>Wallets</h2>
      {status === 'ERROR' ? (
        <p>{error}</p>
      ) : (
        <>
          <WalletTable>
            <div>
              <div>Currency</div>
              <div>Units</div>
              <div>Rand Value</div>
              <div></div>
            </div>
            {Object.keys(assets).map(
              asset =>
                asset !== 'BCH' && <Wallet key={asset} asset={asset as ASSET} />
            )}
            <Total />
          </WalletTable>
          <Button onClick={fetch} outline>
            Refresh{status === 'LOADING' ? 'ing' : ''}
          </Button>
        </>
      )}
    </Container>
  )
}

export default Wallets

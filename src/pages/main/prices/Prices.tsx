import { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { Button, Container, Table } from '../../../components'
import { fetchPendingOrders } from '../../../reducer/pendingOrders'
import { getTickers } from '../../../reducer/tickers'
import { TickerPair } from '../../../utils'
import Price from './Price'

const PriceTable = styled(Table)`
  & > div > div {
    &:nth-child(1) {
      width: 90px;
    }

    &:nth-child(2) {
      text-align: right;
      width: 130px;
    }

    &:nth-child(3) {
      text-align: right;
      width: 130px;
    }
  }
`

const Prices: FC = () => {
  const dispatch = useDispatch()
  const { error, status, tickers } = useSelector(getTickers)

  const fetch = useCallback(() => dispatch(fetchPendingOrders()), [dispatch])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <div>
      <h2>Buying Prices</h2>
      <Container>
        {status === 'ERROR' ? (
          <p>{error}</p>
        ) : (
          <>
            <PriceTable>
              <div>
                <div>Currency</div>
                <div>Rand Price</div>
                <div>Open Order</div>
              </div>
              {Object.keys(tickers).map(pair => (
                <Price key={pair} pair={pair as TickerPair} />
              ))}
            </PriceTable>
            <Button onClick={fetch} outline>
              Refresh{status === 'LOADING' ? 'ing' : ''}
            </Button>
          </>
        )}
      </Container>
    </div>
  )
}

export default Prices

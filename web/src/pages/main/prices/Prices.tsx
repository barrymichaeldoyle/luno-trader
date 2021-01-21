import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Container, Table } from '../../../components'
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
    &:nth-child(4) {
      text-align: right;
      width: 50px;
    }
  }
`

const Prices: FC = () => {
  const { error, status, tickers } = useSelector(state => state.tickers)

  return (
    <div>
      <h2>Buying Prices</h2>
      <Container>
        {status === 'FAILED' ? (
          <p>{error}</p>
        ) : (
          <PriceTable>
            <div>
              <div>Currency</div>
              <div>Price</div>
              <div>Open Order</div>
              <div></div>
            </div>
            {Object.keys(tickers).map(pair => (
              <Price key={pair} pair={pair as TickerPair} />
            ))}
          </PriceTable>
        )}
      </Container>
    </div>
  )
}

export default Prices

import React, { FC, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { Error } from '../'
import { useAuthValid } from '../../reducer/config'
import { fetchPendingOrders } from '../../reducer/pendingOrders'
import { fetchTickers } from '../../reducer/tickers'
import { TickerPair } from '../../utils'
import { Cell, Heading, Row } from '../styles'
import Price from './Price'

const Prices: FC = () => {
  const isValid = useAuthValid()
  const dispatch = useDispatch()
  const { error: tickerError, status: tickerStatus, tickers } = useSelector(
    state => state.tickers
  )
  const { error: orderError, status: orderStatus } = useSelector(
    state => state.pendingOrders
  )
  const [priceView, setPriceView] = useState<'Ask' | 'Bid'>('Ask')

  useEffect(() => {
    if (isValid) dispatch(fetchPendingOrders())
  }, [isValid])

  return (
    <>
      <Heading>Buying Prices</Heading>
      {tickerStatus === 'FAILED' ? (
        <Error message={tickerError} retry={() => dispatch(fetchTickers())} />
      ) : (
        <View style={{ marginBottom: 20, width: '100%' }}>
          <TouchableOpacity
            onPress={() => setPriceView(priceView === 'Ask' ? 'Bid' : 'Ask')}
          >
            <Row>
              <Cell bold width={80}>
                Currency
              </Cell>
              <Cell align="right" bold>
                {priceView} Price
              </Cell>
              {isValid && (
                <Cell align="right" bold>
                  Open Order
                </Cell>
              )}
            </Row>
            {Object.keys(tickers).map(pair => (
              <Price
                key={pair}
                pair={pair as TickerPair}
                priceView={priceView}
              />
            ))}
          </TouchableOpacity>
        </View>
      )}
      {orderStatus === 'FAILED' && <Text>{orderError}</Text>}
    </>
  )
}

export default Prices

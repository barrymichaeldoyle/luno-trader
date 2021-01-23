import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

import { Cell, Heading, Row } from '../../components'
import { format } from '../../utils'

const Prices: FC = () => {
  const { error, status, tickers } = useSelector(state => state.tickers)

  return (
    <>
      <Heading>Buying Prices</Heading>
      {status === 'FAILED' ? (
        <Text>{error} - WIP Add Retry Button</Text>
      ) : (
        <View style={{ marginBottom: 20 }}>
          <Row>
            <Cell bold width={80}>
              Currency
            </Cell>
            <Cell align="right" bold>
              Ask Price
            </Cell>
          </Row>
          <Row>
            <Cell width={80}>Bitcoin</Cell>
            <Cell align="right">R {format(tickers.XBTZAR?.ask ?? '')}</Cell>
          </Row>
          <Row>
            <Cell width={80}>Ethereum</Cell>
            <Cell align="right">R {format(tickers.ETHZAR?.ask ?? '')}</Cell>
          </Row>
          <Row>
            <Cell width={80}>Litecoin</Cell>
            <Cell align="right">R {format(tickers.LTCZAR?.ask ?? '')}</Cell>
          </Row>
          <Row>
            <Cell width={80}>Ripple</Cell>
            <Cell align="right">R {format(tickers.XRPZAR?.ask ?? '')}</Cell>
          </Row>
        </View>
      )}
    </>
  )
}

export default Prices

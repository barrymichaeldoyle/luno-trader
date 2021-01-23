import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components/native'

import { Heading } from '../../components/styles'
import { format } from '../../utils'

interface CellProps {
  align?: 'left' | 'center' | 'right'
  width?: number
}

const Cell = styled.Text<CellProps>`
  ${({ align = 'left', width = 100 }) => css`
    font-size: 16px;
    height: 22px;
    text-align: ${align};
    width: ${width}px;
  `}
`

const HeadCell = styled(Cell)`
  font-weight: bold;
`

const Row = styled.View`
  flex-direction: row;
`

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
            <HeadCell width={80}>Currency</HeadCell>
            <HeadCell align="right">Ask Price</HeadCell>
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

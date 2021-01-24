import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components/native'

import { ASSET, format } from '../../../utils'

const Container = styled.View`
  ${({ theme }) => css`
    border-radius: 10px;
    background-color: ${theme.darkBlue};
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    padding: 10px;
    width: 100%;
  `}
`

const Value = styled.Text`
  ${({ theme }) => css`
    color: ${theme.white};
    font-size: 16px;
    font-weight: bold;
  `}
`

const Total: FC = () => {
  const tickers = useSelector(state => state.tickers.tickers)
  const assets = useSelector(state => state.wallets.assets)

  const totalZarValue = useMemo(() => {
    let zarSum = 0
    Object.keys(assets).forEach(asset => {
      switch (asset as ASSET) {
        case 'XBT':
          if (tickers.XBTZAR)
            zarSum += Number(assets[asset].balance) * Number(tickers.XBTZAR.bid)
          break
        case 'SAVINGS':
          if (tickers.XBTZAR)
            zarSum += Number(assets[asset].balance) * Number(tickers.XBTZAR.bid)
          break
        case 'LTC':
          if (tickers.LTCZAR)
            zarSum += Number(assets[asset].balance) * Number(tickers.LTCZAR.bid)
          break
        case 'ETH':
          if (tickers.ETHZAR)
            zarSum += Number(assets[asset].balance) * Number(tickers.ETHZAR.bid)
          break
        case 'XRP':
          if (tickers.XRPZAR)
            zarSum += Number(assets[asset].balance) * Number(tickers.XRPZAR.bid)
          break
        case 'ZAR':
          zarSum += Number(assets[asset].balance)
          break
      }
    })
    return format(zarSum.toString(), true)
  }, [assets, tickers])

  return (
    <Container>
      <Value>Total Wallet Value</Value>
      <Value>R {totalZarValue}</Value>
    </Container>
  )
}

export default Total

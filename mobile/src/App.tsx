import React, { FC, useState } from 'react'
import styled from 'styled-components/native'

import Splash from './pages/Splash'

interface Ticker {
  ask: string
  bid: string
  last_trade: string
  pair: string
  rolling_24_hour_volume: string
  status: 'ACTIVE'
  timestamp: string
}

interface Tickers {
  XBTZAR?: Ticker
  ETHZAR?: Ticker
  LTCZAR?: Ticker
  XRPZAR?: Ticker
}

const Container = styled.View`
  align-items: center;
  background-color: #13326b;
  flex: 1;
  justify-content: center;
`

const Desc = styled.Text`
  color: #fff;
`

const App: FC = () => {
  const [tickers, setTickers] = useState<Tickers>({})
  const [error, setError] = useState('')

  if (true) return <Splash />

  return (
    <Container>
      <Desc>R {tickers.XBTZAR?.ask}</Desc>
      {error.length > 0 && <Desc>{error}</Desc>}
    </Container>
  )
}

export default App

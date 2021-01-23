import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'

import Auth from './pages/auth'
import { fetchTickers } from './reducer/tickers'

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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTickers())
  }, [dispatch])

  return <Auth />
}

export default App

import React, { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Auth from './pages/auth'
import Main from './pages/Main'
import Splash from './pages/Splash'
import { setAuth } from './reducer/auth'
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

const App: FC = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const auth = useSelector(state => state.auth)

  const getData = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('auth')
      if (jsonValue !== null) dispatch(setAuth(JSON.parse(jsonValue)))
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getData()
    dispatch(fetchTickers())
  }, [dispatch])

  if (isLoading) return <Splash />

  if (!auth.apiKey || !auth.apiSecret || !auth.write) return <Auth />

  return <Main />
}

export default App

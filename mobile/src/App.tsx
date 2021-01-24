import React, { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Auth from './pages/auth'
import Main from './pages/main'
import Splash from './pages/Splash'
import { setConfig, useAuthValid } from './reducer/config'
import { fetchTickers } from './reducer/tickers'

const App: FC = () => {
  const isValid = useAuthValid()
  const dispatch = useDispatch()
  const [isLoadingConfig, setIsLoadingConfig] = useState(true)
  const config = useSelector(state => state.config)

  const getAuthData = useCallback(async () => {
    setIsLoadingConfig(true)
    try {
      const configJson = await AsyncStorage.getItem('config')
      if (configJson !== null) dispatch(setConfig(JSON.parse(configJson)))
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoadingConfig(false)
    }
  }, [])

  useEffect(() => {
    getAuthData()
    dispatch(fetchTickers())
  }, [dispatch, getAuthData])

  if (isLoadingConfig) return <Splash />

  console.log('CONFIG', config)

  if (config.isUpdating || !isValid) return <Auth />

  return <Main />
}

export default App

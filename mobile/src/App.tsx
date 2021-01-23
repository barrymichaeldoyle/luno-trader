import React, { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Auth from './pages/auth'
import Main from './pages/main'
import Splash from './pages/Splash'
import { setAuth, useAuthValid } from './reducer/auth'
import { fetchTickers } from './reducer/tickers'

const App: FC = () => {
  const isValid = useAuthValid()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const auth = useSelector(state => state.auth)

  const getData = useCallback(async () => {
    setIsLoading(true)
    try {
      const json = await AsyncStorage.getItem('auth')
      if (json !== null) dispatch(setAuth(JSON.parse(json)))
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    console.log('AUTH', auth)
  }, [auth])

  useEffect(() => {
    getData()
    dispatch(fetchTickers())
  }, [dispatch, getData])

  if (isLoading) return <Splash />

  if (auth.isUpdating || !isValid) return <Auth />

  return <Main />
}

export default App

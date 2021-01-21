import React, { FC, lazy, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTickers } from './reducer/tickers'

const Crypto = lazy(() => import('./pages/crypto'))
const ZAR = lazy(() => import('./pages/ZAR'))
const Main = lazy(() => import('./pages/main'))

const Routes: FC = () => {
  const dispatch = useDispatch()
  const asset = useSelector(state => state.selected.asset)

  useEffect(() => {
    dispatch(fetchTickers())
  }, [dispatch])

  return (
    <Suspense fallback={null}>
      {!asset ? <Main /> : asset === 'ZAR' ? <ZAR /> : <Crypto />}
    </Suspense>
  )
}

export default Routes

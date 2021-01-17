import React, { FC, lazy, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAsset } from './reducer/selectedAsset'
import { fetchTickers } from './reducer/tickers'

const Crypto = lazy(() => import('./pages/crypto'))
const ZAR = lazy(() => import('./pages/ZAR'))
const Main = lazy(() => import('./pages/main'))

const Routes: FC = () => {
  const dispatch = useDispatch()
  const selectedAsset = useSelector(getAsset)

  useEffect(() => {
    dispatch(fetchTickers())
  }, [dispatch])

  return (
    <Suspense fallback={null}>
      {selectedAsset === null ? (
        <Main />
      ) : selectedAsset === 'ZAR' ? (
        <ZAR />
      ) : (
        <Crypto />
      )}
    </Suspense>
  )
}

export default Routes

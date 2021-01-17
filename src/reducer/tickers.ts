import { createSlice } from '@reduxjs/toolkit'

import { ASSET, Authorization, Tickers } from '../utils'

const { REACT_APP_PROXY_URL } = process.env

export const slice = createSlice({
  name: 'tickers',
  initialState: { status: 'IDLE', tickers: {} },
  reducers: {
    setError: (state, { payload }) => ({
      ...state,
      error: payload,
      status: 'ERROR'
    }),
    setTickers: (state, { payload }) => ({
      ...state,
      tickers: payload,
      error: undefined,
      status: 'SUCCEEDED'
    })
  }
})

export const { setTickers, setError } = slice.actions

export const fetchTickers = () => async dispatch => {
  try {
    const res = await fetch(
      `${REACT_APP_PROXY_URL}https://api.luno.com/api/1/tickers`,
      { method: 'GET', headers: { Authorization } }
    )
    const json = await res.json()
    const updatedTickers: Tickers = {}
    json.tickers.forEach(ticker => {
      switch (ticker.pair) {
        case 'XBTZAR':
          return (updatedTickers.XBTZAR = ticker)
        case 'ETHZAR':
          return (updatedTickers.ETHZAR = ticker)
        case 'LTCZAR':
          return (updatedTickers.LTCZAR = ticker)
        case 'XRPZAR':
          return (updatedTickers.XRPZAR = ticker)
        default:
          return
      }
    })
    dispatch(setTickers(updatedTickers))
    setTimeout(() => dispatch(fetchTickers()), 2000)
  } catch (err) {
    console.error({ err })
    dispatch(setError(err.message))
  }
}

export const getTickers = ({ tickers }) => tickers
export const getTicker = (asset: ASSET) => ({ tickers }) =>
  tickers.assets[asset]

export default slice.reducer

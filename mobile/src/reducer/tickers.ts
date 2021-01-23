import { createSlice } from '@reduxjs/toolkit'

import { STATUS, Ticker, Tickers } from '../utils'

interface State {
  error?: string
  status: STATUS
  tickers: Tickers
}

const initialState: State = {
  status: 'IDLE',
  tickers: {}
}

export const slice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    setError: (state, { payload }) => ({
      ...state,
      error: payload,
      status: 'FAILED'
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
    const res = await fetch('https://api.luno.com/api/1/tickers', {
      method: 'GET'
    })
    const json = await res.json()
    const updatedTickers: Tickers = {}
    json.tickers.forEach((ticker: Ticker) => {
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

export default slice.reducer

import { createSlice } from '@reduxjs/toolkit'

import { Authorization, Balance, proxyUrl, savingsId, STATUS, Wallets } from '../utils'

interface State {
  assets: Wallets
  error?: string
  status: STATUS
}

const initialState: State = {
  assets: {},
  status: 'IDLE'
}

export const slice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    setBalances: (state, { payload }) => ({
      ...state,
      assets: payload,
      error: undefined,
      status: 'SUCCEEDED'
    }),
    setError: (state, { payload }) => ({
      ...state,
      error: payload,
      status: 'FAILED'
    }),
    setStatus: (state, { payload }) => ({ ...state, status: payload })
  }
})

export const { setBalances, setStatus, setError } = slice.actions

export const fetchBalances = () => async dispatch => {
  dispatch(setStatus('LOADING'))
  try {
    const res = await fetch(`${proxyUrl}https://api.luno.com/api/1/balance`, {
      method: 'GET',
      headers: { Authorization }
    })
    const json = await res.json()
    const balances: Wallets = {}
    json.balance.forEach((balance: Balance) => {
      if (balance.account_id === savingsId) balances.SAVINGS = balance
      else balances[balance.asset] = balance
    })
    dispatch(setBalances(balances))
  } catch (err) {
    console.error({ err })
    dispatch(setError(err.message))
  }
}

export default slice.reducer

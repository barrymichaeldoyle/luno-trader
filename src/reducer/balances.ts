import { createSlice } from '@reduxjs/toolkit'

import { ASSET, Authorization, Balance, proxyUrl, savingsId, Wallets } from '../utils'

export const slice = createSlice({
  name: 'balances',
  initialState: { assets: {}, status: 'IDLE' },
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
      status: 'ERROR'
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

export const getBalances = ({ balances }) => balances
export const getWallet = (asset: ASSET) => ({ balances }) =>
  balances.assets[asset]

export default slice.reducer

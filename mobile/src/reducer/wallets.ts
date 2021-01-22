import { createSlice } from '@reduxjs/toolkit'

import { Authorization, savingsId, STATUS, Wallet, Wallets } from '../utils'

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
  name: 'wallets',
  initialState,
  reducers: {
    setError: (state, { payload }) => ({
      ...state,
      error: payload,
      status: 'FAILED'
    }),
    setStatus: (state, { payload }) => ({ ...state, status: payload }),
    setWallets: (state, { payload }) => ({
      ...state,
      assets: payload,
      error: undefined,
      status: 'SUCCEEDED'
    })
  }
})

export const { setWallets, setStatus, setError } = slice.actions

export const fetchWallets = () => async dispatch => {
  dispatch(setStatus('LOADING'))
  try {
    const res = await fetch('https://api.luno.com/api/1/balance', {
      method: 'GET',
      headers: { Authorization }
    })
    const json = await res.json()
    const wallets: Wallets = {}
    json.balance.forEach((wallet: Wallet) => {
      if (wallet.account_id === savingsId) wallets.SAVINGS = wallet
      else wallets[wallet.asset] = wallet
    })
    dispatch(setWallets(wallets))
  } catch (err) {
    console.error({ err })
    dispatch(setError(err.message))
  }
}

export default slice.reducer

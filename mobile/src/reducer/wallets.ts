import { createSlice } from '@reduxjs/toolkit'

import { STATUS, Wallet, Wallets } from '../utils'
import { getIsAuthValid } from './config'
import { GetState } from './interfaces'
import { getAuthorization } from './utils'

interface State {
  assets: Wallets
  error?: string
  btcWallets: Wallet[]
  status: STATUS
}

const initialState: State = {
  assets: {},
  btcWallets: [],
  status: 'IDLE'
}

export const slice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    setBtcWallets: (state, { payload }) => ({
      ...state,
      btcWallets: payload,
      status: 'SUCCEEDED'
    }),
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
      savingsChoices: undefined,
      status: 'SUCCEEDED'
    })
  }
})

export const { setBtcWallets, setError, setStatus, setWallets } = slice.actions

export const fetchWallets = () => async (dispatch, getState: GetState) => {
  const {
    config: { savingsId },
    wallets: { status }
  } = getState()
  if (getIsAuthValid(getState) && status !== 'LOADING') {
    dispatch(setStatus('LOADING'))
    try {
      const res = await fetch('https://api.luno.com/api/1/balance', {
        method: 'GET',
        headers: { Authorization: getAuthorization(getState) }
      })
      const json = await res.json()
      const wallets: Wallets = {}
      const btcWallets = json.balance.filter(
        ({ asset }: Wallet) => asset === 'XBT'
      )
      dispatch(setBtcWallets(btcWallets))
      if (btcWallets.length > 1 && !savingsId) return
      json.balance.forEach((wallet: Wallet) => {
        if (wallet.account_id === savingsId) wallets.SAVINGS = wallet
        else wallets[wallet.asset] = wallet
      })
      console.log('WALLETS', wallets)
      console.log('SAVINGS ID', savingsId)
      dispatch(setWallets(wallets))
    } catch (err) {
      console.error({ err })
      dispatch(setError(err.message))
    }
  }
}

export default slice.reducer

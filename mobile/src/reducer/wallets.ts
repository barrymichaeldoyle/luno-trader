import { createSlice } from '@reduxjs/toolkit'

import { STATUS, Wallet, Wallets } from '../utils'
import { getIsAuthValid } from './auth'
import { GetState } from './interfaces'
import { getAuthorization } from './utils'

interface State {
  assets: Wallets
  error?: string
  savingsChoices?: Wallet[]
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
    setSavingsChoices: (state, { payload }) => ({
      ...state,
      savingsChoices: payload
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

export const {
  setError,
  setSavingsChoices,
  setStatus,
  setWallets
} = slice.actions

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
      if (!savingsId) {
        const savingsChoices = json.balance.filter(
          ({ asset }: Wallet) => asset === 'XBT'
        )
        if (savingsChoices.length > 1)
          return dispatch(setSavingsChoices(savingsChoices))
      }
      json.balance.forEach((wallet: Wallet) => {
        if (wallet.account_id === savingsId) wallets.SAVINGS = wallet
        wallets[wallet.asset] = wallet
      })
      dispatch(setWallets(wallets))
    } catch (err) {
      console.error({ err })
      dispatch(setError(err.message))
    }
  }
}

export default slice.reducer

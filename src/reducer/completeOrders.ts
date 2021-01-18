import { createSlice } from '@reduxjs/toolkit'

import { Authorization, proxyUrl } from '../utils'

export const slice = createSlice({
  name: 'completeOrders',
  initialState: {
    orders: {
      XBTZAR: [],
      LTCZAR: [],
      ETHZAR: [],
      XRPZAR: []
    },
    status: 'IDLE'
  },
  reducers: {
    setError: (state, { payload }) => ({
      ...state,
      error: payload,
      status: 'ERROR'
    }),
    setOrders: (state, { payload }) => ({
      ...state,
      orders: { ...state.orders, ...payload },
      error: undefined,
      status: 'SUCCEEDED'
    }),
    setStatus: (state, { payload }) => ({ ...state, status: payload })
  }
})

export const { setOrders, setError, setStatus } = slice.actions

export const fetchCompleteOrders = () => async (dispatch, getState) => {
  const { selectedAsset } = getState()
  if (selectedAsset !== null) {
    dispatch(setStatus('LOADING'))
    try {
      const res = await fetch(
        `${proxyUrl}https://api.luno.com/api/1/listorders?state=COMPLETE&limit=10&pair=${selectedAsset}ZAR`,
        { method: 'GET', headers: { Authorization } }
      )
      const json = await res.json()
      dispatch(
        setOrders({
          [`${selectedAsset}ZAR`]: json.orders.filter(
            ({ base, btc }) =>
              !((base && base === '0.00') || (btc && btc === '0.00'))
          )
        })
      )
    } catch (err) {
      console.error({ err })
      dispatch(setError(err.message))
    }
  }
}

export const getCompleteOrders = ({ completeOrders }) => completeOrders

export default slice.reducer

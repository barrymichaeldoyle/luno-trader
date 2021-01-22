import { createSlice } from '@reduxjs/toolkit'

import { Authorization, Order, STATUS } from '../utils'

interface State {
  error?: string
  orders: {
    XBTZAR: Order[]
    LTCZAR: Order[]
    ETHZAR: Order[]
    XRPZAR: Order[]
  }
  status: STATUS
}

const initialState: State = {
  orders: {
    XBTZAR: [],
    LTCZAR: [],
    ETHZAR: [],
    XRPZAR: []
  },
  status: 'IDLE'
}

export const slice = createSlice({
  name: 'completeOrders',
  initialState,
  reducers: {
    setError: (state, { payload }) => ({
      ...state,
      error: payload,
      status: 'FAILED'
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
  const { asset } = getState().selected
  if (asset) {
    dispatch(setStatus('LOADING'))
    try {
      const res = await fetch(
        'https://api.luno.com/api/1/listorders?state=COMPLETE&limit=10&pair=${asset}ZAR',
        { method: 'GET', headers: { Authorization } }
      )
      const json = await res.json()
      dispatch(
        setOrders({
          [`${asset}ZAR`]: json.orders.filter(
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

export default slice.reducer

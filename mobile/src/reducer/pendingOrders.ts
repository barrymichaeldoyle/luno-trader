import { createSlice } from '@reduxjs/toolkit'

import { Order, STATUS } from '../utils'
import { getIsAuthValid } from './config'
import { GetState } from './interfaces'
import { getAuthorization } from './utils'

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
  name: 'pendingOrders',
  initialState,
  reducers: {
    setError: (state, { payload }) => ({
      ...state,
      error: payload,
      status: 'FAILED'
    }),
    setOrders: (state, { payload }) => ({
      ...state,
      error: undefined,
      orders: { ...state.orders, ...payload },
      status: 'SUCCEEDED'
    }),
    setStatus: (state, { payload }) => ({ ...state, status: payload })
  }
})

export const { setOrders, setError, setStatus } = slice.actions

export const fetchPendingOrders = () => async (
  dispatch,
  getState: GetState
) => {
  const {
    config,
    pendingOrders: { status }
  } = getState()
  if (getIsAuthValid(getState) && status !== 'LOADING') {
    dispatch(setStatus('LOADING'))
    try {
      const res = await fetch(
        'https://api.luno.com/api/1/listorders?state=PENDING',
        {
          headers: { Authorization: getAuthorization(getState) },
          method: 'GET'
        }
      )
      const json = await res.json()
      const XBTZAR: Order[] = []
      const ETHZAR: Order[] = []
      const LTCZAR: Order[] = []
      const XRPZAR: Order[] = []
      json.orders.forEach((order: Order) => {
        if (order.pair === 'XBTZAR') return XBTZAR.push(order)
        if (order.pair === 'ETHZAR') return ETHZAR.push(order)
        if (order.pair === 'LTCZAR') return LTCZAR.push(order)
        if (order.pair === 'XRPZAR') return XRPZAR.push(order)
      })
      dispatch(setOrders({ XBTZAR, ETHZAR, LTCZAR, XRPZAR }))
    } catch (err) {
      console.error({ err })
      dispatch(setError(err.message))
    }
  }
}

export default slice.reducer

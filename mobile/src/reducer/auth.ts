import { useSelector } from 'react-redux'

import { createSlice } from '@reduxjs/toolkit'

import { GetState } from './interfaces'

interface State {
  apiKey?: string
  apiSecret?: string
  isUpdating: boolean
  write?: boolean
}

const initialState: State = {
  isUpdating: false
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => ({
      ...state,
      ...payload,
      isUpdating: false
    }),
    updateAuth: (state, { payload }) => ({
      ...state,
      isUpdating: payload
    })
  }
})

export const { setAuth, updateAuth } = slice.actions

export function useAuthValid() {
  return useSelector(
    ({ auth: { apiKey, apiSecret } }) =>
      (apiKey?.length ?? 0) > 0 && (apiSecret?.length ?? 0) > 0
  )
}

export function getIsAuthValid(getState: GetState) {
  const { apiKey, apiSecret } = getState().auth
  return (apiKey?.length ?? 0) > 0 && (apiSecret?.length ?? 0) > 0
}

export default slice.reducer

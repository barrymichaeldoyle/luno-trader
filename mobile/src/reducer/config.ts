import { useSelector } from 'react-redux'

import { createSlice } from '@reduxjs/toolkit'

import { GetState } from './interfaces'

interface State {
  apiKey?: string
  apiSecret?: string
  isUpdating: boolean
  savingsId?: string
  write?: boolean
}

const initialState: State = {
  isUpdating: false
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setConfig: (state, { payload }) => ({
      ...state,
      ...payload,
      isUpdating: false
    }),
    setIsUpdatingConfig: (state, { payload }) => ({
      ...state,
      isUpdating: payload
    })
  }
})

export const { setConfig, setIsUpdatingConfig } = slice.actions

export function useAuthValid() {
  return useSelector(
    ({ config }) =>
      (config.apiKey?.length ?? 0) > 0 && (config.apiSecret?.length ?? 0) > 0
  )
}

export function useSavingsId() {
  return useSelector(({ config }) => config.savingsId)
}

export function getIsAuthValid(getState: GetState) {
  const { apiKey, apiSecret } = getState().config
  return (apiKey?.length ?? 0) > 0 && (apiSecret?.length ?? 0) > 0
}

export default slice.reducer

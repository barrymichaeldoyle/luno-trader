import { createSlice } from '@reduxjs/toolkit'

interface State {
  apiKey?: string
  apiSecret?: string
  write?: boolean
}

const initialState: State = {}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => ({
      ...state,
      apiKey: payload.apiKey,
      apiSecret: payload.apiSecret,
      write: payload.write
    })
  }
})

export const { setAuth } = slice.actions

export default slice.reducer

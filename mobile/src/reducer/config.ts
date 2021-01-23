import { createSlice } from '@reduxjs/toolkit'

interface State {
  savingsId?: string
}

const initialState: State = {}

export const slice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig: (state, { payload }) => ({ ...state, ...payload })
  }
})

export const { setConfig } = slice.actions

export default slice.reducer

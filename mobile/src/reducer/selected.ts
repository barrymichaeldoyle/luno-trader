import { createSlice } from '@reduxjs/toolkit'

import { ASSET } from '../utils'

interface State {
  asset?: ASSET
}

const initialState: State = {}

export const slice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    selectAsset: (state, { payload }) => ({ ...state, asset: payload })
  }
})

export const { selectAsset } = slice.actions

export default slice.reducer

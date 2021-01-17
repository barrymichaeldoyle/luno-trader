import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'selectedAsset',
  initialState: null,
  reducers: { selectAsset: (_, { payload }) => payload }
})

export const { selectAsset } = slice.actions

export const getAsset = ({ selectedAsset }) => selectedAsset

export default slice.reducer

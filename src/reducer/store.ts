import { configureStore } from '@reduxjs/toolkit'

import balances from './balances'
import pendingOrders from './pendingOrders'
import selectedAsset from './selectedAsset'
import tickers from './tickers'

const store = configureStore({
  reducer: { balances, pendingOrders, selectedAsset, tickers }
})

export default store

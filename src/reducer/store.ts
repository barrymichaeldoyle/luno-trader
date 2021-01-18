import { configureStore } from '@reduxjs/toolkit'

import balances from './balances'
import completeOrders from './completeOrders'
import pendingOrders from './pendingOrders'
import selectedAsset from './selectedAsset'
import tickers from './tickers'

const store = configureStore({
  reducer: { balances, completeOrders, pendingOrders, selectedAsset, tickers }
})

export default store

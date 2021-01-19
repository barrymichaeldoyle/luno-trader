import { configureStore } from '@reduxjs/toolkit'

import completeOrders from './completeOrders'
import pendingOrders from './pendingOrders'
import selected from './selected'
import tickers from './tickers'
import wallets from './wallets'

const store = configureStore({
  reducer: { wallets, completeOrders, pendingOrders, selected, tickers }
})

export default store

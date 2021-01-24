import { configureStore } from '@reduxjs/toolkit'

import completeOrders from './completeOrders'
import config from './config'
import pendingOrders from './pendingOrders'
import selected from './selected'
import tickers from './tickers'
import wallets from './wallets'

const store = configureStore({
  reducer: {
    config,
    completeOrders,
    pendingOrders,
    selected,
    tickers,
    wallets
  }
})

export default store

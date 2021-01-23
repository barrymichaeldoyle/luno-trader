import { configureStore } from '@reduxjs/toolkit'

import auth from './auth'
import completeOrders from './completeOrders'
import config from './config'
import pendingOrders from './pendingOrders'
import selected from './selected'
import tickers from './tickers'
import wallets from './wallets'

const store = configureStore({
  reducer: {
    auth,
    completeOrders,
    config,
    pendingOrders,
    selected,
    tickers,
    wallets
  }
})

export default store

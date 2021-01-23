import { configureStore } from '@reduxjs/toolkit'

import auth from './auth'
import completeOrders from './completeOrders'
import pendingOrders from './pendingOrders'
import selected from './selected'
import tickers from './tickers'
import wallets from './wallets'

const store = configureStore({
  reducer: { auth, completeOrders, pendingOrders, selected, tickers, wallets }
})

export default store

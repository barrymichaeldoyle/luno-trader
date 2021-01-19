import { configureStore } from '@reduxjs/toolkit'

import balances from './balances'
import completeOrders from './completeOrders'
import pendingOrders from './pendingOrders'
import selected from './selected'
import tickers from './tickers'

const store = configureStore({
  reducer: { balances, completeOrders, pendingOrders, selected, tickers }
})

export default store

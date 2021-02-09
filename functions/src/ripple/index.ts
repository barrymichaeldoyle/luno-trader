import select from 'cli-select'
import prompt from 'prompt-sync'

import { fetchPendingOrders, fetchTicker, fetchTrades, postOrder } from '../api'
import { getAvailableFunds } from '../common'
import { Trade } from '../interfaces'
import {
  color, printAvailableBalances, printMonitoringStart, printOpenOrders, printSelectedSpread,
  printTicker, printTrade, printTradesExecuted, printWelcome, selectOptions
} from '../logs'
import { bulkTask } from '../tasks'

const makeNewTrades = async (
  trades: Trade[],
  spread: number,
  doneStamps: number[]
) => {
  const newTrades = trades.filter(
    ({ timestamp }) => !doneStamps.includes(timestamp)
  )
  const newDoneStamps = [...doneStamps]
  if (newTrades.length > 0) {
    printTradesExecuted(newTrades)

    interface TradeOrder {
      [x: string]: number
    }
    const askOrders: TradeOrder = {}
    const bidOrders: TradeOrder = {}

    newTrades.forEach(({ price, timestamp, type, volume }) => {
      printTrade(type, price, volume)
      newDoneStamps.push(timestamp)

      if (type === 'BID') {
        const newRawPrice = Number(price) * (1 + spread / 100)
        const newPrice = Number((Math.ceil(newRawPrice * 100) / 100).toFixed(2))
        askOrders[newPrice] = Math.round(
          Number(askOrders[newPrice] || 0) + Math.floor(Number(volume))
        )
      } else if (type === 'ASK') {
        const newRawPrice = Number(price) * (1 - spread / 100)
        const newPrice = Number(
          (Math.floor(newRawPrice * 100) / 100).toFixed(2)
        )
        bidOrders[newPrice] = Math.round(
          Number(bidOrders[newPrice] || 0) +
            Math.floor((Number(volume) * Number(price)) / Number(newPrice))
        )
      }
    })

    Object.keys(askOrders).forEach(
      async price =>
        await postOrder('XRPZAR', 'ASK', price, askOrders[price].toString())
    )
    Object.keys(bidOrders).forEach(
      async price =>
        await postOrder('XRPZAR', 'BID', price, bidOrders[price].toString())
    )
  }

  return newDoneStamps
}

const monitorTrades = async (
  startTime: number,
  spread = 1,
  doneStamps: number[],
  showMonitorMessage = false
) => {
  if (showMonitorMessage) printMonitoringStart()
  const trades = await fetchTrades(startTime, 'XRPZAR')
  const newDoneStamps = await makeNewTrades(trades, spread, doneStamps)
  setTimeout(
    async () => monitorTrades(startTime, spread, newDoneStamps, false),
    3000
  )
}

const main = async () => {
  let run = true
  printWelcome()
  while (run) {
    const [{ XRP, ZAR }, ticker, orders] = await Promise.all([
      getAvailableFunds(['XRP', 'ZAR']),
      fetchTicker('XRPZAR'),
      fetchPendingOrders('XRPZAR')
    ])
    printAvailableBalances(ZAR, XRP)
    printTicker(ticker)
    printOpenOrders(orders)

    process.stdout.write(color('\nWhat would you like to do?:\n', 'yellow'))
    const { id: whatToDoOption } = await select({
      values: {
        hft: 'HFT (High Frequency Trading)',
        bulkMerge: 'Bulk Merge Orders',
        bulkCancel: 'Bulk Cancel Orders',
        refresh: 'Refresh',
        exit: 'Exit'
      },
      ...selectOptions
    })

    switch (whatToDoOption) {
      case 'hft': {
        const startTime = Math.round(new Date().getTime())
        const spreadInput = prompt({ sigint: true })(
          `Select Spread % (Min: 0.1% / Default: 0.5%) > `
        )
        const spread =
          spreadInput.length === 0
            ? 0.5
            : Number(spreadInput) < 0.1
            ? 0.1
            : Number(spreadInput)

        printSelectedSpread(spread)

        monitorTrades(startTime, spread, [], true)
        run = false
        continue
      }
      case 'bulkCancel': {
        await bulkTask('CANCEL', 'XRPZAR')
        continue
      }
      case 'bulkMerge':
        await bulkTask('MERGE', 'XRPZAR')
        continue
      case 'refresh':
        continue

      case 'exit':
      default:
        run = false
    }
  }
}

export default main

// old hft function:
// const startTime = Math.round(new Date().getTime())
// const orders = await fetchPendingOrders('XRPZAR')

// const values = getOrderSelectValues(orders)

// process.stdout.write(
//   color('Please Select an Order to work with:\n', 'yellow')
// )
// const { id } = await select({ values, ...selectOptions })
// if (id === 'back') continue
// process.stdout.write(`Selected ${values[id]}\n`)
// const spreadInput = prompt({ sigint: true })(
//   `Select Spread (Min / Default: 0.03) > `
// )
// const spread =
//   spreadInput.length === 0 || Number(spreadInput) < 0.03
//     ? 0.03
//     : Number(spreadInput)
// process.stdout.write(`Selected Spread: R${spread}\n`)

// if (id === 'all')
//   orders.forEach(async ({ order_id }: Order) =>
//     fetchNewTrades(order_id, [], startTime, spread, true)
//   )
// else fetchNewTrades(id.toString(), [], startTime, spread, true)

// run = false

import select from 'cli-select'
import moment from 'moment'
import prompt from 'prompt-sync'

import { fetchOrder, fetchPendingOrders, fetchTicker, fetchTrades, postOrder } from '../api'
import { bulkTask, getAvailableFunds, getOrderSelectValues } from '../common'
import { Order, Trade } from '../interfaces'
import {
  color, printMonitoringEnd, printMonitoringStart, printOpenOrders, printTicker, printTrade,
  printWelcome, selectOptions
} from '../logs'

const bundleOrderTradesAndCounterOrder = async (
  trades: Trade[],
  orderId: string,
  doneStamps: number[],
  spread: number
) => {
  const newTrades =
    (trades.filter(
      ({ order_id, timestamp }: Trade) =>
        order_id === orderId && !doneStamps.includes(timestamp)
    ) as Trade[]) || []
  const newDoneStamps = [...doneStamps]
  if (newTrades.length > 0) {
    process.stdout.write(
      `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} New Trades Found!\n`
    )

    interface TradeOrder {
      [x: string]: number
    }
    const askOrders: TradeOrder = {}
    const bidOrders: TradeOrder = {}

    trades.forEach(({ price, timestamp, type, volume }: Trade) => {
      printTrade(type, price, volume)
      newDoneStamps.push(timestamp)

      if (type === 'BID') {
        const newPrice = (Number(price) + spread).toFixed(2)
        askOrders[newPrice] = Math.round(
          Number(askOrders[newPrice] || 0) + Math.floor(Number(volume))
        )
      } else {
        const newPrice = (Number(price) - spread).toFixed(2)
        bidOrders[newPrice] = Math.round(
          Number(bidOrders[newPrice] || 0) +
            Math.floor(
              ((Number(volume) * Number(price)) / Number(newPrice)) * 0.999
            )
        )
      }
    })

    Object.keys(askOrders).forEach(
      async price => await openNewOrder('ASK', price, askOrders[price], spread)
    )
    Object.keys(bidOrders).forEach(
      async price => await openNewOrder('BID', price, bidOrders[price], spread)
    )
  }
  return newDoneStamps
}

const openNewOrder = async (
  type: 'ASK' | 'BID',
  price: string,
  volume: number,
  spread: number
) => {
  const startTime = Math.round(new Date().getTime())
  const order_id = await postOrder('XRPZAR', type, price, volume)
  if (!order_id)
    return process.stdout.write(
      color(`NO NEW ORDER CREATED @ R${price} | ${volume}`, 'yellow')
    )
  fetchNewTrades(order_id, [], startTime, spread, true)
}

const fetchNewTrades = async (
  orderId: string,
  doneStamps: number[],
  startTime: number,
  spread = 0.03,
  showMonitorMessage = false
): Promise<any> => {
  if (showMonitorMessage) printMonitoringStart(orderId)
  const trades = await fetchTrades(startTime)
  const newDoneStamps = await bundleOrderTradesAndCounterOrder(
    trades,
    orderId,
    doneStamps,
    spread
  )
  const order = await fetchOrder(orderId)
  if (order) {
    if (order?.state !== 'COMPLETE')
      setTimeout(
        () => fetchNewTrades(orderId, newDoneStamps, startTime, spread, false),
        10000
      )
    else printMonitoringEnd(orderId)
  }
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
    if (XRP && ZAR)
      process.stdout.write(
        `${color('Available', 'yellow')}:  ${color(
          `R ${ZAR}`,
          'green'
        )} ${color(`|`, 'magenta')} ${color(`${XRP} Ripple`, 'green')}\n`
      )
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
        const orders = await fetchPendingOrders('XRPZAR')

        const values = getOrderSelectValues(orders)

        process.stdout.write(
          color('Please Select an Order to work with:\n', 'yellow')
        )
        const { id } = await select({ values, ...selectOptions })
        if (id === 'back') continue
        process.stdout.write(`Selected ${values[id]}\n`)
        const spreadInput = prompt({ sigint: true })(
          `Select Spread (Min / Default: 0.03) > `
        )
        const spread =
          spreadInput.length === 0 || Number(spreadInput) < 0.03
            ? 0.03
            : Number(spreadInput)
        process.stdout.write(`Selected Spread: R${spread}\n`)

        if (id === 'all')
          orders.forEach(async ({ order_id }: Order) =>
            fetchNewTrades(order_id, [], startTime, spread, true)
          )
        else fetchNewTrades(id.toString(), [], startTime, spread, true)

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

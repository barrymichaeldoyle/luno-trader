import select from 'cli-select'
import moment from 'moment'
import fetch from 'node-fetch'
import prompt from 'prompt-sync'

import { fetchOrder, fetchPendingOrders, fetchTicker, options } from '../api'
import postOrder from '../api/postOrder'
import { bulkTask, getAvailableFunds, getOrderSelectValues } from '../common'
import { Order, Trade } from '../interfaces'
import { color, printError, printWelcome, selectOptions } from '../logs'

const openNewOrder = async (
  type: 'ASK' | 'BID',
  price: string,
  volume: number,
  spread: number
) => {
  process.stdout.write(
    `\n${color(
      `[${moment().format('HH:mm:ss')}]`,
      'cyan'
    )} Creating New Order -> ${color(type, 'green')} ${color(
      volume.toString(),
      'white'
    )} ${color(`@ R${price}`, 'yellow')}\n`
  )
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
  if (showMonitorMessage)
    process.stdout.write(
      `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
        'Started Monitoring Trades For',
        'green'
      )} ${color(`ORDER ${orderId.toString()}`, 'yellow')}\n`
    )
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/listtrades?pair=XRPZAR&since=${startTime}`,
      options('GET')
    )
    const { trades } = await res.json()
    const filteredTrades =
      (trades?.filter(
        ({ order_id, timestamp }: Trade) =>
          order_id === orderId && !doneStamps.includes(timestamp)
      ) as Trade[]) ?? []
    const newDoneStamps = [...doneStamps]
    if (filteredTrades.length > 0) {
      process.stdout.write(
        `${color(
          `[${moment().format('HH:mm:ss')}]`,
          'cyan'
        )} New Trades Found!\n`
      )

      interface TradeOrder {
        [x: string]: number
      }
      const askOrders: TradeOrder = {}
      const bidOrders: TradeOrder = {}

      trades.forEach(({ price, timestamp, type, volume }: Trade) => {
        process.stdout.write(
          `${color('Trade: ', 'cyan')} ${color(type, 'green')} ${color(
            Number(volume).toFixed(0),
            'white'
          )} ${color(`@ R${price}`, 'yellow')}\n`
        )
        newDoneStamps.push(timestamp)

        if (type === 'BID') {
          const newPrice = (Number(price) + spread).toFixed(2)
          askOrders[newPrice] = Math.round(
            Number(askOrders[newPrice] ?? 0) + Math.floor(Number(volume))
          )
        } else {
          const newPrice = (Number(price) - spread).toFixed(2)
          bidOrders[newPrice] = Math.round(
            Number(bidOrders[newPrice] ?? 0) +
              Math.floor(
                ((Number(volume) * Number(price)) / Number(newPrice)) * 0.999
              )
          )
        }
      })

      Object.keys(askOrders).forEach(
        async price =>
          await openNewOrder('ASK', price, askOrders[price], spread)
      )
      Object.keys(bidOrders).forEach(
        async price =>
          await openNewOrder('BID', price, bidOrders[price], spread)
      )
    }

    const order = await fetchOrder(orderId)
    if (order) {
      if (order?.state !== 'COMPLETE')
        setTimeout(
          () =>
            fetchNewTrades(orderId, newDoneStamps, startTime, spread, false),
          10000
        )
      else {
        process.stdout.write(
          `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
            `ORDER ${orderId}`,
            'yellow'
          )} ${color('COMPLETE -> Stop Monitoring Trades', 'green')}\n`
        )
      }
    }
  } catch (e) {
    printError('Failed to Fetch Trades', e.message)
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
    if (ticker)
      process.stdout.write(
        `${color(`BID R ${Number(ticker.bid).toFixed(2)}`, 'green')} ${color(
          '|',
          'magenta'
        )} ${color(`ASK R ${Number(ticker.ask).toFixed(2)}`, 'red')}\n\n`
      )
    if (orders.length) {
      process.stdout.write(color(`Open Orders:`, 'cyan'))
      process.stdout.write(color('\n======================\n', 'magenta'))

      orders.forEach(({ type, limit_volume, limit_price }) =>
        process.stdout.write(
          `${color(type, type === 'ASK' ? 'red' : 'green')} ${color(
            '@',
            'cyan'
          )} R ${limit_price}\t${color('|', 'magenta')} ${color(
            Number(limit_volume).toString(),
            'yellow'
          )}\n`
        )
      )
    } else
      process.stdout.write(
        color(`You currently have no open orders\n`, 'magenta')
      )

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

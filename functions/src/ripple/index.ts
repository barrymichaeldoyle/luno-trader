import select from 'cli-select'
import moment from 'moment'
import fetch from 'node-fetch'
import prompt from 'prompt-sync'

import { fetchOrder, fetchPendingOrders } from '../api'
import { Order, Trade } from '../interfaces'
import { Authorization, color, selected, unselected } from '../utils'

const bulkTask = async (taskType: 'CANCEL' | 'MERGE') => {
  const orders = await fetchPendingOrders('XRPZAR')

  interface OrderGroups {
    [limit_price: string]: Array<Order>
  }
  const orderGroups: OrderGroups = {}
  orders.forEach(order => {
    if (orderGroups[order.limit_price])
      orderGroups[order.limit_price].push(order)
    else orderGroups[order.limit_price] = [order]
  })

  process.stdout.write(
    color(
      `Which group of orders would you like to ${taskType.toLowerCase()}?\n`,
      'yellow'
    )
  )

  interface Values {
    [key: string]: string
  }

  const values: Values = {}
  Object.keys(orderGroups).forEach(
    group =>
      (values[group] = `R ${group}\t ${color(
        `${orderGroups[group].length} Order${
          orderGroups[group].length === 1 ? '' : 's'
        }`,
        'cyan'
      )}`)
  )
  values.cancel = 'Cancel'

  const { id } = await select({
    values,
    selected,
    unselected
  })

  let volume = 0

  await Promise.all(
    orderGroups[id].map(async ({ order_id, limit_volume }) => {
      try {
        const res = await fetch(
          `https://api.luno.com/api/1/stoporder?order_id=${order_id}`,
          {
            method: 'POST',
            headers: { Authorization }
          }
        )
        const json = await res.json()
        if (json.success)
          process.stdout.write(
            `${color('Successfully Cancelled', 'green')} ${color(
              `ORDER ${order_id}\n`,
              'yellow'
            )}`
          )
        if (taskType === 'MERGE') volume = volume + Number(limit_volume)
      } catch (e) {
        process.stderr.write(`Failed to Stop Order: ${e.message}`)
      }
    })
  )

  if (taskType === 'MERGE') {
    const type = orderGroups[id][0].type
    const price = orderGroups[id][0].limit_price
    const res = await fetch(
      `https://api.luno.com/api/1/postorder?pair=XRPZAR&type=${type}&volume=${volume}&price=${price}`
    )
  }
}

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
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/postorder?pair=XRPZAR&type=${type}&price=${price}&volume=${Math.round(
        Number(volume)
      )}`,
      { method: 'POST', headers: { Authorization } }
    )
    const json = await res.json()
    process.stdout.write(
      `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
        'Started Monitoring Trades For',
        'green'
      )} ${color(`ORDER ${json.order_id.toString()}`, 'yellow')}\n`
    )
    fetchNewTrades(json.order_id, [], startTime, spread)
  } catch (e) {
    process.stderr.write(`\nError Creating New Order: ${e.message}\n`)
  }
}

const fetchNewTrades = async (
  orderId: string,
  doneStamps: number[],
  startTime: number,
  spread = 0.03
): Promise<any> => {
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/listtrades?pair=XRPZAR&since=${startTime}`,
      { method: 'GET', headers: { Authorization } }
    )
    const json = await res.json()
    const trades =
      (json.trades?.filter(
        ({ order_id, timestamp }: Trade) =>
          order_id === orderId && !doneStamps.includes(timestamp)
      ) as Trade[]) ?? []
    const newDoneStamps = [...doneStamps]
    if (trades.length > 0) {
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
          askOrders[newPrice] =
            Number(askOrders[newPrice] ?? 0) + Math.floor(Number(volume))
        } else {
          const newPrice = (Number(price) - spread).toFixed(2)
          bidOrders[newPrice] =
            Number(bidOrders[newPrice] ?? 0) +
            Math.floor(
              ((Number(volume) * Number(price)) / Number(newPrice)) * 0.999
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
          () => fetchNewTrades(orderId, newDoneStamps, startTime, spread),
          10000
        )
      else {
        process.stdout.write(`ORDER ${orderId} COMPLETE`)
        process.stdout.write(
          `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
            `ORDER ${orderId}`,
            'yellow'
          )} ${color('COMPLETE -> Stop Monitoring Trades', 'green')}\n`
        )
      }
    }
  } catch (e) {
    process.stderr.write(`\nError Fetching Trades: ${e.message}\n`)
  }
}

interface Values {
  [x: string]: string
}

const getValues = (orders: Order[]) => {
  const values: Values = {}
  orders.forEach(
    ({ order_id, type, limit_volume, limit_price }) =>
      (values[order_id] = `${color(
        type,
        type === 'ASK' ? 'red' : 'green'
      )} ${color(Number(limit_volume).toString(), 'yellow')}\t ${color(
        '@',
        'cyan'
      )} R ${limit_price}`)
  )
  values.all = color('All Orders', 'yellow')
  return values
}

const main = async () => {
  let run = true
  process.stdout.write(
    color(`\nWelcome to Barry's Ripple Trading Bot:\n`, 'green')
  )
  while (run) {
    const startTime = Math.round(new Date().getTime())
    process.stdout.write(color('\nWhat would you like to do?:\n', 'yellow'))

    const { id: whatToDoOption } = await select({
      values: {
        view: 'View Pending Orders',
        hft: 'High Frequency Trading (HFT)',
        bulkCancel: 'Bulk Cancel Orders',
        refresh: 'Refresh',
        exit: 'Exit'
      },
      selected,
      unselected
    })

    switch (whatToDoOption) {
      case 'view': {
        const orders = await fetchPendingOrders('XRPZAR')
        orders.forEach(({ type, limit_volume, limit_price }) =>
          process.stdout.write(
            `${color(type, type === 'ASK' ? 'red' : 'green')} ${color(
              Number(limit_volume).toString(),
              'yellow'
            )}\t ${color('@', 'cyan')} R ${limit_price}\n`
          )
        )
        continue
      }
      case 'hft': {
        const orders = await fetchPendingOrders('XRPZAR')

        const values = getValues(orders)

        process.stdout.write(
          color('Please Select an Order to work with:\n', 'yellow')
        )
        const { id } = await select({
          values,
          selected,
          unselected
        })
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
          orders.forEach(async ({ order_id }: Order) => {
            process.stdout.write(
              `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
                'Started Monitoring Trades',
                'green'
              )} ${color(`ORDER ${order_id}`, 'yellow')}\n`
            )
            fetchNewTrades(order_id, [], startTime, spread)
          })
        else {
          process.stdout.write(
            `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
              'Started Monitoring Trades For',
              'green'
            )} ${color(`ORDER ${id.toString()}`, 'yellow')}\n`
          )
          fetchNewTrades(id.toString(), [], startTime, spread)
        }
        run = false
        continue
      }
      case 'bulkCancel': {
        await bulkTask('CANCEL')
        continue
      }
      case 'bulkMerge':
        await bulkTask('MERGE')
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

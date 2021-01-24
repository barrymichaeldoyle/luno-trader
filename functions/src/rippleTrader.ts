import select from 'cli-select'
import moment from 'moment'
import fetch from 'node-fetch'
import prompt from 'prompt-sync'

import { Order, Trade } from './interfaces'
import { Authorization } from './utils'

interface Values {
  [x: string]: string
}

const getValues = (orders: Order[]) => {
  const values: Values = {}
  orders.forEach(({ order_id, type, limit_volume, limit_price }) => {
    if (type === 'ASK')
      return (values[order_id] = `ASK ${limit_volume} Ripple @ R${limit_price}`)
    if (type === 'BID')
      return (values[order_id] = `BID ${limit_volume} Ripple @ R${limit_price}`)
    process.stdout.write(`Work In Progress | getValues: ${order_id} ${type}`)
  })
  values.all = 'All Orders'
  return values
}

const fetchPendingOrders = async (): Promise<Order[]> => {
  process.stdout.write(
    `[${moment().format('HH:mm:ss')}] Fetching Pending Orders...\n\n`
  )
  try {
    const res = await fetch(
      'https://api.luno.com/api/1/listorders?state=PENDING&pair=XRPZAR',
      { method: 'GET', headers: { Authorization } }
    )
    const json = await res.json()
    return json.orders as Order[]
  } catch (e) {
    process.stderr.write(`\nError Fetching Pending Orders: ${e.message}`)
  }
  return []
}

const fetchOrder = async (id: string): Promise<Order | undefined> => {
  process.stdout.write(`[${moment().format('HH:mm:ss')}] Fetching Order...`)
  try {
    const res = await fetch(`https://api.luno.com/api/1/orders/${id}`, {
      method: 'GET',
      headers: { Authorization }
    })
    if (res.ok) {
      const json = await res.json()
      process.stdout.write(`Order ${json}`)
      return json as Order | undefined
    }
    process.stdout.write(`ORDER ${id} COMPLETE`)
    return undefined
  } catch (e) {
    process.stderr.write(`\nError Fetching Order: ${e.message}`)
  }
  return undefined
}

const openNewOrder = async (
  type: 'ASK' | 'BID',
  price: number,
  volume: string,
  spread: number
) => {
  process.stdout.write('\nCreating New Order')
  const startTime = Math.round(new Date().getTime())
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/postorder?pair=XRPZAR&type=${type}&price=${price}&volume=${volume}`,
      { method: 'POST', headers: { Authorization } }
    )
    const json = await res.json()
    fetchNewTrades(json.order_id, [], startTime, spread)
  } catch (e) {
    process.stderr.write(`Error Creating New Order: ${e.message}`)
  }
}

const fetchNewTrades = async (
  orderId: string,
  doneStamps: number[],
  startTime: number,
  spread = 0.02
): Promise<any> => {
  process.stdout.write(
    `[${moment().format('HH:mm:ss')}] Fetching Order ${orderId} Trades...\n`
  )
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
      trades.forEach(({ price, timestamp, type, volume }: Trade) => {
        newDoneStamps.push(timestamp)
        const newOrderType = type === 'BID' ? 'ASK' : 'BID'
        const newOrderPrice =
          type === 'BID' ? Number(price) + spread : Number(price) - spread
        openNewOrder(newOrderType, newOrderPrice, volume, spread)
      })

      const order = await fetchOrder(orderId)
      if (!order) return
    }
    return setTimeout(
      () => fetchNewTrades(orderId, newDoneStamps, startTime, spread),
      15000
    )
  } catch (e) {
    process.stderr.write(`Error Fetching Trades: ${e.message}`)
  }
}

const main = async () => {
  const startTime = Math.round(new Date().getTime())
  const orders = await fetchPendingOrders()

  const values = getValues(orders)

  process.stdout.write('Please Select an Order to work with:\n')
  try {
    const { id } = await select({
      values,
      selected: '[X]',
      unselected: '[ ]'
    })
    process.stdout.write(`Selected ${values[id]}\n\n`)
    const spreadInput = prompt({ sigint: true })(
      `Select Spread (Min / Default: 0.02) > `
    )
    const spread =
      spreadInput.length === 0 || Number(spreadInput) < 0.02
        ? 0.02
        : Number(spreadInput)
    process.stdout.write(`Selected Spread: R${spread}\n\n`)

    if (id === 'all')
      orders.forEach(({ order_id }: Order) =>
        fetchNewTrades(order_id, [], startTime, spread)
      )
    else fetchNewTrades(id.toString(), [], startTime, spread)
  } catch (e) {
    process.stdout.write('Error Selecting Order')
  }
}

export default main

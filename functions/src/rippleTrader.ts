import select from 'cli-select'
import moment from 'moment'
import fetch from 'node-fetch'
import prompt from 'prompt-sync'

import { Order, Trade } from './interfaces'
import { Authorization, color } from './utils'

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
    `${color(
      `[${moment().format('HH:mm:ss')}]`,
      'cyan'
    )} Fetching Pending Orders...\n\n`
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
  try {
    const res = await fetch(`https://api.luno.com/api/1/orders/${id}`, {
      method: 'GET',
      headers: { Authorization }
    })
    if (res.ok) {
      const json = await res.json()
      if (json.state === 'COMPLETE') {
        process.stdout.write(
          `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
            `ORDER ${id}`,
            'yellow'
          )} ${color('COMPLETE -> Stop Monitoring Trades', 'green')}\n`
        )
        return undefined
      }
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
    )} ${color(`@ R${price.toFixed(2)}`, 'yellow')}\n`
  )
  const startTime = Math.round(new Date().getTime())
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/postorder?pair=XRPZAR&type=${type}&price=${price.toFixed(
        2
      )}&volume=${Math.round(Number(volume))}`,
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
  spread = 0.02
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
    if (trades.length > 0)
      process.stdout.write(
        `${color(
          `[${moment().format('HH:mm:ss')}]`,
          'cyan'
        )} New Trades Found!\n`
      )
    trades.forEach(({ price, timestamp, type, volume }: Trade) => {
      process.stdout.write(
        `${color('Trade: ', 'cyan')} ${color(type, 'green')} ${color(
          volume,
          'white'
        )} ${color(`@ R${price}`, 'yellow')}`
      )
      newDoneStamps.push(timestamp)
      const newOrderType = type === 'BID' ? 'ASK' : 'BID'
      const newOrderPrice =
        type === 'BID' ? Number(price) + spread : Number(price) - spread
      const newOrderVolume =
        type === 'BID'
          ? Math.floor(Number(volume) * 0.999)
          : Math.floor(
              ((Number(volume) * Number(price)) / newOrderPrice) * 0.999
            )
      openNewOrder(newOrderType, newOrderPrice, newOrderVolume, spread)
    })

    const order = await fetchOrder(orderId)
    if (order)
      setTimeout(
        () => fetchNewTrades(orderId, newDoneStamps, startTime, spread),
        10000
      )
  } catch (e) {
    process.stderr.write(`\nError Fetching Trades: ${e.message}\n`)
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
      orders.forEach(({ order_id }: Order) => {
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
  } catch (e) {
    process.stdout.write('\nError Selecting Order\n')
  }
}

export default main

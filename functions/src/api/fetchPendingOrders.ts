import moment from 'moment'
import fetch from 'node-fetch'

import { Order, TickerPair } from '../interfaces'
import { Authorization, color, printError } from '../utils'

const fetchPendingOrders = async (pair: TickerPair): Promise<Order[]> => {
  process.stdout.write(
    `\n${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
      'Fetching Pending Orders...',
      'magenta'
    )}\n\n`
  )
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/listorders?state=PENDING&pair=${pair}`,
      { method: 'GET', headers: { Authorization } }
    )
    const json = await res.json()
    const { orders } = json
    if (orders === null) return []
    return (orders as Order[]).sort(
      (a, b) => Number(a.limit_price) - Number(b.limit_price)
    )
  } catch (e) {
    printError('Failed to Fetch Pending Orders', e.message)
  }
  return []
}

export default fetchPendingOrders

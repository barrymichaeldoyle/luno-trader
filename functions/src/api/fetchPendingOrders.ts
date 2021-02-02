import moment from 'moment'
import fetch from 'node-fetch'

import { Order, TickerPair } from '../interfaces'
import { Authorization, color } from '../utils'

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
    return json.orders as Order[]
  } catch (e) {
    process.stderr.write(`\nError Fetching Pending Orders: ${e.message}`)
  }
  return []
}

export default fetchPendingOrders

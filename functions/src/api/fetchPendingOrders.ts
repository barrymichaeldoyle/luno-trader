import moment from 'moment'
import fetch from 'node-fetch'

import { Order, TickerPair } from '../interfaces'
import { color, printError } from '../logs'
import handleError from './handleError'
import options from './options'

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
      options('GET')
    )
    if (res.ok) {
      const { error, orders } = await res.json()
      if (error) {
        printError('Failed to Fetch Pending Orders', error)
        return []
      }
      if (!orders) return []
      return (orders as Order[]).sort(
        (a, b) => Number(a.limit_price) - Number(b.limit_price)
      )
    } else handleError('FAILED TO FETCH PENDING ORDERS', res)
  } catch (e) {
    printError('Failed to Fetch Pending Orders', e.message)
  }
  return []
}

export default fetchPendingOrders

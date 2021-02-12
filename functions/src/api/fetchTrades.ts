import fetch from 'node-fetch'

import { TickerPair, Trade } from '../interfaces'
import { printError } from '../logs'
import handleError from './handleError'
import options from './options'

const fetchTrades = async (
  pair: TickerPair,
  startTime?: number
): Promise<Trade[]> => {
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/listtrades?pair=${pair}${
        startTime ? `&since=${startTime}` : ''
      }`,
      options('GET')
    )
    if (res.ok) {
      const { trades } = await res.json()
      return (trades as Trade[]) || []
    } else handleError('FAILED TO FETCH TRADES', res)
  } catch (e) {
    printError('Failed to Fetch Trades', e.message)
  }
  return []
}

export default fetchTrades

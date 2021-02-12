import fetch from 'node-fetch'

import { handleError, printError } from '../../logs'
import { PAIR, Trade } from '../interfaces'
import options from './options'

const fetchTrades = async (
  pair: PAIR,
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

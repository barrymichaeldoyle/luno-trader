import fetch from 'node-fetch'

import { TickerPair, Trade } from '../interfaces'
import { printError } from '../logs'
import { options } from './'

const fetchTrades = async (
  startTime: number,
  pair: TickerPair
): Promise<Trade[]> => {
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/listtrades?pair=${pair}&since=${startTime}`,
      options('GET')
    )
    if (res.ok) {
      const { trades } = await res.json()
      return (trades as Trade[]) || []
    } else console.log('FAILED TO FETCH TRADES', res)
  } catch (e) {
    printError('Failed to Fetch Trades', e.message)
  }
  return []
}

export default fetchTrades

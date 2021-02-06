import fetch from 'node-fetch'

import { Trade } from '../interfaces'
import { printError } from '../logs'
import { options } from './'

const fetchTrades = async (startTime: number): Promise<Trade[]> => {
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/listtrades?pair=XRPZAR&since=${startTime}`,
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

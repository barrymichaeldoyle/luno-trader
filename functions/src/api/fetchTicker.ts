import moment from 'moment'
import fetch from 'node-fetch'

import { Ticker, TickerPair } from '../interfaces'
import { color, printError } from '../logs'
import handleError from './handleError'

const fetchTicker = async (pair: TickerPair): Promise<Ticker | undefined> => {
  process.stdout.write(
    `\n${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
      'Fetching Latest Ticker...',
      'magenta'
    )}`
  )
  try {
    const res = await fetch(`https://api.luno.com/api/1/ticker?pair=${pair}`, {
      method: 'GET'
    })
    if (res.ok) return await res.json()
    else handleError('FAILED TO FETCH TICKER', res)
  } catch (e) {
    printError('Failed to Fetch Latest Ticker', e.message)
  }
  return undefined
}

export default fetchTicker

import moment from 'moment'
import fetch from 'node-fetch'

import { Ticker, TickerPair } from '../interfaces'
import { color } from '../utils'

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
    return await res.json()
  } catch (e) {
    process.stderr.write(`\nError Fetching Latest Ticker: ${e.message}`)
  }
  return undefined
}

export default fetchTicker

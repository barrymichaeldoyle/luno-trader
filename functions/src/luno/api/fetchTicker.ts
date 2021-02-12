import moment from 'moment'
import fetch from 'node-fetch'

import { color, handleError, printError } from '../../logs'
import { PAIR, Ticker } from '../interfaces'

const fetchTicker = async (pair: PAIR): Promise<Ticker | undefined> => {
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

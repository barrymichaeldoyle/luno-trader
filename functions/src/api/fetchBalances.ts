import moment from 'moment'
import fetch from 'node-fetch'

import { ASSET, Wallet } from '../interfaces'
import { Authorization, color, printError } from '../utils'

const fetchBalances = async (assets: ASSET[]): Promise<Wallet[]> => {
  process.stdout.write(
    `\n${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
      'Fetching Balances...',
      'magenta'
    )}`
  )
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/balance?assets=${assets[0]}&assets=${assets[1]}`,
      { method: 'GET', headers: { Authorization } }
    )
    if (res.ok) {
      const json = await res.json()
      return (json.balance as Wallet[]) || []
    }
  } catch (e) {
    printError(`Failed to Fetch Balances for ${assets.join(', ')}`, e.message)
  }
  return []
}

export default fetchBalances

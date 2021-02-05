import fetch from 'node-fetch'

import { ASSET, Wallet } from '../interfaces'
import { Authorization, printError } from '../utils'

const fetchBalances = async (assets: ASSET[]): Promise<Wallet[]> => {
  try {
    const res = await fetch(`https://api.luno.com/api/1/balance?assets=${assets.join(',')}`, {
      method: 'GET',
      headers: { Authorization }
    })
    if (res.ok) {
      const json = await res.json()
      return json.balance as Wallet[] || []
    }
  } catch (e) {
    printError(`Failed to Fetch Balances for ${assets.join(', ')}`, e.message)
  }
  return []
}

export default fetchBalances

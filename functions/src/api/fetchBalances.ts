import fetch from 'node-fetch'

import { ASSET, Wallet } from '../interfaces'
import { printError, printFetchingBalances } from '../logs'
import { options } from './'

const fetchBalances = async (assets: ASSET[]): Promise<Wallet[]> => {
  printFetchingBalances()
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/balance?assets=${assets
        .map(asset => `assets=${asset}`)
        .join('&')}`,
      options('GET')
    )
    if (res.ok) {
      const { balance } = await res.json()
      return (balance as Wallet[]) || []
    }
  } catch (e) {
    printError(`Failed to Fetch Balances for ${assets.join('|')}`, e.message)
  }
  return []
}

export default fetchBalances

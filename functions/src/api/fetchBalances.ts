import fetch from 'node-fetch'

import { ASSET, Wallet } from '../interfaces'
import { printError, printFetchingBalances } from '../logs'
import handleError from './handleError'
import options from './options'

const fetchBalances = async (assets: ASSET[]): Promise<Wallet[]> => {
  printFetchingBalances()
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/balance?${assets
        .map(asset => `assets=${asset}`)
        .join('&')}`,
      options('GET')
    )
    if (res.ok) {
      const { balance } = await res.json()
      return (balance as Wallet[]) || []
    } else handleError('FAILED TO FETCH BALANCES', res)
  } catch (e) {
    printError(`Failed to Fetch Balances for ${assets.join('|')}`, e.message)
  }
  return []
}

export default fetchBalances

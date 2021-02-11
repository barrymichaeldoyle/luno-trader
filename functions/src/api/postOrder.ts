import fetch from 'node-fetch'

import { ASSET, TickerPair } from '../interfaces'
import { color, printCreatingNewOrder, printError } from '../logs'
import options from './options'

const postOrder = async (
  pair: TickerPair,
  type: 'ASK' | 'BID' | 'BUY' | 'SELL',
  price: string,
  volume: string
): Promise<string | undefined> => {
  printCreatingNewOrder(type, price, volume, pair.substring(0, 3) as ASSET)
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/postorder?pair=${pair}&type=${type}&price=${price}&volume=${volume}`,
      options('POST')
    )
    if (res.ok) {
      const { order_id } = await res.json()
      return order_id as string
    } else console.log('FAILED TO POST ORDER', res)
  } catch (e) {
    printError(
      `Failed to Create New Order -> ${pair} ${type} @ R${price} | ${volume}`,
      e.message
    )
  }
  process.stdout.write(
    color(`NO NEW ORDER CREATED @ R${price} | ${volume}\n`, 'yellow')
  )
  return undefined
}

export default postOrder

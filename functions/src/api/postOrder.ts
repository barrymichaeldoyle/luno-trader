import fetch from 'node-fetch'

import { TickerPair } from '../interfaces'
import { printCreatingNewOrder, printError } from '../logs'
import options from './options'

const postOrder = async (
  pair: TickerPair,
  type: 'ASK' | 'BID' | 'BUY' | 'SELL',
  price: string,
  volume: number
): Promise<string | undefined> => {
  printCreatingNewOrder(type, price, volume)
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/postorder?pair=XRPZAR&type=${type}&price=${price}&volume=${volume}`,
      options('POST')
    )
    if (res.ok) {
      const { order_id } = await res.json()
      return order_id as string
    }
  } catch (e) {
    printError(
      `Failed to Create New Order -> ${pair} ${type} @ R${price} | ${volume}`,
      e.message
    )
  }
  return undefined
}

export default postOrder

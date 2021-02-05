import fetch from 'node-fetch'

import { TickerPair } from '../interfaces'
import { Authorization, printError } from '../utils'

const postOrder = async (
  pair: TickerPair,
  type: 'ASK' | 'BID',
  price: string,
  volume: number
): Promise<string | undefined> => {
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/postorder?pair=XRPZAR&type=${type}&price=${price}&volume=${volume}`,
      { method: 'POST', headers: { Authorization } }
    )
    if (res.ok) {
      const json = await res.json()
      return json.order_id as string
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

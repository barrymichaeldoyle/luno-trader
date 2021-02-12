import fetch from 'node-fetch'

import { color, handleError, printError } from '../../logs'
import { ASSET, PAIR, SIDE } from '../interfaces'
import { printCreatingNewOrder } from '../logs'
import getAuthHeaders from './getAuthHeaders'

const postOrder = async (
  pair: PAIR,
  side: SIDE,
  price: string,
  quantity: string
) => {
  printCreatingNewOrder(side, price, quantity, pair.substring(0, 3) as ASSET)
  try {
    const body = JSON.stringify({
      side,
      quantity,
      price,
      pair,
      postOnly: true
    })
    const headers = getAuthHeaders('/v1/orders/limit', 'POST', body)
    const requestOptions: any = {
      method: 'POST',
      headers,
      body: body,
      redirect: 'follow'
    }
    const res = await fetch(
      'https://api.valr.com/v1/orders/limit',
      requestOptions
    )
    if (res.ok) {
      const { id } = await res.json()
      return id
    } else handleError('FAILED TO POST ORDER', res)
  } catch (e) {
    printError(
      `Failed to Create New Order -> ${pair} ${side} @ R${price} | ${quantity}`,
      e.message
    )
  }
  process.stdout.write(
    color(`NO NEW ORDER CREATED @ R${price} | ${quantity}\n`, 'yellow')
  )
  return undefined
}

export default postOrder

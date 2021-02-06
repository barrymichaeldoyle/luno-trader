import fetch from 'node-fetch'

import { Order } from '../interfaces'
import { printError } from '../logs'
import options from './options'

const fetchOrder = async (id: string): Promise<Order | undefined> => {
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/orders/${id}`,
      options('GET')
    )
    if (res.ok) {
      const json = await res.json()
      return json as Order | undefined
    } else console.log(res)
  } catch (e) {
    printError(`Failed to Fetch Order ${id}`, e.message)
  }
  return undefined
}

export default fetchOrder

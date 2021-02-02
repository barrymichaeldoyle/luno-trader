import fetch from 'node-fetch'

import { Order } from '../interfaces'
import { Authorization } from '../utils'

const fetchOrder = async (id: string): Promise<Order | undefined> => {
  try {
    const res = await fetch(`https://api.luno.com/api/1/orders/${id}`, {
      method: 'GET',
      headers: { Authorization }
    })
    if (res.ok) {
      const json = await res.json()
      return json as Order | undefined
    }
  } catch (e) {
    process.stderr.write(`\nError Fetching Order: ${e.message}`)
  }
  return undefined
}

export default fetchOrder

import fetch from 'node-fetch'

import { printCancelSuccess, printError } from '../logs'
import handleError from './handleError'
import options from './options'

const stopOrder = async (orderId: string): Promise<boolean> => {
  try {
    const res = await fetch(
      `https://api.luno.com/api/1/stoporder?order_id=${orderId}`,
      options('POST')
    )
    if (res.ok) {
      const { success } = await res.json()
      if (success) {
        printCancelSuccess(orderId)
        return true
      }
    } else handleError('FAILED TO STOP ORDER', res)
  } catch (e) {
    printError(`Failed to Stop Order ${orderId}`, e.message)
  }
  return false
}

export default stopOrder

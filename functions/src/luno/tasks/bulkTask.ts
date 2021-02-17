import select from 'cli-select'

import { color, selectOptions } from '../../logs'
import { fetchPendingOrders, postOrder, stopOrder } from '../api'
import { Order, PAIR } from '../interfaces'
import { printMergeSuccess } from '../logs'

const bulkTask = async (taskType: 'CANCEL' | 'MERGE', pair: PAIR) => {
  const orders = await fetchPendingOrders(pair)

  interface OrderGroups {
    [limit_price: string]: Array<Order>
  }
  const orderGroups: OrderGroups = {}
  orders.forEach(order => {
    if (orderGroups[order.limit_price])
      orderGroups[order.limit_price].push(order)
    else orderGroups[order.limit_price] = [order]
  })

  process.stdout.write(
    color(
      `Which group of orders would you like to ${taskType.toLowerCase()}?\n`,
      'yellow'
    )
  )

  interface Values {
    [key: string]: string
  }

  const values: Values = {}
  values.back = color('Back', 'yellow')
  Object.keys(orderGroups).forEach(
    group =>
      (values[group] = `R ${group}\t ${color(
        `${orderGroups[group].length} Order${
          orderGroups[group].length === 1 ? '' : 's'
        }`,
        'cyan'
      )}`)
  )

  const { id } = await select({ values, ...selectOptions })

  let volume = 0

  if (id === 'back') return
  else
    await Promise.all(
      orderGroups[id].map(async ({ order_id, limit_volume }) => {
        const success = await stopOrder(order_id)
        if (success && taskType === 'MERGE') volume += Number(limit_volume)
      })
    )

  if (taskType === 'MERGE') {
    const type = orderGroups[id][0].type
    const price = orderGroups[id][0].limit_price
    const orderId = await postOrder(pair, type, price, volume.toString())
    if (orderId) printMergeSuccess(orderId, type, price, volume.toString())
  }
}

export default bulkTask

import select from 'cli-select'

import { fetchPendingOrders } from '../api'
import { Order, TickerPair } from '../interfaces'
import { Authorization, color, printError, selected, unselected } from '../utils'

const bulkTask = async (taskType: 'CANCEL' | 'MERGE', pair: TickerPair) => {
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

  const { id } = await select({
    values,
    selected,
    unselected
  })

  let volume = 0

  if (id === 'back') return
  else
    await Promise.all(
      orderGroups[id].map(async ({ order_id, limit_volume }) => {
        try {
          const res = await fetch(
            `https://api.luno.com/api/1/stoporder?order_id=${order_id}`,
            {
              method: 'POST',
              headers: { Authorization }
            }
          )
          const json = await res.json()
          if (json.success)
            process.stdout.write(
              `${color('Successfully Cancelled', 'green')} ${color(
                `ORDER ${order_id}\n`,
                'yellow'
              )}`
            )
          if (taskType === 'MERGE') volume = volume + Number(limit_volume)
        } catch (e) {
          printError(`Failed to Stop Order ${order_id}`, e.message)
        }
      })
    )

  if (taskType === 'MERGE') {
    const type = orderGroups[id][0].type
    const price = orderGroups[id][0].limit_price
    try {
      const res = await fetch(
        `https://api.luno.com/api/1/postorder?pair=${pair}&type=${type}&volume=${volume}&price=${price}`,
        { method: 'POST', headers: { Authorization } }
      )
      const json = await res.json()
      process.stdout.write(
        `${color(`Successfully Created New Order:`, 'green')} ${color(
          json.order_id,
          'yellow'
        )} ${color(type, type === 'ASK' ? 'red' : 'green')} ${color(
          '@',
          'cyan'
        )} R ${price} ${color(volume.toString(), 'yellow')}`
      )
    } catch (e) {
      printError('Failed to Post New Order', e.message)
    }
  }
}

export default bulkTask

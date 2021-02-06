import { Order } from '../interfaces'
import { color } from '../logs'

interface Values {
  [x: string]: string
}

const getOrderSelectValues = (orders: Order[]) => {
  const values: Values = {}
  values.back = color('Back', 'yellow')
  values.all = color('All Orders', 'yellow')
  orders.forEach(
    ({ order_id, type, limit_volume, limit_price }) =>
      (values[order_id] = `${color(
        type,
        type === 'ASK' ? 'red' : 'green'
      )} ${color('@', 'cyan')} R ${limit_price}\t${color(
        '|',
        'magenta'
      )} ${color(Number(limit_volume).toString(), 'yellow')}`)
  )
  return values
}

export default getOrderSelectValues

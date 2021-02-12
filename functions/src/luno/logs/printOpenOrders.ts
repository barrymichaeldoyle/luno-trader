import { color } from '../../logs'
import { Order } from '../interfaces'

const printOpenOrders = (orders: Order[]) => {
  if (orders.length) {
    process.stdout.write(color(`Open Orders:`, 'cyan'))
    process.stdout.write(color('\n======================\n', 'magenta'))

    orders.forEach(({ type, limit_volume, limit_price }) =>
      process.stdout.write(
        `${color(type, type === 'ASK' ? 'red' : 'green')} ${color(
          '@',
          'cyan'
        )} R ${limit_price}\t${color('|', 'magenta')} ${color(
          Number(limit_volume).toString(),
          'yellow'
        )}\n`
      )
    )
  } else
    process.stdout.write(
      color(`You currently have no open orders\n`, 'magenta')
    )
}

export default printOpenOrders

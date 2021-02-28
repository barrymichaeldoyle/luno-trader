import moment from 'moment'

import { color } from '../../logs'
import { PAIR, TYPE } from '../interfaces'

const printCreatingNewOrder = (
  type: TYPE,
  price: string,
  volume: string,
  pair: PAIR
) =>
  process.stdout.write(
    `${color(
      `[${moment().format('HH:mm:ss')}]`,
      'cyan'
    )} Creating New Order -> ${color(
      type,
      type === 'ASK' || type === 'BUY' ? 'red' : 'green'
    )} ${color(`${volume} ${pair.substring(0, 3)}`, 'yellow')} ${color(
      `@ ${Number(price)} ${pair.substring(3)}`,
      'white'
    )}\n`
  )

export default printCreatingNewOrder

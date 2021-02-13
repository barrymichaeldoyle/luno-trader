import moment from 'moment'

import { color } from '../../logs'
import { ASSET, SIDE } from '../interfaces'

const printCreatingNewOrder = (
  side: SIDE,
  price: string,
  quantity: string,
  asset: ASSET
) =>
  process.stdout.write(
    `${color(
      `[${moment().format('HH:mm:ss')}]`,
      'cyan'
    )} Creating New Order -> ${color(
      side.toUpperCase(),
      side === 'sell' ? 'red' : 'green'
    )} ${color(`@ R${Number(price).toFixed(2)}`, 'white')} ${color(
      `${quantity} ${asset}`,
      'yellow'
    )}\n`
  )

export default printCreatingNewOrder

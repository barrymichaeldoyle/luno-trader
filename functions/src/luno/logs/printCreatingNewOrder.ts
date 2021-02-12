import moment from 'moment'

import { color } from '../../logs'
import { ASSET, TYPE } from '../interfaces'

const printCreatingNewOrder = (
  type: TYPE,
  price: string,
  volume: string,
  asset: ASSET
) =>
  process.stdout.write(
    `${color(
      `[${moment().format('HH:mm:ss')}]`,
      'cyan'
    )} Creating New Order -> ${color(
      type,
      type === 'ASK' || type === 'BUY' ? 'red' : 'green'
    )} ${color(`@ R${Number(price).toFixed(2)}`, 'white')} ${color(
      `${volume} ${asset}`,
      'yellow'
    )}\n`
  )

export default printCreatingNewOrder

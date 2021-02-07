import moment from 'moment'

import { Type } from '../interfaces'
import color from './color'

const printCreatingNewOrder = (type: Type, price: string, volume: string) =>
  process.stdout.write(
    `${color(
      `[${moment().format('HH:mm:ss')}]`,
      'cyan'
    )} Creating New Order -> ${color(
      type,
      type === 'ASK' || type === 'BUY' ? 'red' : 'green'
    )} ${color(`@ R${Number(price).toFixed(2)}`, 'white')} ${color(
      `${volume} XRP`,
      'white'
    )}\n`
  )

export default printCreatingNewOrder

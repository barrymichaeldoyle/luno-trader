import moment from 'moment'

import color from './color'

const printCreatingNewOrder = (
  type: 'ASK' | 'BID' | 'BUY' | 'SELL',
  price: string,
  volume: string
) =>
  process.stdout.write(
    `${color(
      `[${moment().format('HH:mm:ss')}]`,
      'cyan'
    )} Creating New Order -> ${color(type, 'green')} ${color(
      volume,
      'white'
    )} ${color(`@ R${price}`, 'yellow')}\n`
  )

export default printCreatingNewOrder

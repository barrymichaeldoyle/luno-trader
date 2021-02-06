import moment from 'moment'

import color from './color'

const printCreatingNewOrder = (
  type: 'ASK' | 'BID' | 'BUY' | 'SELL',
  price: string,
  volume: number
) =>
  process.stdout.write(
    `\n${color(
      `[${moment().format('HH:mm:ss')}]`,
      'cyan'
    )} Creating New Order -> ${color(type, 'green')} ${color(
      volume.toString(),
      'white'
    )} ${color(`@ R${price}`, 'yellow')}\n`
  )

export default printCreatingNewOrder

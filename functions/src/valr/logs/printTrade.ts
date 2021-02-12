import { color } from '../../logs'
import { getUnitPrecision } from '../common'
import { PAIR, SIDE } from '../interfaces'

const printTrade = (pair: PAIR, side: SIDE, price: string, volume: string) =>
  process.stdout.write(
    `${color(`Trade ${pair}: `, 'cyan')} ${color(
      side === 'sell' ? 'SOLD' : 'BOUGHT',
      side === 'sell' ? 'red' : 'green'
    )} ${color(
      Number(Number(volume).toFixed(getUnitPrecision(pair))).toString(),
      'white'
    )} ${color(`@ R${Number(price).toFixed(2)}`, 'yellow')}\n`
  )

export default printTrade

import { color } from '../../logs'
import { getUnitPrecision } from '../common'
import { PAIR, TYPE } from '../interfaces'

const printTrade = (pair: PAIR, type: TYPE, price: string, volume: string) =>
  process.stdout.write(
    `${color(`Trade ${pair}: `, 'cyan')} ${color(
      type === 'ASK' ? 'SOLD' : 'BOUGHT',
      type === 'ASK' ? 'red' : 'green'
    )} ${color(
      Number(volume).toFixed(getUnitPrecision(pair)),
      'white'
    )} ${color(`@ R${Number(price).toFixed(2)}`, 'yellow')}\n`
  )

export default printTrade

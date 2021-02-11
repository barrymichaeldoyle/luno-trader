import { getUnitPrecision } from '../common'
import { TickerPair, Type } from '../interfaces'
import { color } from './'

const printTrade = (
  pair: TickerPair,
  type: Type,
  price: string,
  volume: string
) =>
  process.stdout.write(
    `${color(`Trade ${pair}: `, 'cyan')} ${color(
      type === 'ASK' ? 'SOLD' : 'BOUGHT',
      type === 'ASK' ? 'red' : 'green'
    )} ${color(
      Number(volume).toFixed(getUnitPrecision(pair)),
      'white'
    )} ${color(`@ R${price}`, 'yellow')}\n`
  )

export default printTrade

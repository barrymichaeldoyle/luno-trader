import { color } from '../../logs'
import { getUnitPrecision } from '../common'
import { PAIR, TYPE } from '../interfaces'

const tradePair = (pair: PAIR) => color(`Trade ${pair}:`, 'cyan')
const tradeType = (type: TYPE) =>
  color(type === 'ASK' ? 'SOLD' : 'BOUGHT', type === 'ASK' ? 'red' : 'green')
const tradeVolume = (volume: string, pair: PAIR) =>
  color(Number(volume).toFixed(getUnitPrecision(pair)), 'white')
const tradePrice = (price: string) =>
  color(`@ R${Number(price).toFixed(2)}`, 'yellow')

const printTrade = (pair: PAIR, type: TYPE, price: string, volume: string) =>
  process.stdout.write(
    `${tradePair(pair)} ${tradeType(type)} ${tradeVolume(
      volume,
      pair
    )} ${tradePrice(price)}\n`
  )

export default printTrade

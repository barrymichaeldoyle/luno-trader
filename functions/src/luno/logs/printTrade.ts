import { color } from '../../logs'
import { getPricePrecision, getUnitPrecision } from '../common'
import { PAIR, TYPE } from '../interfaces'

const tradePair = (pair: PAIR) => color(`Trade ${pair}:`, 'cyan')
const tradeType = (type: TYPE) =>
  color(type === 'ASK' ? 'SOLD' : 'BOUGHT', type === 'ASK' ? 'red' : 'green')
const tradeVolume = (volume: string, pair: PAIR) =>
  color(
    `${Number(volume).toFixed(getUnitPrecision(pair))} ${pair.substring(0, 3)}`,
    'white'
  )
const tradePrice = (price: string, pair: PAIR) =>
  color(
    `@ ${Number(price).toFixed(getPricePrecision(pair))} ${pair.substring(3)}`,
    'yellow'
  )

const printTrade = (pair: PAIR, type: TYPE, price: string, volume: string) =>
  process.stdout.write(
    `${tradePair(pair)} ${tradeType(type)} ${tradeVolume(
      volume,
      pair
    )} ${tradePrice(price, pair)}\n`
  )

export default printTrade

import { Type } from '../interfaces'
import { color } from './'

const printTrade = (type: Type, price: string, volume: string) =>
  process.stdout.write(
    `${color('Trade: ', 'cyan')} ${color(type, 'green')} ${color(
      Number(volume).toFixed(0),
      'white'
    )} ${color(`@ R${price}`, 'yellow')}\n`
  )

export default printTrade

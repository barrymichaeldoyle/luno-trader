import { color } from '../../logs'
import { TYPE } from '../interfaces'

const printMergeSuccess = (
  orderId: string,
  type: TYPE,
  price: string,
  volume: string
) =>
  process.stdout.write(
    `${color(`Successfully Created New Merged Order:`, 'green')} ${color(
      orderId,
      'yellow'
    )} ${color(type, type === 'ASK' ? 'red' : 'green')} ${color(
      '@',
      'cyan'
    )} R ${price} ${color(volume.toString(), 'yellow')}`
  )

export default printMergeSuccess

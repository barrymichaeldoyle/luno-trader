import moment from 'moment'

import { Trade } from '../interfaces'
import color from './color'

const printTradesExecuted = (newTrades: Trade[]) =>
  process.stdout.write(
    `\n${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} New Trade${
      newTrades.length === 1 ? '' : 's'
    } Executed!\n`
  )

export default printTradesExecuted

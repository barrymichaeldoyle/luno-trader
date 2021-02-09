import moment from 'moment'

import { Trade } from '../interfaces'
import color from './color'

const printNewTradesExecuted = (trades: Trade[]) =>
  process.stdout.write(
    `\n${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} New Trade${
      trades.length === 1 ? '' : 's'
    } Executed!\n`
  )

export default printNewTradesExecuted

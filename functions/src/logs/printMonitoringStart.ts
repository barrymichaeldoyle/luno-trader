import moment from 'moment'

import { TickerPair } from '../interfaces'
import { color } from './'

const printMonitoringStart = (pair: TickerPair) =>
  process.stdout.write(
    `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
      `Started Monitoring Trades for ${color(pair, 'yellow')}`,
      'green'
    )}\n`
  )

export default printMonitoringStart

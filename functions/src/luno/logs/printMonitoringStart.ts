import moment from 'moment'

import { color } from '../../logs'
import { PAIR } from '../interfaces'

const printMonitoringStart = (pair: PAIR) =>
  process.stdout.write(
    `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
      `Started Monitoring LUNO Trades for ${color(pair, 'yellow')}`,
      'green'
    )}\n`
  )

export default printMonitoringStart

import moment from 'moment'

import { color } from '../../logs'

const printMonitoringStart = () =>
  process.stdout.write(
    `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
      `Started Monitoring VALR Trades for ${color('ALL', 'yellow')}`,
      'green'
    )}\n`
  )

export default printMonitoringStart

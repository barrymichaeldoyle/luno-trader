import moment from 'moment'

import { color } from './'

const printMonitoringStart = () =>
  process.stdout.write(
    `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
      'Started Monitoring Trades',
      'green'
    )}\n`
  )

export default printMonitoringStart

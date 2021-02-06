import moment from 'moment'

import { color } from './'

const printMonitoringStart = (orderId: string) =>
  process.stdout.write(
    `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
      'Started Monitoring Trades For',
      'green'
    )} ${color(`ORDER ${orderId.toString()}`, 'yellow')}\n`
  )

export default printMonitoringStart

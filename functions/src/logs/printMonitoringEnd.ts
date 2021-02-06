import moment from 'moment'

import color from './color'

const printMonitoringEnd = (orderId: string) =>
  process.stdout.write(
    `${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
      `ORDER ${orderId}`,
      'yellow'
    )} ${color('COMPLETE -> Stop Monitoring Trades', 'green')}\n`
  )

export default printMonitoringEnd

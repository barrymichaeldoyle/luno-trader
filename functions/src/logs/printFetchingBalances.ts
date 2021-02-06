import moment from 'moment'

import color from './color'

const printFetchingBalances = () =>
  process.stdout.write(
    `\n${color(`[${moment().format('HH:mm:ss')}]`, 'cyan')} ${color(
      'Fetching Balances...',
      'magenta'
    )}`
  )

export default printFetchingBalances

import { Ticker } from '../interfaces'
import color from './color'

const printTicker = (ticker?: Ticker) => {
  if (ticker)
    process.stdout.write(
      `${color(`BID R ${Number(ticker.bid).toFixed(2)}`, 'green')} ${color(
        '|',
        'magenta'
      )} ${color(`ASK R ${Number(ticker.ask).toFixed(2)}`, 'red')}\n\n`
    )
}

export default printTicker

import prompt from 'prompt-sync'

import { printSelectedSpread, printWelcome } from './logs'
import { monitorTrades } from './tasks'

const main = async () => {
  printWelcome()
  const startTime = Math.round(new Date().getTime())
  const spreadInput = prompt({ sigint: true })(
    `Select Spread % (Min: 0.1% / Default: 0.5%) > `
  )
  const spread =
    spreadInput.length === 0
      ? 0.5
      : Number(spreadInput) < 0.1
      ? 0.1
      : Number(spreadInput)

  printSelectedSpread(spread)

  monitorTrades('XRPZAR', startTime, spread, [], true)
  monitorTrades('XBTZAR', startTime, spread, [], true)
  monitorTrades('ETHZAR', startTime, spread, [], true)
  monitorTrades('LTCZAR', startTime, spread, [], true)
}

export default main

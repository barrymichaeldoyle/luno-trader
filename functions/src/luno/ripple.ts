import select from 'cli-select'
import prompt from 'prompt-sync'

import { fetchPendingOrders, fetchTicker } from './api'
import { getAvailableFunds } from './common'
import {
  color, printAvailableBalances, printOpenOrders, printSelectedSpread, printTicker, printWelcome,
  selectOptions
} from './logs'
import { bulkTask, monitorTrades } from './tasks'

const main = async () => {
  let run = true
  printWelcome()
  while (run) {
    const [{ XRP, ZAR }, ticker, orders] = await Promise.all([
      getAvailableFunds(['XRP', 'ZAR']),
      fetchTicker('XRPZAR'),
      fetchPendingOrders('XRPZAR')
    ])
    printAvailableBalances(ZAR, XRP)
    printTicker(ticker)
    printOpenOrders(orders)

    process.stdout.write(color('\nWhat would you like to do?:\n', 'yellow'))
    const { id: whatToDoOption } = await select({
      values: {
        hft: 'HFT (High Frequency Trading)',
        bulkMerge: 'Bulk Merge Orders',
        bulkCancel: 'Bulk Cancel Orders',
        refresh: 'Refresh',
        exit: 'Exit'
      },
      ...selectOptions
    })

    switch (whatToDoOption) {
      case 'hft': {
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
        run = false
        continue
      }
      case 'bulkCancel': {
        await bulkTask('CANCEL', 'XRPZAR')
        continue
      }
      case 'bulkMerge':
        await bulkTask('MERGE', 'XRPZAR')
        continue
      case 'refresh':
        continue

      case 'exit':
      default:
        run = false
    }
  }
}

export default main

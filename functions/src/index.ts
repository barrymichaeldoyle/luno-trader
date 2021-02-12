const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '../.env')
})

import prompt from 'prompt-sync'

import { printSelectedSpread, printWelcome } from './logs'
import { monitorTrades as monitorLunoTrades } from './luno/tasks'
import { monitorTrades as monitorValrTrades } from './valr/tasks'

const main = async () => {
  if (!process.env.LUNO_API_KEY && !process.env.VAL_API_KEY)
    // return process.stdout.write(color('NOT API KEY FOUND', 'yellow'))
    return console.error('NO API KEY FOUND!')

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

  if (process.env.LUNO_API_KEY) {
    monitorLunoTrades('XRPZAR', startTime, spread, [], true)
    monitorLunoTrades('XBTZAR', startTime, spread, [], true)
    monitorLunoTrades('ETHZAR', startTime, spread, [], true)
    monitorLunoTrades('LTCZAR', startTime, spread, [], true)
  }
  if (process.env.VALR_API_KEY) monitorValrTrades(spread, true)
}

main()

// res.status, res.url, res.statusText

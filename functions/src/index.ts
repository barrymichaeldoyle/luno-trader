const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '../.env')
})

import { getReinvestSellingGains, getSpread } from './constants'
import { printWelcome } from './logs'
import { monitorTrades as monitorLunoTrades } from './luno/tasks'
import { monitorTrades as monitorValrTrades } from './valr/tasks'

const main = async () => {
  if (!process.env.LUNO_API_KEY && !process.env.VAL_API_KEY)
    // TODO: figure out a way to print this before exiting app
    // return process.stdout.write(color('NOT API KEY FOUND', 'yellow'))
    return console.error('NO API KEY FOUND!')

  printWelcome()

  const startTime = Math.round(new Date().getTime())
  const spread = await getSpread()
  const reinvestSellingGains = await getReinvestSellingGains()

  if (process.env.LUNO_API_KEY) {
    // monitorLunoTrades('XRPZAR', startTime, spread, reinvestSellingGains, true)
    // monitorLunoTrades('XBTZAR', startTime, spread, reinvestSellingGains, true)
    // monitorLunoTrades('ETHZAR', startTime, spread, reinvestSellingGains, true)
    // monitorLunoTrades('LTCZAR', startTime, spread, reinvestSellingGains, true)
    monitorLunoTrades('LTCXBT', startTime, spread, reinvestSellingGains, true)
    monitorLunoTrades('ETHXBT', startTime, spread, reinvestSellingGains, true)
    monitorLunoTrades('XRPXBT', startTime, spread, reinvestSellingGains, true)
  }
  if (process.env.VALR_API_KEY)
    monitorValrTrades(spread, reinvestSellingGains, true)
}

main()

// res.status, res.url, res.statusText

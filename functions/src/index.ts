const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '../.env')
})
import allTrader from './all'

const main = () => {
  allTrader()
}

main()

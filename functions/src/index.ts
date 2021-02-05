const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '../.env')
})
import rippleTrader from './ripple'

const main = () => {
  rippleTrader()
}

main()

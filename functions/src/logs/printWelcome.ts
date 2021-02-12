import color from './color'

const printWelcome = () =>
  process.stdout.write(
    `\n${color('Welcome Colin!', 'cyan')}\n${color(
      'This Bot Monitors Trades across BTC/ZAR, ETH/ZAR, LTC/ZAR & XRP/ZAR\nand performs a counter trade calculated from the spread % that you enter below.',
      'green'
    )}\n${color('Happy Trading!', 'cyan')}\n\n`
  )

export default printWelcome

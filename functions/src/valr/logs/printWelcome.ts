import { color } from '../../logs'

const printWelcome = () =>
  process.stdout.write(
    `\n${color(
      `Welcome ${process.env.WELCOME_NAME || 'Human'}!`,
      'cyan'
    )}\n${color(
      'This VALR Bot Monitors Trades across BTC/ZAR, ETH/ZAR & XRP/ZAR\nand performs a counter trade calculated from the spread % that you enter below.',
      'green'
    )}\n${color('Happy Trading!', 'cyan')}\n\n`
  )

export default printWelcome

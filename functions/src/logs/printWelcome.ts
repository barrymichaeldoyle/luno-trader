import color from './color'

const printWelcome = () =>
  process.stdout.write(
    `\n${color(
      `Welcome ${process.env.WELCOME_NAME || 'Human'} to Barry's Trading Bot!`,
      'cyan'
    )}\n${color(
      'This Bot Monitors all your trades across LUNO and VALR\nand performs a counter trade calculated from the spread % that you enter below.',
      'green'
    )}\n${color('Happy Trading!', 'cyan')}\n\n`
  )

export default printWelcome

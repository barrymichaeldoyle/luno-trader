import color from './color'

const printWelcome = () =>
  process.stdout.write(color(`\nWelcome to Barry's Trading Bot:\n`, 'green'))

export default printWelcome

import color from './color'

const printError = (friendly: string, technical: string) =>
  process.stdout.write(
    `${color(`${friendly}: `, 'red')}${color(`${technical}`, 'yellow')}\n`
  )

export default printError

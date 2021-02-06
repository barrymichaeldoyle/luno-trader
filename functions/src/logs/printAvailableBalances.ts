import color from './color'

const printAvailableBalances = (zar?: string, currency?: string) => {
  process.stdout.write(
    `${color('Available', 'yellow')}:  ${color(`R ${zar}`, 'green')} ${color(
      `|`,
      'magenta'
    )} ${color(`${currency}`, 'green')}\n`
  )
}

export default printAvailableBalances

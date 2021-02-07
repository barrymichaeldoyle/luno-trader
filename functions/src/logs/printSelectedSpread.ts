import color from './color'

const printSelectedSpread = (spread: number) =>
  process.stdout.write(
    `${color('Selected Spread:', 'cyan')} ${color(`${spread}%`, 'green')}\n`
  )

export default printSelectedSpread

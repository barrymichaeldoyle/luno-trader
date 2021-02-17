import color from './color'

const printSelectedReinvestSellingGains = (yesOrNo: boolean) =>
  process.stdout.write(
    `${color('Reinvest Selling Gains:', 'cyan')} ${color(
      `${yesOrNo ? 'YES' : 'NO'}`,
      'green'
    )}\n`
  )

export default printSelectedReinvestSellingGains

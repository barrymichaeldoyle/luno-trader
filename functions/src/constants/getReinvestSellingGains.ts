import select from 'cli-select'

import { color, printSelectedReinvestSellingGains, selectOptions } from '../logs'

const getReinvestSellingGains = async () => {
  const envReinvestSellingGains = process.env.REINVEST_SELLING_GAINS
  let reinvest = true
  console.log()
  if (envReinvestSellingGains === undefined) {
    process.stdout.write(
      color('\nWould you like to reinvest your selling gains?:\n', 'yellow')
    )
    const { id: yesOrNo } = await select({
      values: { yes: 'Yes', no: 'No' },
      ...selectOptions
    })
    reinvest = yesOrNo === 'yes'
  } else reinvest = envReinvestSellingGains === 'true'

  printSelectedReinvestSellingGains(reinvest)
  return reinvest
}

export default getReinvestSellingGains

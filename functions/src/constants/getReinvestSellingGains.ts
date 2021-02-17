import select from 'cli-select'

import { color, printSelectedReinvestSellingGains, selectOptions } from '../logs'

const getReinvestSellingGains = async () => {
  const envReinvestSellingGains = process.env.REINVEST_SELLING_GAINS
  let reinvest = true
  if (!envReinvestSellingGains) {
    process.stdout.write(
      color('\nWould you like to reinvest your selling gains?:\n', 'yellow')
    )
    const { id: yesOrNo } = await select({
      values: { yes: 'Yes', no: 'No' },
      ...selectOptions
    })
    reinvest = yesOrNo === 'yes'
  } else reinvest = Boolean(envReinvestSellingGains)

  printSelectedReinvestSellingGains
}

export default getReinvestSellingGains

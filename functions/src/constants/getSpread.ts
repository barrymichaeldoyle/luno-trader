import prompt from 'prompt-sync'

import { printSelectedSpread } from '../logs'

const getSpread = async () => {
  const envSpread = process.env.SPREAD
  let spreadResult = 0.5

  if (!envSpread) {
    const spreadInput = prompt({ sigint: true })(
      `Select Spread % (Min: 0.1% / Default: 0.5%) > `
    )
    spreadResult =
      spreadInput.length === 0
        ? 0.5
        : Number(spreadInput) < 0.1
        ? 0.1
        : Number(spreadInput)
  } else if (Number(envSpread) !== NaN) spreadResult = Number(envSpread)

  printSelectedSpread(spreadResult)
  return spreadResult
}

export default getSpread

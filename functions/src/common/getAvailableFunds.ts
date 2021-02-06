import { fetchBalances } from '../api'
import { ASSET } from '../interfaces'

interface AvailableFunds {
  XBT?: string
  ETH?: string
  LTC?: string
  XRP?: string
  SAVINGS?: string
  ZAR?: string
}

const getFixedValue = (asset: ASSET) => {
  switch (asset) {
    case 'ETH':
    case 'XBT':
      return 6
    case 'LTC':
      return 4
    case 'XRP':
      return 0
    case 'ZAR':
    default:
      return 2
  }
}

const getAvailableFunds = async (assets: ASSET[]) => {
  const balances = await fetchBalances(assets)

  const availabeFunds: AvailableFunds = {}
  balances.forEach(
    ({ asset, balance, reserved }) =>
      (availabeFunds[asset as ASSET] = `${(
        Number(balance) - Number(reserved)
      ).toFixed(getFixedValue(asset as ASSET))}${
        asset === 'ZAR' ? '' : ` ${asset}`
      }`)
  )

  return availabeFunds
}

export default getAvailableFunds

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

const getAvailableFunds = async (assets: ASSET[]) => {
  const balances = await fetchBalances(assets)

  const availabeFunds: AvailableFunds = {}
  balances.forEach(
    ({ asset, balance, reserved }) =>
      (availabeFunds[asset as ASSET] = (
        Number(balance) - Number(reserved)
      ).toFixed(asset === 'XRP' ? 2 : 0))
  )

  return availabeFunds
}

export default getAvailableFunds

import base64 from 'base-64'

import { GetState } from './interfaces'

export const getAuthorization = (getState: GetState) => {
  const { apiKey, apiSecret } = getState().config
  return `Basic ${base64.encode(`${apiKey}:${apiSecret}`)}`
}

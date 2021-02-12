import crypto from 'crypto'

import { VERB } from '../interfaces'

const signRequest = (
  timestamp: number,
  verb: 'GET' | 'POST',
  path: string,
  body: string
) =>
  crypto
    .createHmac('sha512', process.env.VALR_API_SECRET || '')
    .update(timestamp.toString())
    .update(verb)
    .update(path)
    .update(body)
    .digest('hex')

const getAuthHeaders = (path: string, verb: VERB = 'GET', body = '') => {
  const headers = new Object() as any
  const timestamp = new Date().getTime()
  const signature = signRequest(timestamp, verb, path, body)

  headers['X-VALR-API-KEY'] = process.env.VALR_API_KEY
  headers['X-VALR-SIGNATURE'] = signature
  headers['X-VALR-TIMESTAMP'] = timestamp

  return headers
}

export default getAuthHeaders

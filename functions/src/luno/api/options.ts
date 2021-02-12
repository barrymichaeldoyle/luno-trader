import base64 from 'base-64'

const { LUNO_API_KEY, LUNO_API_SECRET } = process.env

export const Authorization = `Basic ${base64.encode(
  `${LUNO_API_KEY}:${LUNO_API_SECRET}`
)}`

const options = (method: 'GET' | 'POST') => ({
  method,
  headers: { Authorization }
})

export default options

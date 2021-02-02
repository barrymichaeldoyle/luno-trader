import base64 from 'base-64'
import dotenv from 'dotenv'

dotenv.config()

const { API_KEY, API_SECRET, SAVINGS_ID } = process.env

export const Authorization = `Basic ${base64.encode(
  `${API_KEY}:${API_SECRET}`
)}`
export const savingsId = SAVINGS_ID

type Color =
  | 'yellow'
  | 'blue'
  | 'green'
  | 'cyan'
  | 'red'
  | 'magenta'
  | 'white'
  | 'gray'

const colors = {
  yellow: [33, 89],
  blue: [34, 89],
  green: [32, 89],
  cyan: [36, 89],
  red: [31, 89],
  magenta: [35, 89],
  white: [37, 89],
  gray: [30, 89]
}

export const color = (str: string, colorName: Color = 'yellow') => {
  const col = colors[colorName]
  const start = '\x1b[' + col[0] + 'm'
  const stop = '\x1b[' + col[1] + 'm\x1b[0m'
  return start + str + stop
}

export const selected =
  color('[', 'cyan') + color('X', 'green') + color(']', 'cyan')
export const unselected = color('[ ]', 'cyan')

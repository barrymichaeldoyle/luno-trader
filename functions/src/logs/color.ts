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

const color = (str: string, colorName: Color = 'white') => {
  const col = colors[colorName]
  const start = '\x1b[' + col[0] + 'm'
  const stop = '\x1b[' + col[1] + 'm\x1b[0m'
  return start + str + stop
}

export default color

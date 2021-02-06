import color from './color'

export const selectOptions = {
  selected: color('[', 'cyan') + color('X', 'green') + color(']', 'cyan'),
  unselected: color('[ ]', 'cyan')
}

export default selectOptions

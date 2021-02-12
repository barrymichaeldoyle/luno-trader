import { Response } from 'node-fetch'

import color from './color'

const handleError = (failedMessage: string, res: Response) => {
  process.stdout.write(
    `\n${color(failedMessage.toUpperCase(), 'red')}\nURL: ${color(
      res.url,
      'green'
    )}\nStatus: ${color(res.status.toString(), 'yellow')}\nStatus Text: ${color(
      res.statusText,
      'green'
    )}\n\n`
  )
}

export default handleError

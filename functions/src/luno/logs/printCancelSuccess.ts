import { color } from '../../logs'

const printCancelSuccess = (orderId: string) =>
  process.stdout.write(
    `${color('Successfully Cancelled', 'green')} ${color(
      `ORDER ${orderId}\n`,
      'yellow'
    )}`
  )

export default printCancelSuccess

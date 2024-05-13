import dotenv from 'dotenv'

dotenv.config()

import { app } from './app'
import { logger } from './common'
import './startup'

const port = process.env.PORT
const server = app.listen(port, () => {
  logger.debug(`listening on port ${port}...`)
})

const exceptionHandler = (error: Error) => {
  logger.error(error)

  if (server) {
    server.close()
  }

  process.exit(1)
}

process.on('uncaughtException', exceptionHandler)
process.on('unhandledRejection', exceptionHandler)

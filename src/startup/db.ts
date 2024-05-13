import { logger } from '../common'
import { dbConnection } from '../db'

dbConnection
  .authenticate()
  .then(() => {
    logger.debug(`db connected successfully`)
  })
  .catch((err) => {
    logger.warn(`error connecting to db --- ${err}`)
  })

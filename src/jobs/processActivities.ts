import { CronJob } from 'cron'
import axios from 'axios'

import { dbConnection } from '../db'
import { ProviderApiResponse, logger } from '../common'
import {
  handleActivityPostProcessing,
  saveActivities,
} from '../modules/activity/service'
import {
  createOffsetToken,
  getLatestOffsetToken,
} from '../modules/offset/repository'

const url = process.env.API_URL as string

const processActivities = async () => {
  logger.debug(`@processActivitiesJob starting... ${new Date()}`)
  if (!url) {
    logger.warn('@processActivitiesJob API_URL not provided')
    return
  }

  const continuation = await getLatestOffsetToken()
  const query = continuation ? `&continuation=${continuation}` : ''

  const { data } = await axios.get<ProviderApiResponse>(`${url}${query}`)
  const transaction = await dbConnection.transaction()

  try {
    const activities = await saveActivities(data, transaction)
    await createOffsetToken(data.continuation, transaction)
    await handleActivityPostProcessing(activities, transaction)
    await transaction.commit()
    logger.debug(
      `@processActivitiesJob done with ${
        activities.length
      } records ---- ${new Date()}`,
    )
  } catch (err) {
    await transaction.rollback()
    logger.warn(`@processActivitiesJob failed --- ${err}`)
  }
}

//runs every minute
export const job = CronJob.from({
  cronTime: '* * * * *',
  onTick: processActivities,
})

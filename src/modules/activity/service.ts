import { Transaction } from 'sequelize'
import { ProviderApiResponse, logger } from '../../common'
import { ActivityModel } from './model'
import { IActivity } from './types'
import { createActivitySchema } from './validation'
import {
  bulkSaveActivity,
  countActivities,
  getActivityWithLowestPrice,
} from './repository'
import {
  createToken,
  getExistingToken,
  updateToken,
} from '../tokens/repository'

export const saveActivities = async (
  data: ProviderApiResponse,
  transaction: Transaction,
) => {
  const activities = data.events.reduce((store, { order, event }) => {
    if (event.kind !== 'new-order') {
      return store
    }

    const activity = {
      contract_address: order.contract,
      token_index: order.criteria.data.token.tokenId,
      listing_price: order.price.amount.native,
      maker: order.maker,
      listing_from: new Date(order.validFrom * 1000),
      listing_to: order.validUntil ? new Date(order.validUntil * 1000) : null,
      event_timestamp: new Date(event.createdAt),
    }

    try {
      createActivitySchema.parse(activity)
      store.push(activity)
    } catch (err) {
      logger.warn(
        `validation failed for activity --- ${JSON.stringify({
          order,
          event,
        })}`,
      )
    }

    return store
  }, [] as Array<Omit<IActivity, 'id' | 'created_at'>>)

  await bulkSaveActivity(activities, transaction)

  return activities
}

export const handleActivityPostProcessing = async (
  activities: Array<Omit<IActivity, 'id' | 'created_at'>>,
  transaction: Transaction,
) => {
  const now = new Date()
  const promises = activities.map(async (activity) => {
    const [existingToken, listingCount, activityWithLowestPrice] =
      await Promise.all([
        getExistingToken({
          index: activity.token_index,
          contract_address: activity.contract_address,
        }),
        countActivities({
          token_index: activity.token_index,
          contract_address: activity.contract_address,
        }),
        getActivityWithLowestPrice({
          token_index: activity.token_index,
          contract_address: activity.contract_address,
        }),
      ])

    //pick lowest between current listing price and least existing listing price if any
    let price = activity.listing_price
    if (
      activityWithLowestPrice &&
      price > activityWithLowestPrice.listing_price
    ) {
      price = activityWithLowestPrice.listing_price
    }

    if (!existingToken) {
      //new listing not expired. creates regardless of listing count
      if (activity.listing_to !== null && activity.listing_to >= now) {
        activity.listing_to
        return createToken(
          {
            index: activity.token_index,
            contract_address: activity.contract_address,
            current_price: price,
          },
          transaction,
        )
      }

      //no other stored listings and new listing is expired
      if (listingCount === 0) {
        return createToken(
          {
            index: activity.token_index,
            contract_address: activity.contract_address,
            current_price: null,
          },
          transaction,
        )
      }

      //existing stored listings but new listing is expired
      return createToken(
        {
          index: activity.token_index,
          contract_address: activity.contract_address,
          current_price: price,
        },
        transaction,
      )
    }

    //since the token exists, a stored listing also exists so it is updated with the price regardless
    return updateToken(existingToken.id, { current_price: price }, transaction)
  })

  await Promise.all(promises)
}

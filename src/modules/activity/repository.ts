import { Transaction } from 'sequelize'
import { ActivityModel } from './model'
import { IActivity } from './types'

export const bulkSaveActivity = (
  activities: Omit<IActivity, 'id' | 'created_at'>[],
  t: Transaction,
) => {
  return ActivityModel.bulkCreate(activities, { transaction: t })
}

export const countActivities = async (
  query: Pick<IActivity, 'token_index' | 'contract_address'>,
) => {
  return ActivityModel.count({
    where: query,
  })
}

export const getActivityWithLowestPrice = async (
  query: Pick<IActivity, 'token_index' | 'contract_address'>,
): Promise<IActivity | null> => {
  const [res] = await ActivityModel.findAll({
    where: query,
    limit: 1,
    order: [['listing_price', 'ASC']],
  })

  return res
}

import { Transaction } from 'sequelize'
import { OffsetTokenModel } from './model'

export const createOffsetToken = async (value: string, t: Transaction) => {
  return OffsetTokenModel.create({ value }, { transaction: t })
}

export const getLatestOffsetToken = async () => {
  const [res] = await OffsetTokenModel.findAll({
    limit: 1,
    order: [['created_at', 'DESC']],
  })

  return res?.value || null
}

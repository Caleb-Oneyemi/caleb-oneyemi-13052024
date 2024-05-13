import { Transaction } from 'sequelize'
import { TokenModel } from './model'
import { IToken } from './types'

export const createToken = async (
  data: Pick<IToken, 'index' | 'contract_address' | 'current_price'>,
  t: Transaction,
) => {
  return TokenModel.create(data, { transaction: t })
}

export const getExistingToken = async (query: {
  index: string
  contract_address: string
}) => {
  return TokenModel.findOne({ where: query })
}

export const updateToken = async (
  id: string,
  data: Pick<IToken, 'current_price'>,
  t: Transaction,
) => {
  await TokenModel.update(
    { current_price: data.current_price },
    { where: { id }, transaction: t },
  )
}

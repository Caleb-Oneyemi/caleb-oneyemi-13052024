import Sequelize, {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { IToken } from './types'
import { dbConnection } from '../../db'

export interface TokenModel extends IToken {}

export class TokenModel extends Model<
  InferAttributes<TokenModel>,
  InferCreationAttributes<TokenModel>
> {
  declare id: CreationOptional<string>
  declare created_at: CreationOptional<string>
  declare updated_at: CreationOptional<string>
}

TokenModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    index: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    contract_address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    current_price: {
      allowNull: true,
      type: DataTypes.DOUBLE,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'tokens',
    sequelize: dbConnection,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: 'tokens_compound_index',
        fields: ['index', 'contract_address'],
      },
    ],
  },
)

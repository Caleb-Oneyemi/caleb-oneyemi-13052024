import Sequelize, {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { IOffsetToken } from './types'
import { dbConnection } from '../../db'

export interface OffsetTokenModel extends IOffsetToken {}

export class OffsetTokenModel extends Model<
  InferAttributes<OffsetTokenModel>,
  InferCreationAttributes<OffsetTokenModel>
> {
  declare id: CreationOptional<string>
  declare created_at: CreationOptional<string>
  declare updated_at: CreationOptional<string>
}

OffsetTokenModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    value: {
      allowNull: false,
      type: DataTypes.STRING,
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
    tableName: 'offset_tokens',
    sequelize: dbConnection,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
)

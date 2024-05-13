import Sequelize, {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { IActivity } from './types'
import { dbConnection } from '../../db'

export interface ActivityModel extends IActivity {}

export class ActivityModel extends Model<
  InferAttributes<ActivityModel>,
  InferCreationAttributes<ActivityModel>
> {
  declare id: CreationOptional<string>
  declare created_at: CreationOptional<string>
}

ActivityModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    contract_address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    token_index: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    listing_price: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    maker: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    listing_from: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    listing_to: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    event_timestamp: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'activity',
    sequelize: dbConnection,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
      {
        name: 'activity_compound_index',
        fields: ['token_index', 'contract_address'],
      },
    ],
  },
)

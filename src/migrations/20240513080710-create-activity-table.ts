import { DataTypes, QueryInterface } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    const attributes = {
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
    }

    return queryInterface.createTable('activity', attributes)
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return queryInterface.dropTable('activity')
  },
}

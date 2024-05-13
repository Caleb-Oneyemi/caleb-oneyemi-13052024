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
    }

    return queryInterface.createTable('tokens', attributes)
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return queryInterface.dropTable('tokens')
  },
}

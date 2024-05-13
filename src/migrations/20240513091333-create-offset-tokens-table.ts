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
    }

    return queryInterface.createTable('offset_tokens', attributes)
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return queryInterface.dropTable('offset_tokens')
  },
}

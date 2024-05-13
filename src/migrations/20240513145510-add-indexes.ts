import { DataTypes, QueryInterface } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex(
        'activity',
        ['token_index', 'contract_address'],
        {
          name: 'activity_compound_index',
          transaction,
        },
      )

      await queryInterface.addIndex('tokens', ['index', 'contract_address'], {
        name: 'tokens_compound_index',
        transaction,
      })
    })
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex('activity', 'activity_compound_index', {
        transaction,
      })
      await queryInterface.removeIndex('tokens', 'tokens_compound_index', {
        transaction,
      })
    })
  },
}

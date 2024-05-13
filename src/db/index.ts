import { Sequelize } from 'sequelize'
import { envConfig } from './config'

const connStr = process.env.DB_URL as string

const sequelize = new Sequelize(connStr, {
  ...envConfig,
  dialect: 'mysql',
  logging: false,
})

export { sequelize as dbConnection }

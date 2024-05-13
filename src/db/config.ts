import { Options } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const config: Record<string, Options> = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.db_port) : 3306,
    dialect: 'mysql',
    pool: {
      max: 45,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.db_port) : 3306,
    dialect: 'mysql',
    pool: {
      max: 45,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
}

const env = process.env.NODE_DEV as keyof typeof connectionConfig

export const connectionConfig = { ...config }
export const envConfig = connectionConfig[env]
module.exports = { ...config }
module.exports.connectionConfig = { ...config }

import Sequelize from 'sequelize'
import dotenv from 'dotenv'
import assert from 'assert'

dotenv.config()

const {
  SQL_SERVER_HOST,
  SQL_SERVER_PORT,
  SQL_SERVER_USER,
  SQL_SERVER_PD,
  SQL_SERVER_DBNAME,
  PORT,
  HOST
} = process.env

// Make sure all required environment variables are defined
assert(SQL_SERVER_HOST, 'SQL_SERVER_HOST is required')
assert(SQL_SERVER_PORT, 'SQL_SERVER_PORT is required')
assert(SQL_SERVER_USER, 'SQL_SERVER_USER is required')
assert(SQL_SERVER_PD, 'SQL_SERVER_PD is required')
assert(SQL_SERVER_DBNAME, 'SQL_SERVER_DBNAME is required')
assert(PORT, 'PORT is required')
assert(HOST, 'HOST is required')

const connectDB = new Sequelize(
  SQL_SERVER_DBNAME,
  SQL_SERVER_USER,
  SQL_SERVER_PD,
  {
    host: SQL_SERVER_HOST,
    port: SQL_SERVER_PORT,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
        enableArithAbort: true
      }
    }
  }
)

// Test the connection
connectDB
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.')
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error)
  })

// Export the Sequelize instance
export default connectDB

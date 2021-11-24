const { Sequelize } = require('sequelize');

const dbName = process.env.DB_NAME || 'auth-db'
const dbUser = process.env.DB_USER || 'postgres'
const dbPassword = process.env.DB_PASS || 'naimu'
const dbHost = process.env.DB || 'localhost'

module.exports = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres'
})




const { Sequelize } = require('sequelize');


const dbName = process.env.DB_NAME || 'auth'
const dbUser = process.env.DB_USER || 'postgres'
const dbPassword = process.env.DB_PASS || '1234'
const dbHost = process.env.DB || 'localhost'

module.exports = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres'
})




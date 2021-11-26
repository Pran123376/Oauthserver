const { Sequelize } = require('sequelize');


const dbName = process.env.DB_NAME || 'auth_db'
const dbUser = process.env.DB_USER || 'postgres'
const dbPassword = process.env.DB_PASS || 'vibhu@224'
const dbHost = process.env.DB || 'localhost'

module.exports = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres'
})




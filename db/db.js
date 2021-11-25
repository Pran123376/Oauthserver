const { Sequelize } = require('sequelize');

<<<<<<< HEAD
module.exports = new Sequelize('auth_db', 'postgres', 'vibhu@224', {
  host: 'localhost',
=======
const dbName = process.env.DB_NAME || 'auth-db'
const dbUser = process.env.DB_USER || 'postgres'
const dbPassword = process.env.DB_PASS || 'naimu'
const dbHost = process.env.DB || 'localhost'

module.exports = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
>>>>>>> 8a00f6d2f82ad56f7bba48ea10bafd7b93793f74
  dialect: 'postgres'
})




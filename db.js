const { Sequelize } = require('sequelize');

module.exports = new Sequelize('auth-db', 'postgres', 'naimu', {
  host: 'localhost',
  dialect: 'postgres'
})


const { Sequelize } = require('sequelize');

module.exports = new Sequelize('auth_db', 'postgres', 'vibhu@224', {
  host: 'localhost',
  dialect: 'postgres'
})


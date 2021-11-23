const Sequelize = require('sequelize')
const db = require('../db/db')

const User = db.define('user', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    code: {
        type: Sequelize.STRING
    }
})

module.exports = User
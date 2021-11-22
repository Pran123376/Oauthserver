const Sequelize = require('sequelize')

const db = require('../db')

const Gig = db.define('gig', {

    title: {
        type: Sequelize.STRING
    }
})

module.exports = Gig
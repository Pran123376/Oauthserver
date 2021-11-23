const Sequelize = require('sequelize')

const db = require('../db/db')

const Client = db.define('client' , {
   
    client_id : {
        type : Sequelize.STRING
    },
    app_name : {
        type : Sequelize.STRING
    },
    client_secret : {
        type : Sequelize.STRING
    },
    redirect_uri : {
        type : Sequelize.STRING
    }
})

module.exports = Client
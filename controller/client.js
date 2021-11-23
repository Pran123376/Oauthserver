const User = require('../models/User')
const Client = require('../models/Client')
const common = require('../common/common')

module.exports = {

    cred: (req, res) => {
        const client_id = common.generateClientId()
        const client_secret = common.generateClientSecret()
        const redirect_uri = req.body.redirectUri
        const app_name = req.body.appName

        return res.send({
            code: 200,
            message: 'OK',
            data: {
                app_name, client_id, client_secret, redirect_uri
            }
        })
    },
    getCred: (req, res) => {
        const client_id = common.generateClientId()
        const client_secret = common.generateClientSecret()
        const redirect_uri = 'http://localhost:3000'
        const app_name = 'appName'

        return res.send({
            code: 200,
            message: 'OK',
            data: {
                app_name, client_id, client_secret, redirect_uri
            }
        })
    },
    secure: (req, res) => {
        if (req.token) {
            res.send({
                code: 200,
                message: 'OK'
            })
        } else {
            res.send({
                code: 403,
                message: 'Unauthorized'
            })
        }
    },
    profile: (req, res) => {
        if (true) {
            res.send({
                code: 200,
                message: 'OK',
                data: {
                    userName: 'user1'
                }
            })
        } else {
            res.send({
                code: 403,
                message: 'Unauthorized'
            })
        }
    },
    clients: (req, res) => {

        Client.findAll({})
            .then(result => {
                res.send({
                    code: 200,
                    data: result
                })
            })
            .catch(err => {
                res.send({
                    code: 500,
                    message: err
                })
            })
    },
    users: (req, res) => {

        User.findAll({})
            .then(result => {
                res.send({
                    code: 200,
                    data: result
                })
            })
            .catch(err => {
                res.send({
                    code: 500,
                    message: err
                })
            })
    }
}
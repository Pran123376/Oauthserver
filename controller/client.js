const common = require('../common/common')
const gig = require('../models/Gig')
const user = require('../models/User')
const client = require('../models/Client')
const jwt = require('jsonwebtoken')

module.exports = {
  
    clientId: (req, res) => {
        const id = common.generateClientId()
        res.send({
            code: 200, message: 'Success.', data: {
                client_id: id,
                client_secret: id
            }
        })
    },
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
    code: (req, res) => {
        const token = req.headers.authorization
        if (!token) {
            return res.send({
                code: 403,
                message: 'Unauthorized'
            })
        } else {
            const clientId = req.query.client_id
            const state = req.query.state
            const redirectUri = req.query.redirect_uri
            const code = common.generateCode()
            //save in db
            return res.send({
                code: 200,
                message: 'OK',
                data: {
                    url: `${redirectUri}/auth?code=${code}&state=${state}`
                }
            })
            //   return  res.redirect(`${redirectUri}/auth?code=${code}&state=${state}`)
        }

    },
    token: (req, res) => {
        const code = req.query.code

        // check in db 
        if (code) {
            // remove code from db
            const token = jwt.sign({ code }, 'SECRET', { expiresIn: '1h' })
            // save token in db
            return res.send({
                code: 200,
                message: 'Token Success',
                data: {
                    access_token: token,
                    token_type: 'bearer',
                    uid: 'uid',
                    account_id: "acid"
                }
            })
        } else {
            res.send({ code: 403, message: 'Unauthorized' });
        }
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
    refreshToken: (req, res) => {
        res.send({
            code: 200, message: "Refresh Token success.", data: {
                refreshToken: common.generateRefreshToken()
            }
        })
    },
    gigs: (req, res) => {

        gig.findAll({})
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
    clients: (req, res) => {

        client.findAll({})
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

        user.findAll({})
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
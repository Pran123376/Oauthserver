const common = require('../common/index')
const gig = require('../models/Gig')
const user = require('../models/User')
const client = require('../models/Client')
const jwt = require('jsonwebtoken')

module.exports = {
    signin: (req, res) => {
        const userName = req.body.userName
        const password = req.body.password
        console.log(req.body)
        if (userName === "user1" && password == 1234) {
            return res.send({
                code: 200,
                message: 'Login Success',
                data: {
                    token: jwt.sign({ userName, password }, 'SECRET', { expiresIn: '1h' })
                }
            })
        } else {
            return res.send({
                code: 404,
                message: 'User not found'
            })
        }
    },
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
        const clientId = req.query.client_id
        const redirectUri = req.query.redirect_uri || "http://localhost:3000"
        const code = common.generateCode()
        //save in db
        res.redirect(`${redirectUri}/auth?code=${code}`)
    },
    token: (req, res) => {
        const code = req.query.code

        // check in db 
        if (true) {
            // remove code from db
            const token = common.generateToken()
            // save token in db
            res.send({
                code: 200, message: 'Token Success', data: {
                    access_token: token,
                    token_type: 'bearer',
                    uid: 'uid',
                    account_id: "acid"
                }
            })
        } else {
            res.send({ code: 400, message: 'Invalid auth token' });
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
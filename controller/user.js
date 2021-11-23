const user = require('../models/User')
const jwt = require('jsonwebtoken')
const common = require('../common/common')
const client = require('../models/Client')

module.exports = {
    signup: async (req, res) => {
        const userName = req.body.userName
        const password = req.body.password
        try {
            const userNameExists = await user.findOne({ where: { email: userName } })
            if (userNameExists) {
                return res.send({
                    code: 404,
                    message: 'User Already Exists.',
                })
            }

            const newUser = user.build({ id: common.generateCode(), email: userName, password })
            const result = newUser.save()
            if (result) {
                return res.send({
                    code: 200,
                    message: 'User Signup Success.',
                    data: result
                })
            }
        } catch (err) {
            return res.send({
                code: 500,
                message: 'Internal Server Error.'
            })
        }
    },
    signin: async (req, res) => {
        const userName = req.body.userName
        const password = req.body.password

        const userNameExists = await user.findOne({ where: { email: userName } })
        console.log(userNameExists)
        if (userNameExists && userNameExists.password === password) {
            return res.send({
                code: 200,
                message: 'Login Success',
                data: {
                    token: jwt.sign({ userName, password }, 'SECRET', { expiresIn: '10s' })
                }
            })
        } else {
            return res.send({
                code: 404,
                message: 'User not found'
            })
        }
    },
    code: async (req, res) => {
        const token = req.headers.authorization
        const clientId = req.query.client_id
        const state = req.query.state
        const redirectUri = req.query.redirect_uri
        const code = common.generateCode()

        if (!token) {
            return res.send({
                code: 403,
                message: 'Unauthorized'
            })
        }

        const clientIdExists = await client.findOne({ where: { client_id: clientId } })
        console.log(clientIdExists)
        if (!clientIdExists) {
            return res.send({
                code: 404,
                message: 'Client not found.'
            })
        }
        if (clientIdExists.redirect_uri !== redirectUri) {
            return res.send({
                code: 400,
                message: 'Redirect uri mismatch.'
            })
        }
        if (clientIdExists) {
            //save code in db

            return res.send({
                code: 200,
                message: 'OK',
                data: {
                    url: `${redirectUri}/auth?code=${code}&state=${state}`
                }
            })
        }
        //   return  res.redirect(`${redirectUri}/auth?code=${code}&state=${state}`)
    },
}
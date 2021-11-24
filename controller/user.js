const User = require('../models/User')
const Client = require('../models/Client')
const jwt = require('jsonwebtoken')
const common = require('../common/common')

module.exports = {
    signup: async (req, res) => {
        try {
            const userName = req.body.userName
            const password = req.body.password
            // Check in user is in db
            const userNameExists = await User.findOne({ where: { email: userName } })
            if (userNameExists) {
                return res.send({
                    code: 404,
                    message: 'User Already Exists.',
                })
            }
            // Save the user in db
            const newUser = User.build({ id: common.generateCode(), code: '', email: userName, password })
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
        try {
            const userName = req.body.userName
            const password = req.body.password

            const userNameExists = await User.findOne({ where: { email: userName } })
            if (userNameExists && userNameExists.password === password) {
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
        } catch (err) {
            return res.send({
                code: 500,
                message: 'Token Expired.'
            })
        }
    },
    code: async (req, res) => {
        const token = req.headers.authorization
        const clientId = req.query.client_id
        const state = req.query.state
        const redirectUri = req.query.redirect_uri
        const code = common.generateCode()
        try {
            if (!token) {
                return res.send({
                    code: 403,
                    message: 'Unauthorized'
                })
            }
            const clientIdExists = await Client.findOne({ where: { client_id: clientId } })
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
                const decodedUser = jwt.verify(token, 'SECRET')
                const userExists = await User.update({ code: code }, { where: { email: decodedUser.userName } })
                console.log(userExists)
                if (userExists) {
                    return res.send({
                        code: 200,
                        message: 'OK',
                        data: {
                            url: `${redirectUri}/auth?code=${code}&state=${state}`
                        }
                    })
                }
            }
        } catch (err) {
            return res.send({
                code: 500,
                message: 'Internal Server Error.'
            })
        }

        //   return  res.redirect(`${redirectUri}/auth?code=${code}&state=${state}`)
    },
    token: async (req, res) => {
        const code = req.query.code
        try {
            if (!code) {
                return res.send({
                    code: 400,
                    message: 'Bad request.'
                })
            }
            // check in db 
            const userExists = await User.findOne({ where: { code: code } })
            if (!userExists) {
                res.send({ code: 403, message: 'Unauthorized' });
            }
            if (userExists) {
                //remove the code
                const updatedUser = await User.update({ code: "" }, { where: { email: userExists.email } })
                const token = jwt.sign({ userName: userExists.email, password: userExists.password }, 'SECRET', { expiresIn: '1h' })
                return res.send({
                    code: 200,
                    message: 'Token Success.',
                    data: {
                        access_token: token,
                        token_type: 'bearer',
                        uid: userExists.email || 'uid',
                        account_id: userExists.id || 'account_id'
                    }
                })
            }
        } catch (err) {
            return res.send({
                code: 500,
                message: 'Internal Server Error.'
            })
        }
    },
    refreshToken: async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) {
                return res.send({
                    code: 403,
                    message: 'Unauthorized'
                })
            }
            const decodedUser = jwt.verify(token, 'SECRET')
            const userExists = await User.findOne({ where: { email: decodedUser.userName } })
            if (!userExists || userExists.password !== decodedUser.password) {
                return res.send({
                    code: 403,
                    message: 'Unauthorized.'
                })
            }
            if (userExists && userExists.password === decodedUser.password) {
                const token = jwt.sign({ userName: userExists.email, password: userExists.password }, 'SECRET', { expiresIn: '10h' })
                return res.send({
                    code: 200,
                    message: "Refresh Token success.",
                    data: {
                        refreshToken: token
                    }
                })
            }
        } catch (err) {
            return res.send({
                code: 500,
                message: 'Internal Server Error.'
            })
        }

    },
}
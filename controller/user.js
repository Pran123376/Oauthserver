const user = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
    signup: async(req, res) => {
        const userName = req.body.userName
        const password = req.body.password
      
        const userNameExists = await user.findOne({where : {  email : userName  }})
        if (userNameExists) {
            return res.send({
                code: 404,
                message: 'User Already Exists.',
            })
        } else {
            const newUser = user.build({email : userName , password })
            newUser.save()
            .then(result=>{
                return res.send({
                    code: 200,
                    message: 'User Signup Success.',
                    data: result
                })
            })
            .catch(err=>{
                return res.send({
                    code : 500,
                    message : 'Internal Server Error.'
                })
            })

          
        }
    },
    signin: async(req, res) => {
        const userName = req.body.userName
        const password = req.body.password
      
        const userNameExists = await user.findOne({where : {  email : userName  }})
        if (userNameExists && password == 1234) {
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
}
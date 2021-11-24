var express = require('express')
var router = express.Router()

// User Routes
router.post('/user-server-login', require('../controller/user').signin)
router.post('/user-server-signup', require('../controller/user').signup)

// User Oauth Related Routes
router.get('/oauth/code', require('../controller/user').code)
router.get('/oauth/token', require('../controller/user').token)
router.get('/oauth/refresh-token', require('../controller/user').refreshToken)

// secured Endpoints 
router.get('/oauth/secure' , require('../controller/client').secure)
router.get('/oauth/profile' , require('../controller/client').profile)

// client app routes
router.post('/create-cred', require('../controller/client').createCred)
router.get('/get-cred', require('../controller/client').getCred)

// List of all users and clients
router.get('/clients' , require('../controller/client').clients)
router.get('/users' , require('../controller/client').users)

module.exports = router
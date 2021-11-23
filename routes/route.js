var express = require('express')
var router = express.Router()

router.post('/user-server-login', require('../controller/user').signin)
router.post('/user-server-signup', require('../controller/user').signup)

router.get('/oauth/code', require('../controller/user').code)

router.get('/client-id', require('../controller/client').clientId)
router.post('/create-cred', require('../controller/client').cred)
router.get('/get-cred', require('../controller/client').getCred)

router.get('/oauth/token', require('../controller/client').token)
router.get('/oauth/refresh-token', require('../controller/client').refreshToken)
router.get('/oauth/secure' , require('../controller/client').secure)
router.get('/oauth/profile' , require('../controller/client').profile)

router.get('/gigs' , require('../controller/client').gigs)
router.get('/clients' , require('../controller/client').clients)
router.get('/users' , require('../controller/client').users)

module.exports = router
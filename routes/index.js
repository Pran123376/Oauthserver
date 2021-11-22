var express = require('express')
var router = express.Router()

router.post('/user-server-login', require('../controller/index').signin)
router.get('/client-id', require('../controller/index').clientId)
router.post('/create-cred', require('../controller/index').cred)
router.get('/get-cred', require('../controller/index').getCred)

router.get('/oauth/authorize', require('../controller/index').code)
router.get('/oauth/token', require('../controller/index').token)
router.get('/oauth/refresh-token', require('../controller/index').refreshToken)
router.get('/oauth/secure' , require('../controller/index').secure)
router.get('/oauth/profile' , require('../controller/index').profile)

router.get('/gigs' , require('../controller/index').gigs)
router.get('/clients' , require('../controller/index').clients)
router.get('/users' , require('../controller/index').users)

module.exports = router
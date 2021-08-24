const router = require('express').Router()
const Controller = require('../controllers/authController.js')
const { authentication } = require('../middlewares/auth.js')

router.post('/register', Controller.registerUser)
router.post('/login', Controller.loginUser)
router.post('/auth/google', Controller.googleLogin)
router.get('/user', authentication, Controller.getLoggedInUserInfo)

module.exports = router
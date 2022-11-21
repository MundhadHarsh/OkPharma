const express = require ('express')
const router =express.Router()

const userDao = require('../Model/UserModel')

router.post('/add',userDao.SaveSignUp)

router.post('/find',userDao.SignIn)

router.get('/logout',userDao.logout)


module.exports = router
const express = require("express")
const router = express.Router()

const otp=require('../Model/OTP_Dao')

router.get('/login',otp.sending)


router.get('/verify',otp.check)


module.exports = router 
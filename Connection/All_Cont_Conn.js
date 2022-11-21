const express = require('express');
const app = express();

const Pro_Mas = require('../Controller/Product_Master_Controller')
const Sign = require('../Controller/UserController')
const OTP = require('../Controller/OTP_Controller')

app.use('/',Pro_Mas)
app.use('/',Sign)
app.use('/',OTP)


module.exports=app
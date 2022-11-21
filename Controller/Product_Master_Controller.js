const express = require("express")
const router = express.Router()

const A017=require('../Model/Product_Master_Dao/A0172003')

router.post('/A_save',A017.addA017)

router.get('/A_list',A017.listA017)

router.get('/A_find/:id',A017.findA017byid)

router.get('/A_searchuser/:id/:key',A017.choicewaise)

router.delete('/A_delete/:id',A017.deleteA017byid)

router.patch('/A_update/:id',A017.updateA017byid)



module.exports = router 
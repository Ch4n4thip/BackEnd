const express = require('express')
const router = express.Router()
const controller = require('../controllers/Customer.controller')

router.post('/ToHistory', controller.ToHistory)

router.post('/Payment', controller.Payment)

router.get('/Method', controller.Method)

router.post('/delCompare', controller.delCompare)

router.get('/getCompare', controller.getCompare)

router.post('/login', controller.login)

router.get('/getOrder', controller.getOrder)

router.get('/getCompleteOrder', controller.getCompleteOrder)

router.get('/getReturnOrder', controller.getReturnOrder)

router.post('/PackingComplete', controller.PackingComplete)

router.post('/addUser', controller.addUser)

router.get('/getUser', controller.getUser)

router.post('/addAddress', controller.addAddress)

router.post('/Register', controller.Register)

router.post('/Remember', controller.Remember)

module.exports = router;
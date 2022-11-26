const express = require('express')
const router = express.Router()
const controller = require('../controllers/Customer.controller')

router.post('/ToHistory', controller.ToHistory)

router.post('/Payment', controller.ToHistory)

router.get('/Method', controller.Method)

router.get('/delCompare', controller.delCompare)
router.get('/getCompare', controller.getCompare)

module.exports = router;
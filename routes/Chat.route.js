const express = require('express')
const router = express.Router()
const controller = require('../controllers/Chat.controller')

router.get('/getChatBody', controller.getChatBody)

router.get('/getChatName', controller.getChatName)

router.get('/getChatHistory', controller.getChatHistory)

router.post('/ToChat', controller.ToChat)

router.post('/sendChat', controller.sendChat)

module.exports = router;
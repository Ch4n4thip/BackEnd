const express = require('express')
const router = express.Router()
const controller = require('../controllers/Compare.controller')



router.post('/CameraToCompare', controller.CameraToCompare)




module.exports = router;
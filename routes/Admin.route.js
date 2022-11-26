const express = require('express')
const router = express.Router()
const controller = require('../controllers/Admin.controller')

router.get('/getReport', controller.getReport)

router.get('/getReportComplete', controller.getReportComplete)

router.post('/ApproveReturn', controller.ApproveReturn)

router.post('/DisapproveReturn', controller.DisapproveReturn)

router.post('/ApproveReport', controller.ApproveReport)

router.post('/DisapproveReport', controller.DisapproveReport)

router.post('/Unbanned', controller.Unbanned)

router.get('/getKYCCheck', controller.getKYCCheck)

router.post('/addKYCCheck', controller.addKYCCheck)

router.post('/KYCCheckDis', controller.KYCCheckDis)



module.exports = router;
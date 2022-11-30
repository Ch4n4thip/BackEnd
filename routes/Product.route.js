const express = require('express')
const router = express.Router()
const controller = require('../controllers/Product.controller')

router.get('/getToCart', controller.getToCart)

router.get('/getCart', controller.getCart)

router.post('/addToCart', controller.addToCart)

router.get('/ReviewCal', controller.ReviewCal)

router.get('/getComment', controller.getComment)

router.get('/getDetails', controller.getDetails)

router.get('/getReviewShop', controller.getReviewShop)

router.post('/addToCompare', controller.addToCompare)

router.get('/useCoupon', controller.useCoupon)

router.post('/CouponAdmin', controller.CouponAdmin)

router.get('/getCouponAdmin', controller.getCouponAdmin)

router.post('/addReview', controller.addReview)

router.post('/addReturn', controller.addReturn)

router.get('/getHistory', controller.getHistory)

router.get('/getReturnHistory', controller.getReturnHistory)

router.post('/received', controller.received)

router.post('/PackingReturnComplete', controller.PackingReturnComplete)

router.get('/getCompleteHistory', controller.getCompleteHistory)

router.get('/allProduct', controller.allProduct)

router.post('/Search', controller.Search)

router.get('/FilterProduct', controller.FilterProduct)

router.get('/FilterPrice', controller.FilterPrice)

router.post('/deleteCart', controller.deleteCart)

module.exports = router;
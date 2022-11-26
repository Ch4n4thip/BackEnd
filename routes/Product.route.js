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

router.post('/useCoupon', controller.useCoupon)

router.post('/CouponAdmin', controller.CouponAdmin)

router.get('/getCouponAdmin', controller.getCouponAdmin)

router.post('/addReview', controller.addReview)

router.post('/addReturn', controller.addReturn)

module.exports = router;
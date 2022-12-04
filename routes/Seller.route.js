const express = require('express')
const router = express.Router()
const controller = require('../controllers/Seller.controller')

//get product 
router.get('/getProduct', controller.getProductClick)
//add product

//get Kyc Seller
router.get('/getKyc', controller.getKycClick)
//Post Kyc Seller
router.post('/addKyc', controller.addKycClick)
//get allProduct
router.get('/getAllProduct', controller.getAllProduct)
//get UserSeller
router.get('/getUserSeller', controller.getUserSeller)
//add UserSeller
router.post('/addUserSeller', controller.addUserSeller)
//get all KYCSeller
router.get('/getAllKyc', controller.getAllKyc)
//Update Seller Setting
router.post('/updateSellerSetting', controller.updateSellerSetting)
//Update EditProduct
router.post('/EditProduct', controller.EditProduct)
//Update DeleteProduct
router.post('/DeleteProduct', controller.DeleteProduct)
//get Product
router.get('/getProductSeller', controller.getProductSeller)
//add Product
router.post('/addProductSeller', controller.addProductSeller)
//ToReport
router.post('/ToReport', controller.ToReport)
//get Coupon Seller in view Shop
router.get('/getCouponSeller', controller.getCouponSeller)
//add Coupon Seller in Profile
router.post('/addCouponSeller', controller.addCouponSeller)






module.exports = router;
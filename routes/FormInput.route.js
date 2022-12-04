const express = require('express')
const router = express.Router()
const controller = require('../controllers/FormInput.controller')


// Bag watch shoes
router.post('/addProduct', controller.addProductClick)

router.post('/addCamera', controller.addCamera)

router.post('/addSport', controller.addSport)

router.post('/addToys', controller.addToys)

router.post('/addBeautyPetStationery', controller.addBeautyPetStationery)

router.post('/addComputer', controller.addComputer)

router.post('/addGame', controller.addGame)

router.post('/addController', controller.addController)

router.post('/addClothes', controller.addClothes)




module.exports = router;
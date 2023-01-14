const express = require('express')
const router = express.Router()
const controller = require('../controllers/FormInput.controller')


// Bag watch shoes
router.post('/addBag', controller.addBagClick)

router.post('/addWatch', controller.addWatchClick)

router.post('/addShoes', controller.addShoesClick)

router.post('/addCamera', controller.addCamera)

router.post('/addSport', controller.addSport)

router.post('/addToys', controller.addToys)

router.post('/addBeauty', controller.addBeauty)

router.post('/addPet', controller.addPet)

router.post('/addStationery', controller.addStationery)

router.post('/addComputer', controller.addComputer)

router.post('/addGame', controller.addGame)

router.post('/addController', controller.addController)

router.post('/addClothes', controller.addClothes)




module.exports = router;
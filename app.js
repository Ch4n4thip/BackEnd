const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const mongoUtil = require('./config/database')
const Seller = require('./routes/Seller.route')
const productCart = require('./routes/Product.route')
const Customer = require('./routes/Customer.route')
const Admin = require('./routes/Admin.route')
const Chat = require('./routes/Chat.route')
const Input = require('./routes/FormInput.route')
const compare = require('./routes/Compare.route')

const corsOptions = {
    origin: '*',
    Credential: true
}
app.use(express.json())
app.use(cors(corsOptions))
//test
// app.use(express.static('public'))
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Server is running"
    })
})

app.use('/Seller', Seller)
app.use('/Product', productCart)
app.use('/Customer', Customer)
app.use('/Admin', Admin)
app.use('/Chat', Chat)
app.use('/FormInput', Input)
app.use('/Compare', compare)
module.exports = app;
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const customerSchema = new mongoose.Schema ({
    name: String,
    age: Number
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer

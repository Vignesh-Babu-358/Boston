const mongoose = require('mongoose');


const order_details = mongoose.Schema({
    Reciept_number: {
        type: Number,
        required: true
    },
    Order_date: {
        type: Date,
        required: true
    },
    Shipping_address: {
        type: [String],
        required: true
    },
    Order_value: {
        type: Number,
    },
    Shipping_cost: {
        type: Number
    },
    Tax_amount: {
        type: Number
    },
    Gift_message: {
        type: String
    },
    Quantity: {
        type: Number
    },
    Image_link: {
        type: String,
    },
    Store_ID: {
        type: Number,
        required: true
    }

});


module.exports = mongoose.model('orders', order_details);
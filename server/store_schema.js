const mongoose = require('mongoose');
const store_name = mongoose.Schema({
    Shop_name: {
        type: String,
        required: true
    },
    Shop_ID: {
        type: Number,
        required: true
    },
    Total_shop: {
        type: Number,
        required: true
    }

});
module.exports = mongoose.model('Store', store_name)
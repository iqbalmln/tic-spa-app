const mongoose = require('mongoose')

const ProductShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    image_url: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('products', ProductShema)
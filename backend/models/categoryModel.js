const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please input the category']
    },

})

module.exports = mongoose.model('Category', categorySchema)
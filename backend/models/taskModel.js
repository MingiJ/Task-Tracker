const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    title: {
        type: String,
        required: [true, 'Please input title']
    },
    message: {
        type: String,
    }
},{
    timestamps: true
})


module.exports = mongoose.model('Task',taskSchema)
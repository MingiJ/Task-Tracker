const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MONGO is connected at ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB
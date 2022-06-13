//import required modules
require('dotenv').config()
const express = require("express");
const colors = require('colors')
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const protect = require('./middleware/authMiddleware')

//instantiate http server
const app = express();
//set port
const port = process.env.PORT || 5000;

//initialize mongoDB connection
connectDB()

//assign relevant middleware

//middleware to process user input
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//middleware to use routes
app.use('/api/tasks',require('./routes/taskRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/categories', require('./routes/categoryRoutes'))

//middleware to handle errors
app.use(errorHandler)




app.listen(port, () => console.log(`Server is running on port ${port}`));

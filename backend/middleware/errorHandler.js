const errorHandler = (err, req, res, next) =>{
    //check whether status code has been set and assign it
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    //return the error

    res.json({
        message: err.message,
        stack: process.env.ENVIRONMENT === 'development' ? err.stack : null
    })
}

module.exports = errorHandler
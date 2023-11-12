const { CustomAPIError } = require('./../errors/errors');


const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({
            message: err.message,
            error: err
        });
    }
    return res.status(500).json({ 
        message: err.message || "Something went wrong!",
        error: err
    });
}

module.exports = errorHandler;
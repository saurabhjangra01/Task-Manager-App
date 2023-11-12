class CustomAPIError extends Error{
    constructor(message, statusCode){
        super(message) // invokes the constructor of the parent class
        this.statusCode = statusCode
    }
}


const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

module.exports = { createCustomError, CustomAPIError };
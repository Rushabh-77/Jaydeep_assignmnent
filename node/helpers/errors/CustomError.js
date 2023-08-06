const ResponseCodes = require("./ResponseCodes")

class CustomError extends Error {

  constructor(statusCode = 500, message, redirectTo = undefined) {
    super();
    // assign the error class name in your custom error
    this.name = this.constructor.name

    if (!message) message = ResponseCodes.RESPONSE_CODES[statusCode].message || 'Something went wrong please try again'
    this.message = message
    this.code = statusCode // @info: error code for responding to client
    this.redirectTo = redirectTo // @info: if we want to redirect on some page when we get error
  }
}

module.exports = CustomError

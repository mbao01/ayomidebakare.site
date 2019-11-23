/**
 * I couldn't get the Class format to retain instanceOf context when rethrown 🙈
 * @param       {[type]} status     [description]
 * @param       {[type]} errors     [description]
 * @param       {[type]} message    [description]
 * @param       {[type]} fileName   [description]
 * @param       {[type]} lineNumber [description]
 * @constructor
 */
function CustomError(status, errors, message = '') {
  const instance = new Error(message || '') // eslint-disable-line

  if (!instance.message) {
    instance.message = Array.isArray(errors) ? errors[0] : errors
  }

  instance.status = status
  instance.errors = Array.isArray(errors) ? errors : [errors]

  Object.setPrototypeOf(instance, Object.getPrototypeOf(this || Error))
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, CustomError)
  }

  return instance
}

CustomError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true,
  },
})

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(CustomError, Error)
} else {
  CustomError.__proto__ = Error // eslint-disable-line
}

export { CustomError }

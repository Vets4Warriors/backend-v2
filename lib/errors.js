/**
 * Created by austin on 5/3/17.
 */

const HttpStatus = require('http-status-codes');
const { logger } = require('./utils/loggers');

function errorHandler(err, req, res, next) {
  const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
  const explicitDescription = err.description || err.message || 'Unknown Error';
  let description;
  switch (status) {
    case HttpStatus.NOT_FOUND:
      description = 'Not found!';
      break;
    case HttpStatus.BAD_REQUEST:
      description = 'Bad Request!';
      break;
    case HttpStatus.FORBIDDEN:
      description = 'Not authenticated!';
      break;
    default:
      description = 'Server Error :/';
  }

  logger.error(`ERROR CODE ${status}: ${explicitDescription}`);

  // Pass less descriptive error along in the locals
  res.locals.errorCode = status;
  res.locals.errorDescription = description;
  next();
}

function devErrorHandler(err, req, res, next) {
  const description = err.description || err.message || 'Unknown Error';
  const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
  logger.error(`ERROR CODE ${status}: ${description}`);

  // Pass error along
  res.locals.errorCode = status; // eslint-disable-line
  res.locals.errorDescription = description; // eslint-disable-line
  next();
}

function errorReporter(req, res) {
  // if coming from the above error handler, error code will be set in locals
  // Otherwise it's a not found error
  const errorCode = res.locals.errorCode || HttpStatus.NOT_FOUND;
  const errorDescription = res.locals.errorDescription || 'Not Found!';
  res.status(errorCode);

  // respond with json
  if (req.accepts('json')) {
    res.json({ errorDescription });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send(errorDescription);
}

module.exports = { errorReporter, devErrorHandler, errorHandler };

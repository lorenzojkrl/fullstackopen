const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method_:', request.method)
  logger.info('Path:_', request.path)
  logger.info('Body:_', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint_' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id_' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token_' })
  }

  logger.error(error.message)
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}
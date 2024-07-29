const jwt = require("jsonwebtoken")
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unKnownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
        return response.status(400).json({ error: 'expected `username` to be unique'})
    } else if (error.name === 'JsonWebTokenError'){
        return response.status(401).json({error:'token invalid'})
    } else if (error.name === 'TokenExpiredError'){
        return response.status(401).json({
            error: 'token expired'
        })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization =  request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
   token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
   const { id: userId } = decodedToken
   request.userId = userId
  next()

}


module.exports = {
    requestLogger,
    unKnownEndpoint,
    errorHandler,
    tokenExtractor
}


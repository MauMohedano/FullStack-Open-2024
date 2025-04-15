const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const mongoose = require('mongoose')

const {MONGODB_URI, TEST_MONGODB_URI, NODE_ENV} = process.env

const PORT =  process.env.PORT || 3003
const connectionString = NODE_ENV === 'test' 
  ? TEST_MONGODB_URI
  : MONGODB_URI

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })

  
//SUfZMSuyrpX69H4k
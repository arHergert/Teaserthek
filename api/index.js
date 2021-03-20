import config from './config'
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
// Create express instance
const server = express()

// Require API routes
const movies = require('./routes/movies')

// Mongoose connection function with retry
function connectWithRetry() {
  mongoose
    .connect(config.mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Cloud Cluster connected'))
    .catch(err => {
      console.log(err)
      console.error(
        'Failed to connect to MongoDB Cloud Cluster - retry in 2 seconds'
      )
      setTimeout(connectWithRetry, 2000)
    })
}

// Connect to MondoDB web server
connectWithRetry()

// Middlewares

// Logs REST API requests to console
server.use(logger('dev'))

// Bodyparser Middleware
server.use(express.json())

// Import API Routes
server.use(movies)

// Export express server
module.exports = server

import config from './config'
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
// Create express instance
const server = express()

// Require API routes
const movies = require('./routes/movies')

// Connect to MondoDB web server
mongoose
  .connect(config.mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Cloud Cluster connected'))
  .catch(err => console.log(err))

// Middlewares
// Bodyparser Middleware
server.use(bodyParser.json())
// Import API Routes
server.use(movies)

// Export express server
module.exports = server

const mongoose = require('mongoose')

// Create Schema for a Movie
const MovieSchema = new mongoose.Schema({
  ObjectId: mongoose.Schema.ObjectId,
  name: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    default: null
  },
  genre: {
    type: [String],
    default: []
  },
  language: {
    type: String,
    default: 'english'
  },
  spoilerTimeStamp: {
    type: Number,
    default: -1
  },
  streamingPlatforms: {
    type: [String],
    default: []
  },
  ratingPlatforms: {
    type: [String],
    default: []
  }
})

module.exports = mongoose.model('movie', MovieSchema)

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
    default: new Date(2999, 0, 1)
  },
  tmdb_id: {
    type: Number,
    default: 0
  },
  genres: {
    type: [String],
    default: []
  },
  language: {
    type: String,
    default: 'Englisch'
  },
  spoilerTimeStamp: {
    type: Number,
    default: -1
  }
})

module.exports = mongoose.model('movie', MovieSchema)

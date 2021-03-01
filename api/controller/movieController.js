const Movie = require('../models/movie')

exports.addmovie = (req, res) => {
  const newMovie = new Movie({
    name: req.body.name,
    videoUrl: req.body.videoUrl,
    releaseDate:
      req.body.releaseDate !== undefined
        ? new Date(req.body.releaseDate)
        : undefined,
    genres: req.body.genres,
    language: req.body.language,
    tmdb_id: req.body.tmdb_id,
    spoilerTimeStamp: req.body.spoilerTimeStamp,
    streamingPlatforms: req.body.streamingPlatforms,
    ratingPlatforms: req.body.ratingPlatforms
  })
  newMovie
    .save()
    .then(movie => res.status(201).send('Movie added'))
    .catch(e => console.error(e))
}

exports.getmovies = (req, res) => {
  Movie.find()
    .then(movies => res.status(200).send(movies))
    .catch(e => console.error(e))
}

exports.deletemovies = (req, res) => {
  Movie.deleteMany({})
    .then(response => res.status(200).send('All movie entries deleted'))
    .catch(e => console.error(e))
}

exports.getfilteredmovies = (req, res) => {
  Movie.find()
    .then(movies => res.status(200).send(movies))
    .catch(e => console.error(e))
}

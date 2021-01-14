const Movie = require('../models/movie')

exports.add_movie = (req, res) => {
  const newMovie = new Movie({
    name: req.params.name
  })
  console.log('---- Add new Movie')
  newMovie.save().then(warehouse => res.send(201, 'Movie added'))
}

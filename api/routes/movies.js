const express = require('express')
const router = express.Router()

const movieController = require('../controller/movieController')

/* POST add movie */
router.post('/add_movie/', movieController.add_movie)

module.exports = router

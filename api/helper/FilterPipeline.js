class FilterPipeline {
  constructor(unfilteredMovies, limit, filters) {
    this.limit = limit
    this.filters = filters
    this.filteredMovies = unfilteredMovies
  }

  getFilteredMovies() {
    this.filterByGenres()
    this.filterByDate()
    this.filterByStreamingPlatforms()
    this.filterBySpoiler()
    this.shuffleAndLimit()
    return this.filteredMovies
    /* pipe.filterByGenres(movies, filters.genres)
    pipe.filterByDate(movies, filters.releaseDates)
    pipe.filterByStreamingPlatforms(movies, filters.streamingPlatforms)
    pipe.filterByRatingPlatforms(movies, filters.ratingPlatforms)
    pipe.filterBySpoiler(movies, filters.blockSpoilers)
    // Then shuffle placement in Array
    movies = pipe.shuffleAndLimit(movies, limit) */
  }

  filterByGenres() {
    if (this.filters.genres.length > 0) {
      // Check if any genres in movie match with at least one in filter
      this.filteredMovies = this.filteredMovies.filter(movie => {
        return movie.genres.some(movieGenre => {
          return this.filters.genres.includes(movieGenre)
        })
      })
    }
  }

  filterByDate() {
    console.log('Nach Filterung Genre: ', this.filteredMovies.length)
  }

  filterByStreamingPlatforms() {}

  filterBySpoiler() {}

  shuffleAndLimit() {
    for (let i = 0; i < this.filteredMovies.length - 1; i++) {
      const j = i + Math.floor(Math.random() * (this.filteredMovies.length - i))

      const temp = this.filteredMovies[j]
      this.filteredMovies[j] = this.filteredMovies[i]
      this.filteredMovies[i] = temp
    }

    if (this.filteredMovies.length > this.limit) {
      this.filteredMovies = this.filteredMovies.slice(0, parseInt(this.limit))
    }
  }

  consoleFilteringTest() {
    for (let index = 0; index < this.filteredMovies.length; index++) {
      if (index < 3) {
        console.log(' Filtered Sample:', this.filteredMovies[index])
      } else {
        return
      }
    }

    if (this.filteredMovies.length === 0) console.log('Keine Sample vorhanden!')
  }
}

module.exports = FilterPipeline

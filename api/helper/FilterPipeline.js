class FilterPipeline {
  constructor(unfilteredMovies, limit, filters) {
    this.limit = limit
    this.filters = filters
    this.filteredMovies = unfilteredMovies
  }

  getFilteredMovies() {
    this.filterByGenres()
    this.filterByDate()
    this.filterBySpoiler()
    this.shuffleAndLimit()
    return this.filteredMovies
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
    if (this.filters.releaseDates[0].start !== undefined) {
      this.filteredMovies = this.filteredMovies.filter(movie => {
        return (
          movie.releaseDate >= new Date(this.filters.releaseDates[0].start) &&
          movie.releaseDate <= new Date(this.filters.releaseDates[0].end)
        )
      })
    } else if (
      this.filters.releaseDates.length === 1 &&
      this.filters.releaseDates.includes('Kommende')
    ) {
      this.filteredMovies = this.filteredMovies.filter(
        movie => movie.releaseDate >= new Date()
      )
    } else if (
      this.filters.releaseDates.length === 1 &&
      this.filters.releaseDates.includes('Schon erschienen')
    ) {
      this.filteredMovies = this.filteredMovies.filter(
        movie => movie.releaseDate <= new Date()
      )
    }
  }

  filterBySpoiler() {
    // If no Spoilers are allowed, remove all trailers with spoiler timestamps

    // eslint-disable-next-line eqeqeq
    if (this.filters.blockSpoilers == 0) {
      this.filteredMovies = this.filteredMovies.filter(movie => {
        return movie.spoilerTimeStamp !== -1
      })
    }
  }

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

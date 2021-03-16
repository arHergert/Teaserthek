module.exports = {
  filterByGenres(movies, genres) {},
  filterByDate(movies, dates) {},
  filterByStreamingPlatforms(movies, streamFilters) {},
  filterByRatingPlatforms(movies, ratingFilters) {},
  filterBySpoiler(movies, spoilerRating) {},
  shuffleAndLimit(sourceArray, limit) {
    for (let i = 0; i < sourceArray.length - 1; i++) {
      const j = i + Math.floor(Math.random() * (sourceArray.length - i))

      const temp = sourceArray[j]
      sourceArray[j] = sourceArray[i]
      sourceArray[i] = temp
    }
    return sourceArray.slice(0, parseInt(limit))
  }
}

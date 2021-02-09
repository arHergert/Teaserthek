export const state = () => ({
  watchedTrailers: [],
  activeFilters: {
    genres: [],
    releaseDates: [],
    streamingPlatforms: [],
    ratingPlatforms: [],
    blockSpoilers: 2 // 0: block all, 1: block few, 2: block nothing
  }
})

export const mutations = {
  setWatchedTrailers(state, watchedTrailers) {
    state.watchedTrailers = watchedTrailers
  },
  setActiveFilters(state, activeFilters) {
    state.activeFilters = activeFilters
  }
}

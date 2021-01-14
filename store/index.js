export const state = () => ({
  watchedTrailers: []
})

export const mutations = {
  setWatchedTrailers(state, watchedTrailers) {
    state.watchedTrailers = watchedTrailers
  }
}

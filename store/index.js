export const state = () => ({
  watchedTrailers: [],
  activeFilters: {
    genres: [],
    releaseDates: [],
    streamingPlatforms: [],
    ratingPlatforms: [],
    blockSpoilers: 2 // 0: block all, 1: block few, 2: block nothing
  },
  snackbarShow: false,
  snackbarColor: 'success',
  snackbarText: '',
  snackbarIcon: '',
  snackbarTimeout: 4000
})

export const mutations = {
  setWatchedTrailers(state, watchedTrailers) {
    state.watchedTrailers = watchedTrailers
  },
  setActiveFilters(state, activeFilters) {
    state.activeFilters = activeFilters
  },
  setSnackbarShow(state, data) {
    state.snackbarShow = data
  },
  setSnackbarColor(state, data) {
    state.snackbarColor = data
  },
  setSnackbarText(state, data) {
    state.snackbarText = data
  },
  setSnackbarIcon(state, data) {
    state.snackbarIcon = data
  }
}

export const actions = {
  openSnackbar({ state, commit }, { text, type }) {
    switch (type) {
      case 'success':
        commit('setSnackbarIcon', '✔')
        break
      case 'error':
        commit('setSnackbarIcon', '⛒')
        break
      case 'warning':
        commit('setSnackbarIcon', '⚠')
        break
      default:
        commit('setSnackbarIcon', '🛈')
        break
    }
    commit('setSnackbarColor', type)
    commit('setSnackbarText', text)
    commit('setSnackbarShow', true)
    setTimeout(() => {
      commit('setSnackbarShow', false)
    }, state.snackbarTimeout)
  }
}

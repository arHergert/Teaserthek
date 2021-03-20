export const state = () => ({
  watchedTrailers: [],
  videoPlaylist: [],
  activeFilters: {
    genres: [],
    releaseDates: ['Kommende'],
    streamingPlatforms: [],
    blockSpoilers: 2 // 0: block all, 1: block few, 2: block nothing
  },
  snackbar: {
    show: false,
    color: 'success',
    text: '',
    icon: '',
    timeout: 4000
  },
  videoControls: {
    autoplay: true,
    currentIndex: 0,
    fullscreen: false,
    configTabsOpen: true
  },
  fetchedVideosEmpty: false
})

export const mutations = {
  setWatchedTrailers(state, watchedTrailers) {
    state.watchedTrailers = watchedTrailers
  },
  setVideoPlaylist(state, playlist) {
    state.videoPlaylist = playlist
  },
  setActiveFilters(state, activeFilters) {
    state.activeFilters = activeFilters
  },
  setSnackbarShow(state, data) {
    state.snackbar.show = data
  },
  setSnackbarColor(state, data) {
    state.snackbar.color = data
  },
  setSnackbarText(state, data) {
    state.snackbar.text = data
  },
  setSnackbarIcon(state, data) {
    state.snackbar.icon = data
  },
  setSnackbarTimeout(state, data) {
    state.snackbar.timeout = data
  },
  setCurrentVideoIndex(state, data) {
    state.videoControls.currentIndex = data
  },
  setControlsAutoplay(state, data) {
    state.videoControls.autoplay = data
  },
  setControlsFullscreen(state, data) {
    state.videoControls.fullscreen = data
  },
  setConfigTabsOpen(state, data) {
    state.videoControls.configTabsOpen = data
  },
  setFetchedVideosEmpty(state, data) {
    state.fetchedVideosEmpty = data
  }
}

export const actions = {
  openSnackbar({ state, commit }, { text, type, timeout }) {
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
    setTimeout(
      () => {
        commit('setSnackbarShow', false)
      },
      timeout !== undefined && timeout !== null
        ? timeout
        : state.snackbar.timeout
    )
  }
}

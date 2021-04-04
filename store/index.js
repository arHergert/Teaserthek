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
    configTabsOpen: true,
    showInfoWarn: false,
    globalnfoWarn: false,
    tempInfoWarn: true
  },
  fetchedVideosEmpty: false
})

export const mutations = {
  setWatchedTrailers(state, watchedTrailers) {
    state.watchedTrailers = watchedTrailers
  },
  addVideoToWatchedTrailers(state, video) {
    if (
      state.watchedTrailers.some(
        arrayVideo => arrayVideo.tmdb_id === video.tmdb_id
      )
    ) {
      state.watchedTrailers.forEach((arrayVideo, index) => {
        if (arrayVideo.tmdb_id === video.tmdb_id) {
          const tempVideo = state.watchedTrailers[index]
          state.watchedTrailers.splice(index, 1)
          state.watchedTrailers.unshift(tempVideo)
        }
      })
    } else {
      state.watchedTrailers.unshift(video)
    }
  },
  setRating(state, { tmdbId, rating }) {
    state.watchedTrailers.forEach(arrayVideo => {
      if (arrayVideo.tmdb_id === tmdbId) {
        // If Thumbs button was already rated, set unrated
        if (arrayVideo.rating === rating) {
          arrayVideo.rating = -1
        } else {
          arrayVideo.rating = rating
        }
      }
    })
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
  setGlobalInfoWarn(state, data) {
    state.videoControls.globalnfoWarn = data
  },
  setTempInfoWarn(state, data) {
    state.videoControls.tempInfoWarn = data
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

<template>
  <div>
    <v-app v-if="trailersFetched" class="player">
      <div id="title-overlay"></div>
      <div id="video-controls" :class="videoPaused ? 'paused' : ''">
        <VideoControlsUI />
      </div>
      <youtube
        ref="youtube"
        :video-id="videoPlaylist[currentVideoIndex].videoUrl"
        :player-vars="playerVars"
        :nocookie="true"
        width="100%"
        height="100%"
        @playing="playing"
        @ended="ended"
        @paused="paused"
        @ready="playerReady"
      ></youtube>
    </v-app>
    <v-app v-else class="player">
      <v-progress-circular
        :size="60"
        :width="6"
        color="grey lighten-3"
        indeterminate
        class="progress"
      ></v-progress-circular>
    </v-app>
  </div>
</template>

<script>
import VideoControlsUI from '~/components/videoPlayer/VideoControlsUI'
export default {
  VideoControlsUI,
  data() {
    return {
      trailersFetched: false,
      videoPaused: false,
      playerVars: {
        autoplay: 1,
        controls: 1,
        rel: 0,
        fs: 0,
        color: 'white',
        allow: 'autoplay',
        iv_load_policy: 3
      }
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    },
    currentVideoIndex() {
      return this.$store.state.videoControls.currentIndex
    },
    videoPlaylist() {
      return this.$store.state.videoPlaylist
    }
  },
  async beforeMount() {
    // Check localstorage and get filter
    if (
      window.localStorage &&
      window.localStorage.getItem('userMovieFilter') !== undefined
    ) {
      await this.$store.commit(
        'setActiveFilters',
        JSON.parse(window.localStorage.getItem('userMovieFilter'))
      )

      await this.fetchFilteredTrailerPlaylist(25)
    }
  },
  mounted() {
    // Apply filter to filter tab
  },
  methods: {
    playerReady() {
      this.player.playVideo()
    },
    playing() {
      setTimeout(() => {
        this.videoPaused = false
      }, 50)
    },
    ended() {
      if (
        this.$store.state.videoControls.autoplay &&
        this.currentVideoIndex < this.videoPlaylist.length - 1
      ) {
        this.$store.commit('setCurrentVideoIndex', this.currentVideoIndex + 1)
      }
    },
    paused() {
      this.videoPaused = true
    },
    async fetchFilteredTrailerPlaylist(limit) {
      const filters = this.$store.state.activeFilters
      const query = '/getfilteredmovies?limit=' + limit
      await this.$axios
        .$post(query, {
          filters
        })
        .then(res => {
          // If trailers were fetched, load youtube player with playlist
          this.$store.commit('setVideoPlaylist', res)
          this.$store.commit('setCurrentVideoIndex', 0)
          this.trailersFetched = true
        })
        .catch(error => console.error(error))
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  background-color: black;
  margin: auto;
}

.progress {
  margin: auto;
}

#title-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8%;
  background-color: black;
}

#video-controls {
  position: absolute;
  bottom: 76px;
  left: 25vw;
  right: 0;
  background: rgba(23, 23, 23);
  padding: 8px 20px;
  width: 30vw;
  height: 80px;
  z-index: 50;
  border-radius: 5px;
  border: 1px solid #232323;
  opacity: 0;
  transition: opacity 0.2s cubic-bezier(0, 0, 0.1, 0.1);

  &:hover {
    opacity: 0.9;
    transition: opacity 0.2s cubic-bezier(0, 0, 0.1, 0.1);
  }
}

.paused {
  opacity: 0.9 !important;
  transition: opacity 0s cubic-bezier(0, 0, 0.1, 0.1) !important;
}
</style>

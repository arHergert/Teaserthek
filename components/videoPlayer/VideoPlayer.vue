<template>
  <div
    :class="
      !this.$store.state.videoControls.fullscreen
        ? 'not-fullscreen'
        : 'fullscreen'
    "
  >
    <v-app v-if="dsgvoConfirmed === false" class="empty-data">
      <div v-if="!tabsOpen" class="resize-activator" @click="openTabsWindow()">
        <v-icon>mdi-menu-left</v-icon>
      </div>
      <div class="empty-data-status">
        <p><v-icon>mdi-youtube</v-icon></p>
        <p class="yt-text">
          Mit dem Laden der Videos auf dieser Seite akzeptierst Du die
          <a href="https://policies.google.com/privacy" target="_blank"
            >Datenschutzerklärung</a
          >
          von YouTube.
        </p>
        <v-btn class="primary-btn" x-large @click="confirmDSGVO()">
          Nur dieses mal akzeptieren
        </v-btn>
        <v-btn
          class=""
          color="blue-grey lighten-5"
          outlined
          x-large
          @click="confirmDSGVOForever()"
        >
          Immer akzeptieren
        </v-btn>
      </div>
    </v-app>
    <v-app
      v-if="
        videoPlaylist.length > 0 &&
        fetchedVideosEmpty == false &&
        dsgvoConfirmed
      "
      class="player"
    >
      <div v-if="!tabsOpen" class="resize-activator" @click="openTabsWindow()">
        <v-icon>mdi-menu-left</v-icon>
      </div>
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
    <v-app
      v-else-if="
        videoPlaylist.length === 0 &&
        fetchedVideosEmpty == false &&
        dsgvoConfirmed
      "
      class="player"
    >
      <v-progress-circular
        :size="60"
        :width="6"
        color="grey lighten-3"
        indeterminate
        class="progress"
      ></v-progress-circular>
    </v-app>
    <v-app
      v-else-if="
        videoPlaylist.length === 0 &&
        fetchedVideosEmpty == true &&
        dsgvoConfirmed
      "
      class="empty-data"
    >
      <div v-if="!tabsOpen" class="resize-activator" @click="openTabsWindow()">
        <v-icon>mdi-menu-left</v-icon>
      </div>
      <div class="empty-data-status">
        <p><v-icon>mdi-filmstrip-off</v-icon></p>
        <p>Leider wurden keine Trailer gefunden.</p>
        <p>Bitte mit anderen Filtern neu laden.</p>
      </div>
    </v-app>
  </div>
</template>

<script>
import VideoControlsUI from '~/components/videoPlayer/VideoControlsUI'
export default {
  VideoControlsUI,
  data() {
    return {
      videoPaused: false,
      dsgvoConfirmed: false,
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
    },
    fetchedVideosEmpty() {
      return this.$store.state.fetchedVideosEmpty
    },
    tabsOpen() {
      return this.$store.state.videoControls.configTabsOpen
    },
    currentVideo() {
      return this.$store.state.videoPlaylist[
        this.$store.state.videoControls.currentIndex
      ]
    }
  },
  async beforeMount() {
    // Check localstorage and get filter
    if (
      window.localStorage &&
      window.localStorage.getItem('userMovieFilter') !== null
    ) {
      await this.$store.commit(
        'setActiveFilters',
        JSON.parse(window.localStorage.getItem('userMovieFilter'))
      )
    }

    // Get History
    if (
      window.localStorage &&
      window.localStorage.getItem('watchedTrailers') !== null
    ) {
      this.$store.commit(
        'setWatchedTrailers',
        JSON.parse(window.localStorage.getItem('watchedTrailers'))
      )
    }

    await this.fetchFilteredTrailerPlaylist(25)
  },
  mounted() {
    // Check localstorage for DSGVO Confirmation
    if (
      window.localStorage &&
      window.localStorage.getItem('embeddedYoutubeConfirmed') !== null
    ) {
      this.dsgvoConfirmed = JSON.parse(
        window.localStorage.getItem('embeddedYoutubeConfirmed')
      )
    }
  },
  methods: {
    confirmDSGVO() {
      this.dsgvoConfirmed = true
    },
    confirmDSGVOForever() {
      this.confirmDSGVO()

      // Set decision to localstorage
      window.localStorage.setItem('embeddedYoutubeConfirmed', true)
    },
    playerReady() {
      this.player.playVideo()
    },
    playing() {
      setTimeout(() => {
        this.videoPaused = false
      }, 50)

      this.addVideoToHistory()

      // Add history to localstorage
      window.localStorage.setItem(
        'watchedTrailers',
        JSON.stringify(this.$store.state.watchedTrailers)
      )
    },
    ended() {
      if (this.currentVideoIndex === this.videoPlaylist.length - 1) {
        this.$store.dispatch('openSnackbar', {
          text:
            'Alle Trailer wurden abgespielt. Drücke "Playlist Updaten" für neue Videos!',
          type: 'blue darken-2',
          timeout: 6000
        })
      }

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
          this.$store.commit('setCurrentVideoIndex', 0)
          this.$store.commit('setVideoPlaylist', res)

          // Show empty data status if playlist is empty
          this.$store.commit('setFetchedVideosEmpty', !(res.length > 0))
        })
        .catch(error => console.error(error))
    },
    openTabsWindow() {
      this.$store.commit('setConfigTabsOpen', true)
    },
    addVideoToHistory() {
      // Add video to store
      this.$store.commit('addVideoToWatchedTrailers', {
        name: this.currentVideo.name,
        tmdb_id: this.currentVideo.tmdb_id,
        videoUrl: this.currentVideo.videoUrl,
        rating: -1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  background-color: black;
  margin: auto;
}

.not-fullscreen {
  .player:hover {
    #video-controls {
      opacity: 0.9;
      transition: opacity 0.2s cubic-bezier(0, 0, 0.1, 0.1);
    }
  }
}

.fullscreen {
  #video-controls:hover {
    opacity: 0.9;
    transition: opacity 0.2s cubic-bezier(0, 0, 0.1, 0.1);
  }
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
  bottom: 225px;
  left: 29%;
  right: 0;
  background: rgba(23, 23, 23);
  padding: 8px 10px;
  width: 34vw;
  height: 100px;
  z-index: 50;
  border-radius: 5px;
  border: 1px solid #232323;
  opacity: 0;
  transition: opacity 0.2s cubic-bezier(0, 0, 0.1, 0.1);
}

.paused {
  opacity: 0.9 !important;
  transition: opacity 0s cubic-bezier(0, 0, 0.1, 0.1) !important;
}

$engraved-text-shadow: 0px 1px 0px rgb(187 187 187 / 10%), 0px -1px 0px black;
$engraved-text-color: #131d23;

.empty-data {
  background-color: #283b44 !important;
  &-status {
    margin: auto;
    color: $engraved-text-color;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    font-weight: 700;
    font-size: 3rem;
    text-shadow: $engraved-text-shadow;
  }
  .v-icon {
    color: $engraved-text-color;
    font-size: 15rem;
    text-shadow: $engraved-text-shadow;
  }

  .yt-text {
    padding: 0 70px;
  }

  .v-btn {
    margin-top: 2em !important;
    color: #cfd8dc;
  }

  .primary-btn {
    background: linear-gradient(266.76deg, #46d254 1%, #24744e 99.45%);
  }

  a {
    text-decoration: none;
    font-weight: 600;
    color: #307855;
  }
}

.resize-activator {
  height: 100%;
  width: 50px;
  z-index: 3;
  right: 0;
  opacity: 0;
  background-color: #263238;
  position: absolute;
  display: flex;
  cursor: pointer;

  &:hover {
    transition: opacity 0.1s cubic-bezier(0, 0, 0.1, 0.1);
    opacity: 0.5;
  }

  .v-icon {
    margin: auto -1px;
    font-size: 3rem;
    color: white;
  }
}
</style>

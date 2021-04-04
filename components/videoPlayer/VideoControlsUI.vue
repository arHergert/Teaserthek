<template>
  <div class="control-ui">
    <div class="video-controls-section vertical-center hover-highlight">
      <v-tooltip top open-delay="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" dark v-on="on" @click="previousVideo()"
            >mdi-skip-previous</v-icon
          >
        </template>
        <span> Vorheriges Video</span>
      </v-tooltip>
      <v-tooltip top open-delay="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" dark v-on="on" @click="nextVideo()"
            >mdi-skip-next</v-icon
          >
        </template>
        <span> Nächstes Video</span>
      </v-tooltip>
    </div>

    <div class="thumbs-section vertical-center hover-highlight">
      <v-tooltip top open-delay="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            class="thumbs"
            :class="getVideoRating(currentVideo.tmdb_id) == 1 ? 'liked' : ''"
            dark
            @click="setRating(currentVideo.tmdb_id, 1)"
            v-on="on"
            >mdi-thumb-up</v-icon
          >
        </template>
        <span>Like</span>
      </v-tooltip>
      <v-tooltip top open-delay="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            class="thumbs"
            :class="getVideoRating(currentVideo.tmdb_id) == 0 ? 'disliked' : ''"
            dark
            @click="setRating(currentVideo.tmdb_id, 0)"
            v-on="on"
            >mdi-thumb-down</v-icon
          >
        </template>
        <span>Dislike</span>
      </v-tooltip>
    </div>

    <v-tooltip top open-delay="1000">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" class="autoplay vertical-center" v-on="on">
          <v-switch
            v-model="autoplay"
            dark
            flat
            @click="toggleAutoplay()"
          ></v-switch>
        </div>
      </template>
      <span>Autoplay: {{ videoControls.autoplay ? 'On' : 'Off' }} </span>
    </v-tooltip>

    <div class="playlist-section vertical-center" dark>
      <v-icon class="playlist-icon" dark>mdi-playlist-play</v-icon>
      <span dark>
        {{ currentVideoIndex + 1 }} / {{ videoPlaylist.length }}
      </span>
    </div>

    <v-tooltip top open-delay="1000">
      <template v-slot:activator="{ on, attrs }">
        <div
          v-bind="attrs"
          dark
          class="fullscreen vertical-center hover-highlight"
          @click="toggleFullscreen()"
          v-on="on"
        >
          <v-icon v-if="!videoControls.fullscreen" dark>mdi-fullscreen</v-icon>
          <v-icon v-else dark>mdi-fullscreen-exit</v-icon>
        </div>
      </template>
      <span>
        {{ !videoControls.fullscreen ? 'Vollbild' : 'Vollbild beenden' }}
      </span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoplay: true
    }
  },
  computed: {
    videoControls() {
      return this.$store.state.videoControls
    },
    currentVideoIndex() {
      return this.$store.state.videoControls.currentIndex
    },
    videoPlaylist() {
      return this.$store.state.videoPlaylist
    },
    currentVideo() {
      return this.$store.state.videoPlaylist[
        this.$store.state.videoControls.currentIndex
      ]
    }
  },
  mounted() {
    this.autoplay = this.videoControls.autoplay
  },
  methods: {
    toggleAutoplay() {
      this.$store.commit('setControlsAutoplay', !this.videoControls.autoplay)
    },
    toggleFullscreen() {
      this.$store.commit(
        'setControlsFullscreen',
        !this.videoControls.fullscreen
      )

      if (this.videoControls.fullscreen) {
        document.getElementById('teaserthek').requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    },
    nextVideo() {
      if (this.currentVideoIndex < this.videoPlaylist.length - 1) {
        this.$store.commit('setCurrentVideoIndex', this.currentVideoIndex + 1)
      }
    },
    previousVideo() {
      if (this.currentVideoIndex > 0) {
        this.$store.commit('setCurrentVideoIndex', this.currentVideoIndex - 1)
      }
    },
    getVideoRating(videoTmdbId) {
      let finalRating = -1
      this.$store.state.watchedTrailers.forEach(arrayVideo => {
        if (arrayVideo.tmdb_id === videoTmdbId) {
          finalRating = arrayVideo.rating
        }
      })
      return finalRating
    },
    /**
     * -1: Unrated
     * 0: Disliked
     * 1: Liked
     */
    setRating(tmdbId, rating) {
      this.$store.commit('setRating', { tmdbId, rating })

      // Update history in localstorage with rating
      window.localStorage.setItem(
        'watchedTrailers',
        JSON.stringify(this.$store.state.watchedTrailers)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.vertical-center {
  display: block;
  margin: auto 0;
}

.hover-highlight {
  .v-icon {
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
}

.control-ui {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  span {
    color: #ebedeb;
  }

  .v-icon {
    font-size: 3vw;
    color: rgba(255, 255, 255, 0.5);
    padding: 0 5px;
    cursor: pointer;
  }

  .playlist-section {
    .playlist-icon {
      cursor: initial;
    }

    span {
      white-space: nowrap;
    }
  }

  .thumbs-section {
    .v-icon {
      &.liked {
        color: rgba(46, 150, 99, 0.5) !important;
        &:hover {
          color: rgba(46, 150, 99, 1) !important;
        }
      }

      &.disliked {
        color: rgba(150, 46, 46, 0.5) !important;
        &:hover {
          color: rgb(150, 46, 46) !important;
        }
      }
    }
  }

  .thumbs {
    font-size: 2vw;
  }
}

.video-controls-section {
  .v-icon {
    padding: 0;
  }
}

.thumbs-section,
.autoplay {
  padding: 0 1vw;
}
</style>

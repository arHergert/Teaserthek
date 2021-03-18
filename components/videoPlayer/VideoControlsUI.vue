<template>
  <div class="control-ui">
    <div class="playlist-section vertical-center" dark>
      <v-icon class="playlist-icon" dark>mdi-playlist-play</v-icon>
      <span dark>
        {{ currentVideoIndex + 1 }} / {{ videoPlaylist.length }}
      </span>
    </div>

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
          <v-icon v-bind="attrs" class="thumbs" dark v-on="on"
            >mdi-thumb-up</v-icon
          >
        </template>
        <span>Like</span>
      </v-tooltip>
      <v-tooltip top open-delay="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" class="thumbs" dark v-on="on"
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

  span {
    color: #ebedeb;
  }

  .v-icon {
    font-size: 2.5vw;
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

  .thumbs {
    font-size: 2vw;
  }
}

.video-controls-section {
  padding: 0 1vw 0 1.7vw;

  .v-icon {
    padding: 0;
  }
}

.thumbs-section,
.autoplay {
  padding: 0 1vw;
}
</style>

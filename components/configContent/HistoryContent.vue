<template>
  <v-container
    class="blue-grey darken-4 white--text filter-tab"
    :class="!globalInfoWarn && tempInfoWarn ? 'full-window' : ''"
  >
    <InfoWarnWall />

    <div class="history-sort">
      <v-tooltip top open-delay="700">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" class="filter" dark v-on="on"
            >mdi-filter</v-icon
          >
        </template>
        <span>Nach Rating sortieren</span>
      </v-tooltip>
      <v-tooltip top open-delay="700">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            class="thumbs-sort"
            :class="currentSorting === 1 ? 'sorted' : ''"
            dark
            v-on="on"
            @click="setSorting(1)"
            >mdi-thumb-up-outline</v-icon
          >
        </template>
        <span>Nur gelikte Trailer anzeigen</span>
      </v-tooltip>
      <v-tooltip top open-delay="700">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            class="thumbs-sort"
            :class="currentSorting === 0 ? 'sorted' : ''"
            dark
            v-on="on"
            @click="setSorting(0)"
            >mdi-thumb-down-outline</v-icon
          >
        </template>
        <span>Nur dislikte Trailer anzeigen</span>
      </v-tooltip>
    </div>
    <div class="history">
      <div v-for="trailer in sortedTrailersByRating()" :key="trailer.tmdb_id">
        <div class="history-entry">
          <div class="name text-body-1">{{ trailer.name }}</div>
          <div class="thumbs-section">
            <v-tooltip top open-delay="1000">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  class="thumbs"
                  :class="trailer.rating == 1 ? 'liked' : ''"
                  dark
                  v-on="on"
                  @click="setRating(trailer.tmdb_id, 1)"
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
                  :class="trailer.rating == 0 ? 'disliked' : ''"
                  dark
                  v-on="on"
                  @click="setRating(trailer.tmdb_id, 0)"
                  >mdi-thumb-down</v-icon
                >
              </template>
              <span>Dislike</span>
            </v-tooltip>
          </div>
          <div class="youtube-url">
            <v-tooltip top open-delay="1000">
              <template v-slot:activator="{ on, attrs }">
                <a
                  :href="'https://www.youtube.com/watch?v=' + trailer.videoUrl"
                  target="_blank"
                >
                  <v-icon v-bind="attrs" class="thumbs" dark v-on="on"
                    >mdi-youtube</v-icon
                  >
                </a>
              </template>
              <span>Video auf YouTube anzeigen</span>
            </v-tooltip>
          </div>
        </div>
        <v-divider dark></v-divider>
      </div>
    </div>
  </v-container>
</template>

<script>
import InfoWarnWall from '~/components/configContent/infoContent/InfoWarnWall'
export default {
  InfoWarnWall,
  data() {
    return {
      currentSorting: -1
    }
  },
  computed: {
    watchedTrailers() {
      return this.$store.state.watchedTrailers
    },
    globalInfoWarn() {
      return this.$store.state.videoControls.globalnfoWarn
    },
    tempInfoWarn() {
      return this.$store.state.videoControls.tempInfoWarn
    }
  },
  methods: {
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
    },
    setSorting(type) {
      this.currentSorting = this.currentSorting === type ? -1 : type
    },
    sortedTrailersByRating() {
      if (this.currentSorting === -1) {
        return this.watchedTrailers
      } else {
        return this.watchedTrailers.filter(
          trailer => trailer.rating === this.currentSorting
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.full-window {
  height: 85vh;
}

.filter-tab {
  padding-right: 15px;
}

.history-sort {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 65px 15px 0px;

  .filter {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.5vw;
  }

  .thumbs-sort {
    color: rgba(255, 255, 255, 0.1);
    font-size: 1.5vw;
    &:hover {
      color: rgba(255, 255, 255, 0.5);
    }

    &.sorted {
      color: rgba(255, 255, 255, 1) !important;
      font-size: 1.6vw;
      &:hover {
        color: rgba(255, 255, 255, 1) !important;
      }
    }
  }
}
.history {
  overflow-y: auto;
  max-height: 70vh;
  background-color: rgba(0, 0, 0, 0.25);

  &-entry {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60px;
    height: fit-content;
    padding: 10px 0px 5px 15px;

    .name {
      width: 150px;
      word-wrap: break-word;
    }

    .thumbs-section {
      .v-icon {
        color: rgba(255, 255, 255, 0.2);
        font-size: 1vw;
        &:hover {
          color: rgba(255, 255, 255, 1);
        }

        &.liked {
          color: rgba(46, 150, 99, 0.5) !important;
          font-size: 1vw;
          &:hover {
            color: rgba(46, 150, 99, 1) !important;
          }
        }

        &.disliked {
          color: rgba(150, 46, 46, 0.5) !important;
          font-size: 1vw;
          &:hover {
            color: rgb(150, 46, 46) !important;
          }
        }
      }
    }

    .youtube-url {
      padding: 0 25px;

      a {
        text-decoration: none;
      }

      .v-icon {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1.5vw;
        &:hover {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  .v-icon {
    cursor: pointer;
  }
}
</style>

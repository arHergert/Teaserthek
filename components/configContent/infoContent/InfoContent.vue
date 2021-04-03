<template>
  <v-container class="blue-grey darken-4 white--text filter-tab">
    <InfoWarnWall />
    <div class="tab-article">
      <div class="movie-info">
        <div
          v-if="movieResult !== null"
          class="backdrop"
          :style="`background-image: url('https://image.tmdb.org/t/p/w500/${movieResult.backdrop_path}')`"
        ></div>
        <v-skeleton-loader
          v-else
          dark
          type="paragraph, sentences, paragraph, image"
        ></v-skeleton-loader>
        <p v-if="movieResult !== null" class="text-h4 font-weight-bold">
          {{ movieResult.title }}
        </p>
        <div class="poster">
          <v-img
            v-if="movieResult !== null"
            max-height="220"
            max-width="140"
            :src="`https://image.tmdb.org/t/p/w200/${movieResult.poster_path}`"
          ></v-img>
        </div>
        <p v-if="movieResult !== null" class="text-substitle-1">
          <span>{{ getFormatedDate(currentVideo.releaseDate) }}</span>
          <span class="movie-info-inline">{{
            movieResult.runtime !== 0
              ? movieResult.runtime + ' Minuten'
              : 'Laufzeit unbekannt'
          }}</span>
        </p>
        <div v-if="movieResult !== null">
          <v-chip
            v-for="genre in currentVideo.genres"
            :key="genre.name"
            class="tab-chip"
            text-color="grey lighten-3"
            color="grey darken-4"
          >
            {{ genre }}
          </v-chip>
        </div>
        <v-skeleton-loader v-else dark type="paragraph"></v-skeleton-loader>
        <div v-if="movieResult !== null" class="crew-info">
          <p class="text-caption">
            Director
            {{
              crewInfo.writer === null || crewInfo.director === crewInfo.writer
                ? ' / Writer'
                : ''
            }}
          </p>
          <p class="text-substitle-1">{{ crewInfo.director }}</p>
          <p
            v-if="
              crewInfo.writer !== null && crewInfo.director !== crewInfo.writer
            "
            class="text-caption"
          >
            Writer
          </p>
          <p
            v-if="
              crewInfo.writer !== null && crewInfo.director !== crewInfo.writer
            "
            class="text-substitle-1"
          >
            {{ crewInfo.writer }}
          </p>
          <p class="text-caption">Schauspieler</p>
          <p class="text-substitle-1">
            <span
              v-for="(actor, index) in crewInfo.actors"
              :key="actor"
              :class="index === 0 ? '' : 'actor-name'"
            >
              {{ actor }}
            </span>
          </p>
        </div>
        <v-skeleton-loader v-else dark type="paragraph"></v-skeleton-loader>
      </div>
    </div>
    <div class="tab-article">
      <v-skeleton-loader
        v-if="movieResult === null"
        dark
        type="paragraph, paragraph"
      ></v-skeleton-loader>
      <div v-else class="text-body-1">
        <v-expansion-panels accordion dark>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-overline"
              >Handlung</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <span
                :class="
                  movieResult.overview !== null && movieResult.overview !== ''
                    ? ''
                    : 'font-italic'
                "
              >
                {{
                  movieResult.overview !== null && movieResult.overview !== ''
                    ? movieResult.overview
                    : 'Zurzeit nicht vorhanden'
                }}
              </span>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div v-if="streamingPlatforms !== -1" class="tab-article reverse-margin">
        <v-skeleton-loader
          v-if="streamingPlatforms === null && movieResult == null"
          dark
          color="green"
          type="paragraph, paragraph"
        ></v-skeleton-loader>
        <div v-else>
          <p class="text-h6">Streamingdienste</p>
          <div
            v-if="streamingPlatforms !== null && movieResult !== null"
            class="streaming"
          >
            <span
              v-for="stream in streamingPlatforms"
              :key="stream.provider_id"
              class="streaming-icons"
            >
              <v-tooltip bottom open-delay="500">
                <template v-slot:activator="{ on, attrs }">
                  <a
                    :href="
                      streamingSearchRedirect(
                        stream.provider_name,
                        movieResult.title
                      )
                    "
                    target="_blank"
                  >
                    <v-img
                      max-height="60"
                      max-width="60"
                      v-bind="attrs"
                      :src="`https://image.tmdb.org/t/p/w92/${stream.logo_path}`"
                      v-on="on"
                    ></v-img>
                  </a>
                </template>
                <span> {{ stream.provider_name }} </span>
              </v-tooltip>
            </span>
          </div>
        </div>
      </div>
      <div v-if="movieResult !== null" class="tab-article reverse-margin">
        <p class="text-h6">Bewertungen</p>
        <div class="imdb-link">
          <a
            :href="this.$config.IMDB_URL + movieResult.imdb_id"
            target="_blank"
          >
            <span class="brand">IMDb</span>
          </a>
        </div>
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
      movieResult: null,
      crewInfo: {
        director: null,
        writer: null,
        actors: []
      },
      streamingPlatforms: null
    }
  },
  computed: {
    currentVideo() {
      return this.$store.state.videoPlaylist[
        this.$store.state.videoControls.currentIndex
      ]
    }
  },
  watch: {
    // Watcher for current video, all information will be updated when trailer switches
    currentVideo() {
      // Remove old information
      this.movieResult = null
      this.streamingPlatforms = null
      this.crewInfo = {
        director: null,
        writer: null,
        actors: []
      }
      this.$store.commit('setTempInfoWarn', true)

      // Call all API methods for current video
      this.getInfo()
      this.getCrewInfo()
      this.getStreamingPlatforms()
    }
  },
  mounted() {
    // Call all API methods for first trailer
    this.getInfo()
    this.getCrewInfo()
    this.getStreamingPlatforms()
  },
  methods: {
    getInfo() {
      const query = `${this.$config.TMDB_SEARCH_URL}movie/${this.currentVideo.tmdb_id}?api_key=${this.$config.TMDB_API_KEY}&language=de`
      this.$axios
        .$get(query)
        .then(res => {
          this.movieResult = res
        })
        .catch(error => console.error(error))
    },
    getCrewInfo() {
      const query = `${this.$config.TMDB_SEARCH_URL}movie/${this.currentVideo.tmdb_id}/credits?api_key=${this.$config.TMDB_API_KEY}&language=de`
      this.$axios
        .$get(query)
        .then(res => {
          const cast = res.cast
          const crew = res.crew

          // Find Director and Writer
          for (const entry of crew) {
            if (entry.job === 'Director') {
              this.crewInfo.director = entry.name
              break
            }
          }

          for (const entry of crew) {
            if (entry.job === 'Screenplay') {
              this.crewInfo.writer = entry.name
              break
            }
          }

          // Get the first three actors
          for (const entry of cast) {
            this.crewInfo.actors.push(entry.name)
            if (this.crewInfo.actors.length > 3) {
              break
            }
          }
        })
        .catch(error => console.error(error))
    },
    getStreamingPlatforms() {
      const query = `${this.$config.TMDB_SEARCH_URL}movie/${this.currentVideo.tmdb_id}/watch/providers?api_key=${this.$config.TMDB_API_KEY}&language=de`
      this.$axios
        .$get(query)
        .then(res => {
          this.streamingPlatforms =
            res.results.DE !== undefined &&
            res.results.DE.flatrate !== undefined
              ? res.results.DE.flatrate
              : -1
        })
        .catch(error => console.error(error))
    },
    streamingSearchRedirect(provider, movieTitle) {
      let url = null

      // Give providers on Amazon or Netflix channels the same search URL
      if (provider.toLowerCase().includes('amazon')) {
        return `https://www.amazon.de/s?k=${movieTitle}`
      }

      if (provider.toLowerCase().includes('netflix')) {
        return `https://www.netflix.com/search?q=${movieTitle}`
      }

      // All others will be given an unique search URL
      switch (provider) {
        case 'Home of Horror':
          url = 'https://www.homeofhorror.de/search'
          break
        case 'Sky Ticket':
          url = 'https://skyticket.sky.de/watch/cinema/highlights'
          break
        case 'Sky Go':
          url = 'https://www.sky.de/produkte/sky-go-158150'
          break
        case 'EntertainTV':
          url = 'https://web.magentatv.de/suche'
          break
        case 'Joyn Plus':
          url = 'https://www.joyn.de/plus/filme'
          break
        case 'Disney Plus':
          url = 'https://www.disneyplus.com/de-de/movies'
          break

        default:
          url = `https://www.werstreamt.es/filme-serien/?q=${movieTitle} ${
            this.currentVideo.releaseDate.split('-')[0]
          }`
          break
      }
      return url
    },
    getFormatedDate(dateString) {
      const date = new Date(dateString)
      return (
        date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.v-chip.v-size--default {
  height: 2rem;
  background-color: rgba(0, 0, 0, 0.25) !important;
  border-radius: 5px;
}

.v-expansion-panel {
  background-color: rgba(0, 0, 0, 0.25) !important;
}

.movie-info {
  position: relative;
  z-index: 1;
}

.crew-info {
  margin-top: 1.5em;
  .text-caption {
    margin-bottom: 0;
  }

  .text-substitle-1 {
    margin-bottom: 1em;
  }

  .actor-name::before {
    content: '\2022';
    padding: 5px;
    opacity: 0.6;
  }
}

.streaming {
  display: flex;
  align-content: space-around;
  &-icons {
    margin-right: 15px;
    .v-image {
      border-radius: 5px;
    }
  }
}

.v-expansion-panel-content {
  overflow-y: scroll;
  max-height: 350px;
}

.backdrop {
  height: 400px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 0px 37px 40px #263238 inset;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: -1;
  left: 0;
  right: 0;
  opacity: 0.2;
}

.poster {
  float: right;
  margin: 0 10px;
  min-height: 220px;
  min-width: 140px;

  .v-image {
    border-radius: 3px;
  }
}

.imdb-link {
  margin: 20px 0 10px 0;

  a {
    text-decoration: none;
    font-size: 1.5em;
  }

  .brand {
    background-color: #f5c518;
    border-radius: 3px;
    padding: 16px 6px;
    color: #1b1b1b;
    font-family: 'Impact', 'Arial Black', 'Franklin Gothic Medium', sans-serif;
  }

  .rating {
    color: white;
    margin-left: 5px;
  }
}

.movie-info-inline {
  white-space: nowrap;
  &::before {
    font-size: 1.1em;
    line-height: 1;
    content: '\2022';
    padding: 10px;
    opacity: 0.6;
  }
}
</style>

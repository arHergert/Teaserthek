<template>
  <v-container class="blue-grey darken-4 white--text filter-tab">
    <div class="tab-article">
      <p class="text-h5">Filmtrailer hinzufügen</p>
      <div>
        <v-text-field
          v-model="movieName"
          dark
          :rules="[value => !!value || 'Darf nicht leer sein!']"
          label="Titel des Films *"
        ></v-text-field>
        <v-text-field
          v-model="videoUrl"
          dark
          label="YouTube ID des Trailers"
        ></v-text-field>
        <v-select
          v-model="videoLanguage"
          dark
          :items="languageItems"
          filled
          label="Sprache des Trailers"
        ></v-select>
        <v-text-field
          v-model="spoilerTimeStamp"
          dark
          label="Beginn der Spoiler (z.B. '1:45')"
        ></v-text-field>
      </div>
      <v-btn
        depressed
        :disabled="disabledBtn"
        x-large
        color="primary tab-btn"
        @click="addTrailer()"
      >
        <span v-if="disabledBtn === false">Neuen Trailer eintragen</span>
        <span v-else>Wird eingetragen...</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import mapTmdbIDsMixin from '~/mixins/mapTmdbIDs.js'
export default {
  mixins: [mapTmdbIDsMixin],
  data() {
    return {
      movieName: '',
      videoUrl: '',
      videoLanguage: '',
      spoilerTimeStamp: '',
      genres: [],
      streamingPlatforms: [],
      ratingPlatforms: [],
      disabledBtn: false,
      tmdbLanguage: 'de',
      languageItems: ['Deutsch', 'Englisch']
    }
  },
  methods: {
    async addTrailer() {
      if (this.movieName !== '') {
        this.disabledBtn = true
        this.tmdbLanguage =
          this.videoLanguage === 'Deutsch' || this.videoLanguage === ''
            ? 'de'
            : 'en-Us'
        let movieInfo = null
        movieInfo = await this.getMovieByName()
        console.log('Movie Lengths', movieInfo !== null)
        if (this.videoUrl === '' && movieInfo !== null) {
          this.videoUrl = await this.getYoutubeId(movieInfo.id)

          if (this.videoUrl === '0') {
            this.$store.dispatch('openSnackbar', {
              text:
                'Suche ergab kein YouTube Video. Bitte Video ID manuell eintragen!',
              type: 'error'
            })
            this.disabledBtn = false
            this.videoUrl = ''
            this.spoilerTimeStamp = ''
            return
          }
        }
        if (movieInfo !== null) {
          await this.$axios
            .$post('/addmovie/', {
              name:
                movieInfo.title !== undefined
                  ? movieInfo.title
                  : this.movieName,
              videoUrl: this.videoUrl,
              language: this.videoLanguage,
              releaseDate: movieInfo.release_date,
              tmdb_id: movieInfo.id,
              spoilerTimeStamp: this.minutesToSeconds(this.spoilerTimeStamp),
              genres: this.mapGenreIDs(movieInfo.genre_ids)
            })
            .then(res => {
              this.$store.dispatch('openSnackbar', {
                text: `${movieInfo.title} (${
                  movieInfo.release_date.split('-')[0]
                }) wurde erfolgreich hinzugefügt!`,
                type: 'success'
              })
              this.videoUrl = ''
              this.spoilerTimeStamp = ''
            })
            .catch(error => console.error(error))
        } else {
          this.$store.dispatch('openSnackbar', {
            text:
              'Filmtitel ergab keine Treffer. Eintrag wurde nicht hinzugefügt!',
            type: 'error'
          })
          this.videoUrl = ''
          this.spoilerTimeStamp = ''
        }
        this.disabledBtn = false
      } else {
        this.$store.dispatch('openSnackbar', {
          text: 'Bitte notwendige Felder befüllen!',
          type: 'warning'
        })
      }
    },
    async getMovieByName() {
      let movieInfo = null
      const query = `${this.$config.TMDB_SEARCH_URL}search/movie?api_key=${this.$config.TMDB_API_KEY}&language=${this.tmdbLanguage}&query=${this.movieName}`
      console.log('GET Movie Name: ', query)
      await this.$axios
        .$get(query)
        .then(res => {
          console.log('Movie Name', res)
          if (res.results.length > 0) {
            movieInfo = res.results[0]
          }
        })
        .catch(error => console.error(error))
      return movieInfo
    },
    async getYoutubeId(movieId) {
      let youtubeId
      const query = `${this.$config.TMDB_SEARCH_URL}movie/${movieId}/videos?api_key=${this.$config.TMDB_API_KEY}&language=${this.tmdbLanguage}`
      console.log('GET Movie Videos: ', query)
      await this.$axios
        .$get(query)
        .then(res => {
          console.log('Movie Videos Res', res)
          if (res.results.length > 0) {
            youtubeId =
              res.results[0].site === 'YouTube' ? res.results[0].key : '0' // Only YT Ids are valid
          } else {
            youtubeId = '0'
          }
        })
        .catch(error => console.error(error))
      return youtubeId
    }
  }
}
</script>

<style lang="scss" scoped></style>

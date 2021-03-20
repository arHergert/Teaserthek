<template>
  <v-container class="blue-grey darken-4 white--text filter-tab">
    <div class="tab-article">
      <p class="text-h4">Filter</p>
      <p class="text-h5">Genres</p>
      <div class="tab-article-chips">
        <v-chip
          class="tab-chip"
          text-color="grey lighten-3"
          :color="defaultChipColor(tabFilters.genres)"
          @click="setDefaultChipValue(tabFilters.genres)"
        >
          Alle
        </v-chip>
        <v-chip
          v-for="genre in tabFilters.genres"
          :key="genre.name"
          class="tab-chip"
          text-color="grey lighten-3"
          :color="chipColor(genre)"
          @click="changeChipStatus(genre)"
        >
          {{ genre.name }}
        </v-chip>
      </div>
    </div>
    <div class="tab-article">
      <p class="text-h5">Erscheinungsdatum</p>
      <div class="tab-article-chips">
        <v-chip
          v-for="date in tabFilters.releaseDates"
          :key="date.name"
          class="tab-chip"
          text-color="grey lighten-3"
          :color="chipColor(date)"
          @click="changeChipStatus(date)"
        >
          {{ date.name }}
        </v-chip>
        <v-row align="center" class="text-divider">
          <v-divider dark></v-divider>
          <span class="lightgrey-color">oder</span>
          <v-divider dark></v-divider>
        </v-row>
        <v-chip
          class="tab-chip"
          text-color="grey lighten-3"
          :color="timespanActive ? '#2e9663' : 'grey darken-4'"
          @click="changeTimespanStatus()"
        >
          Eigener Zeitraum
        </v-chip>
      </div>
      <div v-if="timespanActive">
        <v-menu
          ref="menu"
          v-model="menuStart"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="timespan[0].start"
              dark
              label="Start"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="timespan[0].start"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="menuEnd"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="timespan[0].end"
              dark
              label="Ende"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="timespan[0].end"
            :min="timespan[0].start"
          ></v-date-picker>
        </v-menu>
      </div>
    </div>
    <div class="tab-article">
      <p class="text-h5">Spoiler zulassen?</p>
      <div class="tab-article-slider">
        <v-slider
          v-model="tabFilters.blockSpoilers"
          :tick-labels="spoilerLabels"
          :max="2"
          :min="0"
          step="1"
          dark
          ticks="always"
          track-color="grey lighten-3"
          track-fill-color="#2e9663"
          tick-size="3"
          height="30"
          loader-height="5"
          thumb-color="#2e9663"
        ></v-slider>
      </div>
    </div>
    <v-btn depressed x-large color="primary tab-btn" @click="applyFilters()">
      Playlist updaten
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tabFilters: {
        genres: [
          { name: 'Drama', active: false },
          { name: 'Thriller', active: false },
          { name: 'Action', active: false },
          { name: 'Science Fiction', active: false },
          { name: 'Fantasy', active: false },
          { name: 'Liebesfilm', active: false },
          { name: 'Horror', active: false },
          { name: 'Abenteuer', active: false },
          { name: 'Animation', active: false },
          { name: 'Komödie', active: false },
          { name: 'Dokumentarfilm', active: false },
          { name: 'Krimi', active: false },
          { name: 'Mystery', active: false },
          { name: 'Familie', active: false },
          { name: 'Western', active: false },
          { name: 'Kriegsfilm', active: false },
          { name: 'Musik', active: false },
          { name: 'Historie', active: false }
        ],
        releaseDates: [
          { name: 'Kommende', active: true },
          { name: 'Schon erschienen', active: false }
        ],
        blockSpoilers: 2 // 0: block all, 1: block few, 2: block nothing
      },
      spoilerLabels: ['Keine', 'Mit Spoilerwarnung', 'Zulassen'],
      timespanActive: false,
      timespan: [{ start: null, end: null }],
      menuStart: false,
      menuEnd: false
    }
  },
  computed: {
    activeFilters() {
      return this.$store.state.activeFilters
    }
  },
  watch: {
    menuStart(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    menuEnd(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  beforeMount() {
    // Check localstorage and get filter
    if (
      window.localStorage &&
      window.localStorage.getItem('userMovieFilter') !== null
    ) {
      this.applyFilterToTab(
        JSON.parse(window.localStorage.getItem('userMovieFilter'))
      )
    }
  },
  methods: {
    chipColor(filterName) {
      return filterName.active === true ? '#2e9663' : 'grey darken-4'
    },
    changeChipStatus(filter) {
      if (filter.name === 'Kommende' || filter.name === 'Schon erschienen') {
        this.timespanActive = false

        if (
          !filter.active ||
          (filter.active &&
            this.tabFilters.releaseDates.every(date => date.active === true))
        ) {
          filter.active = !filter.active
        }
      } else {
        filter.active = !filter.active
      }
    },
    changeTimespanStatus() {
      this.timespanActive = true
      this.tabFilters.releaseDates = [
        { name: 'Kommende', active: false },
        { name: 'Schon erschienen', active: false }
      ]
    },
    defaultChipColor(filterArray) {
      return filterArray.some(filter => filter.active === true)
        ? 'grey darken-4'
        : '#2e9663'
    },
    setDefaultChipValue(filterArray) {
      filterArray.forEach(filter => {
        filter.active = false
      })
    },
    extractedFilterStrings() {
      const extractedFilters = { ...this.tabFilters }

      // Only leave active filters in all arrays
      extractedFilters.genres = extractedFilters.genres.filter(
        genre => genre.active === true
      )
      extractedFilters.releaseDates = extractedFilters.releaseDates.filter(
        date => date.active === true
      )

      // Use mapping to only include name
      extractedFilters.genres = extractedFilters.genres.map(
        filter => filter.name
      )

      if (extractedFilters.releaseDates.length === 0) {
        // Add timespan to filter array
        extractedFilters.releaseDates = this.timespan
      } else {
        extractedFilters.releaseDates = extractedFilters.releaseDates.map(
          filter => filter.name
        )
      }

      return extractedFilters
    },
    applyFilterToTab(filters) {
      // Iterate over genres
      this.tabFilters.genres.forEach(genre => {
        if (filters.genres.includes(genre.name)) {
          genre.active = true
        }
      })

      // Get date values
      if (filters.releaseDates[0].start !== undefined) {
        this.changeTimespanStatus()
        this.timespan[0].start = filters.releaseDates[0].start
        this.timespan[0].end = filters.releaseDates[0].end
      } else {
        this.tabFilters.releaseDates = [
          { name: 'Kommende', active: false },
          { name: 'Schon erschienen', active: false }
        ]
        this.tabFilters.releaseDates.forEach(date => {
          if (filters.releaseDates.includes(date.name)) {
            date.active = true
          }
        })
      }

      // Get spoiler value
      this.tabFilters.blockSpoilers = filters.blockSpoilers
    },
    applyFilters() {
      if (
        !this.timespanActive ||
        (this.timespan[0].start !== null && this.timespan[0].end !== null)
      ) {
        if (new Date(this.timespan[0].start) > new Date(this.timespan[0].end)) {
          this.$store.dispatch('openSnackbar', {
            text: 'Enddatum darf nicht vor Startdatum liegen!',
            type: 'warning'
          })
          return
        }
        const newFilter = this.extractedFilterStrings()
        this.$store.commit('setActiveFilters', newFilter)
        // Convert the object into a JSON string and store
        window.localStorage.setItem(
          'userMovieFilter',
          JSON.stringify(newFilter)
        )
        this.updateTrailerPlaylist(25)
      } else {
        this.$store.dispatch('openSnackbar', {
          text: 'Start- und Enddatum müssen angegeben sein!',
          type: 'warning'
        })
      }
    },
    async updateTrailerPlaylist(limit) {
      const filters = this.activeFilters
      const query = '/getfilteredmovies?limit=' + limit
      await this.$axios
        .$post(query, {
          filters
        })
        .then(res => {
          // Update playlist and reset index
          this.$store.commit('setCurrentVideoIndex', 0)
          this.$store.commit('setVideoPlaylist', res)

          // Show empty data status if playlist is empty
          this.$store.commit('setFetchedVideosEmpty', !(res.length > 0))

          if (res.length > 0) {
            this.$store.dispatch('openSnackbar', {
              text: 'Playlist wurde aktualisiert. Viel Spaß!',
              type: 'success'
            })
          }
        })
        .catch(error => console.error(error))
    }
  }
}
</script>

<style lang="scss" scoped>
.v-chip.v-size--default {
  height: 2rem;
}

.text-divider {
  margin: 5px;
}
</style>

<template>
  <v-container class="blue-grey darken-4 white--text filter-tab">
    <div class="tab-article">
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
      <p class="text-h5">Erscheinungsjahr</p>
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
      </div>
    </div>
    <div class="tab-article">
      <p class="text-h5">Streaminganbieter</p>
      <div class="tab-article-chips">
        <v-chip
          class="tab-chip"
          text-color="grey lighten-3"
          :color="defaultChipColor(tabFilters.streamingPlatforms)"
          @click="setDefaultChipValue(tabFilters.streamingPlatforms)"
        >
          Alle
        </v-chip>
        <v-chip
          v-for="platform in tabFilters.streamingPlatforms"
          :key="platform.name"
          class="tab-chip"
          text-color="grey lighten-3"
          :color="chipColor(platform)"
          @click="changeChipStatus(platform)"
        >
          {{ platform.name }}
        </v-chip>
      </div>
    </div>
    <div class="tab-article">
      <p class="text-h5">Bewertungsportale</p>
      <div class="tab-article-chips">
        <v-chip
          class="tab-chip"
          text-color="grey lighten-3"
          :color="defaultChipColor(tabFilters.ratingPlatforms)"
          @click="setDefaultChipValue(tabFilters.ratingPlatforms)"
        >
          Alle
        </v-chip>
        <v-chip
          v-for="platform in tabFilters.ratingPlatforms"
          :key="platform.name"
          class="tab-chip"
          text-color="grey lighten-3"
          :color="chipColor(platform)"
          @click="changeChipStatus(platform)"
        >
          {{ platform.name }}
        </v-chip>
      </div>
    </div>
    <div class="tab-article">
      <p class="text-h5">Spoiler zulassen</p>
      <div class="tabl-article-slider">
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
      Update Playlist
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
          { name: 'Mistery', active: false },
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
        streamingPlatforms: [
          { name: 'Netflix', active: false },
          { name: 'Amazon Prime Video', active: false }
        ],
        ratingPlatforms: [
          { name: 'Letterboxd', active: false },
          { name: 'IMDb', active: false }
        ],
        blockSpoilers: 2 // 0: block all, 1: block few, 2: block nothing
      },
      spoilerLabels: ['Keine', 'Leichte Spoiler', 'Alle Spoiler']
    }
  },
  methods: {
    chipColor(filterName) {
      return filterName.active === true ? '#2e9663' : 'grey darken-4'
    },
    changeChipStatus(filterName) {
      filterName.active = !filterName.active
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
      extractedFilters.streamingPlatforms = extractedFilters.streamingPlatforms.filter(
        platform => platform.active === true
      )
      extractedFilters.ratingPlatforms = extractedFilters.ratingPlatforms.filter(
        platform => platform.active === true
      )

      // Use mapping to only include name
      extractedFilters.genres = extractedFilters.genres.map(
        filter => filter.name
      )

      extractedFilters.releaseDates = extractedFilters.releaseDates.map(
        filter => filter.name
      )

      extractedFilters.streamingPlatforms = extractedFilters.streamingPlatforms.map(
        filter => filter.name
      )

      extractedFilters.ratingPlatforms = extractedFilters.ratingPlatforms.map(
        filter => filter.name
      )

      return extractedFilters
    },
    applyFilters() {
      const newFilter = this.extractedFilterStrings()
      this.$store.commit('setActiveFilters', newFilter)
      // Convert the object into a JSON string and store
      window.localStorage.setItem('userMovieFilter', JSON.stringify(newFilter))
    }
  }
}
</script>

<style lang="scss" scoped>
.v-chip.v-size--default {
  height: 28px;
}
</style>

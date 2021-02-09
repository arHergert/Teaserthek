<template>
  <v-container class="blue-grey darken-4 white--text filter-tab">
    <div class="tab-article">
      <p>Genres</p>
      <div class="tab-article-chips">
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
      <p>Erscheinungsjahr</p>
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
      <p>Streaminganbieter</p>
      <div class="tab-article-chips">
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
      <p>Bewertungsportale</p>
      <div class="tab-article-chips">
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
      <p>Spoiler zulassen</p>
      <div class="tabl-article-slider">
        <v-slider
          v-model="tabFilters.blockSpoilers"
          :tick-labels="spoilerLabels"
          :max="2"
          :min="0"
          step="1"
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
      Filter ändern
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tabFilters: {
        genres: [
          { name: 'Alle', active: true },
          { name: 'Drama', active: false },
          { name: 'Thriller', active: false },
          { name: 'Action', active: false },
          { name: 'Sci-Fi', active: false },
          { name: 'Fantasy', active: false },
          { name: 'Romance', active: false },
          { name: 'Horror', active: false },
          { name: 'Comedy', active: false }
        ],
        releaseDates: [
          { name: 'Kommende', active: true },
          { name: 'Schon erschienen', active: false }
        ],
        streamingPlatforms: [
          { name: 'Alle', active: true },
          { name: 'Netflix', active: false }
        ],
        ratingPlatforms: [
          { name: 'Alle', active: true },
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
    }
  }
}
</script>

<style lang="scss" scoped>
$cta-color: #2e9663;

.filter-tab {
  padding: 2em 2.5em;
  .tab-article {
    margin: 0.5em 0 2em 0;

    p {
      margin-bottom: 1em;
    }

    .tab-chip {
      margin-right: 3px;
      margin-bottom: 4px;
    }
  }

  .tab-btn {
    background: linear-gradient(266.76deg, #46d254 1%, #24744e 99.45%);
  }
}

.v-chip.v-size--default {
  height: 28px;
}

.v-slider__tick-label {
  color: white !important;
}
</style>

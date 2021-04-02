<template>
  <v-app>
    <div class="resize-activator" @click="closeTabsWindow()">
      <v-icon>mdi-menu-right</v-icon>
    </div>
    <v-tabs
      fixed-tabs
      dark
      background-color="blue-grey darken-3"
      class="blue-grey darken-4"
    >
      <v-tooltip bottom open-delay="500">
        <template v-slot:activator="{ on, attrs }">
          <v-tab>
            <v-icon v-bind="attrs" dark v-on="on"
              >mdi-tune-vertical-variant</v-icon
            >
          </v-tab>
        </template>
        <span> Filter</span>
      </v-tooltip>
      <v-tooltip bottom open-delay="500">
        <template v-slot:activator="{ on, attrs }">
          <v-tab>
            <v-icon v-bind="attrs" dark v-on="on"
              >mdi-information-outline</v-icon
            >
          </v-tab>
        </template>
        <span> Filminfo</span>
      </v-tooltip>
      <v-tooltip bottom open-delay="500">
        <template v-slot:activator="{ on, attrs }">
          <v-tab>
            <v-icon v-bind="attrs" dark v-on="on">mdi-history</v-icon>
          </v-tab>
        </template>
        <span> Verlauf</span>
      </v-tooltip>
      <v-tooltip bottom open-delay="500">
        <template v-slot:activator="{ on, attrs }">
          <v-tab>
            <v-icon v-bind="attrs" dark v-on="on">mdi-playlist-plus</v-icon>
          </v-tab>
        </template>
        <span> Trailer hinzufügen</span>
      </v-tooltip>

      <v-tab-item><FilterContent /></v-tab-item>
      <v-tab-item><InfoContent /></v-tab-item>
      <v-tab-item><HistoryContent /></v-tab-item>
      <v-tab-item><AddMovieContent /></v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
import AddMovieContent from '~/components/configContent/AddMovieContent'
import FilterContent from '~/components/configContent/FilterContent'
import InfoContent from '~/components/configContent/infoContent/InfoContent'
import HistoryContent from '~/components/configContent/HistoryContent'
export default {
  FilterContent,
  AddMovieContent,
  InfoContent,
  HistoryContent,
  data() {
    return {
      tabs: null
    }
  },
  methods: {
    closeTabsWindow() {
      this.$store.commit('setConfigTabsOpen', false)
    }
  }
}
</script>

<style lang="scss">
$cta-color: #2e9663;

.v-tab {
  .v-icon {
    padding: 10% 35%;
  }
}

.resize-activator {
  height: 100%;
  width: 35px;
  z-index: 1;
  opacity: 0;
  background-color: #192125;
  position: absolute;
  display: flex;
  cursor: pointer;

  &:hover {
    transition: opacity 0.1s cubic-bezier(0, 0, 0.1, 0.1);
    opacity: 0.5;
  }

  .v-icon {
    margin: auto -5px;
    font-size: 3rem;
    color: white;
  }
}

.filter-tab {
  padding: 2em 2.5em;
  .tab-article {
    margin: 0.5em 0 2.5em 0;

    .reverse-margin {
      margin: 2.5em 0 0.5em 0;
    }

    p {
      margin-bottom: 0.5em;
      color: #cfd8dc;
    }

    .tab-chip {
      margin-right: 3px;
      margin-bottom: 4px;
      font-size: 1rem;
    }

    .text-h4 {
      margin-bottom: 1.5em !important;
    }
  }

  .tab-btn {
    margin-top: 2em;
    background: linear-gradient(266.76deg, #46d254 1%, #24744e 99.45%);
  }
}

.lightgrey-color {
  color: #cfd8dc;
}

.theme--light.v-tabs-items,
:root {
  background-color: #263238;
}
</style>

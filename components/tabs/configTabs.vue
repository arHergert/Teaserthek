<template>
  <v-app>
    <v-tabs
      fixed-tabs
      dark
      background-color="blue-grey darken-3"
      class="blue-grey darken-4"
    >
      <v-tab><v-icon>mdi-filter</v-icon></v-tab>
      <v-tab><v-icon>mdi-information</v-icon></v-tab>
      <v-tab><v-icon>mdi-history</v-icon></v-tab>
      <v-tab><v-icon>mdi-playlist-plus</v-icon></v-tab>

      <v-tab-item><FilterContent /></v-tab-item>
      <v-tab-item> Infos </v-tab-item>
      <v-tab-item> Verlauf </v-tab-item>
      <v-tab-item> Hinzufügen </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
import FilterContent from '~/components/configContent/FilterContent'
export default {
  FilterContent,
  data() {
    return {
      tabs: null
    }
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <v-layout>
      <v-flex md9><VideoPlayer /></v-flex>
      <v-flex md3><ConfigTabs /> </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ConfigTabs from '~/components/tabs/ConfigTabs.vue'
import VideoPlayer from '~/components/videoPlayer/VideoPlayer'

export default {
  ConfigTabs,
  VideoPlayer
}
</script>

<style lang="scss" scoped></style>

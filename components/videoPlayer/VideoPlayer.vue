<template>
  <div>
    <v-app v-show="isPlayerReady" class="player">
      <div id="video-overlay"></div>
      <youtube
        ref="youtube"
        :video-id="videoId"
        :player-vars="playerVars"
        :nocookie="true"
        width="100%"
        height="100%"
        @playing="playing"
        @ended="ended"
        @ready="playerReady"
      ></youtube>
    </v-app>
    <v-app v-show="!isPlayerReady" class="player">
      <v-progress-circular
        :size="60"
        :width="6"
        color="grey lighten-3"
        indeterminate
        class="progress"
      ></v-progress-circular>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoId: 'n9xhJrPXop4',
      isPlayerReady: false,
      playerVars: {
        autoplay: 1,
        controls: 1,
        rel: 0,
        fs: 0,
        color: 'white',
        allow: 'autoplay',
        iv_load_policy: 3
      }
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    }
  },
  methods: {
    playerReady() {
      this.isPlayerReady = true
      this.player.playVideo()
    },
    playing() {
      console.log('Video plays!')
      console.log(this.player)
    },
    ended() {
      console.log('Video ended!')
      this.videoId = 'LdOM0x0XDMo'
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  background-color: black;
  margin: auto;
}

.progress {
  margin: auto;
}

#video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8%;
  background-color: black;
}
</style>

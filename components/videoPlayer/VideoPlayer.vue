<template>
  <div>
    <v-app v-show="isPlayerReady" class="player">
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
        showInfo: 0
      }
    }
  },
  methods: {
    removeYoutubeUIElements() {
      if (document.getElementsByClassName('ytp-show-cards-title').length > 0) {
        console.log('--------- Title ist noch da!')
        document.getElementsByClassName(
          'ytp-show-cards-title'
        )[0].style.display = 'none'
      } else {
        console.log('+++++++++ Es ist weg')
      }
    },
    playing() {
      console.log('Video plays!')
      console.log(
        'Title? ',
        document.getElementsByClassName('ytp-show-cards-title')
      )
    },
    ended() {
      console.log('Video ended!')
    },
    playerReady() {
      this.isPlayerReady = true
      console.log('Player ready!', this.$refs.youtube.player)
      this.removeYoutubeUIElements()
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
</style>

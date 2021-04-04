<template>
  <div id="teaserthek">
    <v-app>
      <v-layout>
        <v-flex :class="tabsOpen ? 'md11' : 'md12'"><VideoPlayer /></v-flex>
        <v-flex
          v-if="tabsOpen"
          md3
          class="config-tabs"
          :class="startIdle ? 'start' : ''"
          ><ConfigTabs @click.native="userInteraction()" />
        </v-flex>
      </v-layout>
      <v-snackbar
        right
        :height="350"
        :timeout="this.$store.state.snackbar.timeout"
        :value="this.$store.state.snackbar.show"
        :color="this.$store.state.snackbar.color"
      >
        <div class="snackbar">
          <span class="snackbar-icon">
            {{ this.$store.state.snackbar.icon }}
          </span>
          <span class="snackbar-text">
            {{ this.$store.state.snackbar.text }}
          </span>
        </div>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import ConfigTabs from '~/components/tabs/ConfigTabs.vue'
import VideoPlayer from '~/components/videoPlayer/VideoPlayer'

export default {
  ConfigTabs,
  VideoPlayer,
  data() {
    return {
      tabsWereChecked: false,
      startIdle: true
    }
  },
  computed: {
    tabsOpen() {
      return this.$store.state.videoControls.configTabsOpen
    }
  },
  mounted() {
    // Check 10 seconds after start if mouse is over tabs and hide tabs if not
    setTimeout(this.setTabsIdle, 3000)
  },
  methods: {
    getCurrentTime() {
      return Math.round(new Date().getTime() / 1000)
    },
    setTabsIdle() {
      this.startIdle = false
      setTimeout(this.checkUserInteraction, 5000)
    },
    checkUserInteraction() {
      if (!this.tabsWereChecked) {
        this.setTabsClosed()
      }
    },
    userInteraction() {
      this.tabsWereChecked = true
    },
    setTabsClosed() {
      this.$store.commit('setConfigTabsOpen', false)
    }
  }
}
</script>

<style lang="scss">
.config-tabs {
  filter: brightness(0.3);
  transition: all 2s ease;

  &:hover {
    filter: brightness(1);
    transition: all 0.2s ease;
  }

  &.start {
    filter: brightness(1) !important;
  }
}

.v-snack {
  bottom: 25px;
  right: 43px;
}

.snackbar {
  display: flex;
  justify-content: space-evenly;
  span {
    vertical-align: middle;
  }
}

.snackbar-icon {
  font-size: 30px;
  margin-right: 7px;
}

.snackbar-text {
  font-weight: 600;
  font-size: 16px;
}

.theme--light.v-application {
  background: black;
}
</style>

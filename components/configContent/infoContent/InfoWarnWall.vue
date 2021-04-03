<template>
  <div v-if="!globalInfoWarn && tempInfoWarn" class="info-warn">
    <div class="request-window">
      <p><v-icon>mdi-alert-circle</v-icon></p>
      <p>Informationen können Spoiler enthalten.</p>
      <p>Trotzdem anzeigen?</p>
      <v-btn class="primary-btn" large @click="hideTempWarn()">
        Für diesen Film anzeigen
      </v-btn>
      <v-btn
        class=""
        color="blue-grey lighten-5"
        outlined
        large
        @click="hideAllWarn()"
      >
        Für alle Filme anzeigen
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    globalInfoWarn() {
      return this.$store.state.videoControls.globalnfoWarn
    },
    tempInfoWarn() {
      return this.$store.state.videoControls.tempInfoWarn
    }
  },
  methods: {
    hideTempWarn() {
      this.$store.commit('setTempInfoWarn', false)
    },
    hideAllWarn() {
      this.$store.commit('setGlobalInfoWarn', true)
    }
  }
}
</script>

<style lang="scss" scoped>
$engraved-text-shadow: 0px 1px 0px rgb(187 187 187 / 10%), 0px -1px 0px black;

.info-warn {
  position: absolute;
  display: flex;
  background-color: #232e33;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  box-shadow: 0px -2px 20px 13px #263238 inset;

  .request-window {
    margin: auto;
    height: 490px;
    width: 80%;
    border-radius: 5px;
    padding: 17px 32px;
    text-align: center;
    vertical-align: middle;
    font-weight: 700;
    font-size: 1.75rem;
    background-color: #283b44;
    color: #cfd8dc;
  }

  .v-icon {
    color: #cfd8dc;
    font-size: 8rem;
    text-shadow: $engraved-text-shadow;
  }

  .v-btn {
    margin-top: 2em !important;
    color: #cfd8dc;
    width: 100%;
  }

  .primary-btn {
    background: linear-gradient(266.76deg, #46d254 1%, #24744e 99.45%);
  }
}
</style>

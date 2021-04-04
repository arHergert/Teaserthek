<template>
  <div class="about-section">
    <v-dialog dark transition="dialog-bottom-transition" max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn x-large outlined dark class="about-btn" v-bind="attrs" v-on="on">
          <span class="font-weight-bold">Über Teaserthek</span>
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-card-text>
            <div class="about-section-window pa-12">
              <div class="logo-title">
                <img
                  class="logo"
                  src="~/assets/teaserthek-icon-small-dark.png"
                />
                <span class="font-weight-bold text-h3">Teaserthek</span>
              </div>
              <p class="copyright text-subtitle-1">
                <span>© 2021 Artur Hergert</span>
              </p>
              <div class="tmdb credit-info">
                <img
                  class="tmdb-logo"
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                />
                <span class="tmdb-text text-subtitle-1"
                  >This product uses the TMDb API and JustWatch API but is not
                  endorsed or certified by
                  <a href="https://www.themoviedb.org/" target="_blank">TMDb</a>
                  or
                  <a href="https://www.justwatch.com/" target="_blank"
                    >JustWatch</a
                  >.
                </span>
              </div>
              <div class="credit-info">
                <span class="text-subtitle-1"
                  >Logo von
                  <a href=" https://icons8.de/" target="_blank">icons8.de</a>
                </span>
              </div>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Schließen</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.about-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #263238;
}
.about-section-window {
  background-color: #263238;

  .logo-title,
  .copyright {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin-left: 20px;
      font-size: 1.25em;
      color: #4c636d;
    }
  }
}
.about-btn {
  height: 65px;
  border: none;
  text-transform: none;
  color: #4c636d;
  width: 82%;
  margin-bottom: 2em;
}

.v-card {
  background-color: #263238;
}

.logo {
  max-height: 60px;
}

.credit-info {
  padding: 20px 0px;

  a {
    text-decoration: none;
    font-weight: 600;
    color: #3da775;
  }
}

.tmdb {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.tmdb-logo {
  max-height: 48px;
}

.tmdb-text {
  margin-left: 1.5em;
}
</style>

<template>
  <div class="misc-wrapper">
    <!-- Brand logo-->
    <b-link class="brand-logo">
      <b-img
        src="@/assets/images/logo/logo.png"
        alt="logo"
      />
      <h2 class="brand-text text-primary ml-1">
        Ship2u
      </h2>
    </b-link>
    <!-- /Brand logo-->

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          {{ title }} 🔐
        </h2>
        <p class="mb-2">
          {{ content }}
        </p>
        <b-button
          variant="primary"
          class="mb-1 btn-sm-block"
          :to="loginRoute()"
        >{{ go }}</b-button>
        <b-img
          fluid
          :src="imgUrl"
          alt="Not authorized page"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { BLink, BImg, BButton } from 'bootstrap-vue'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'

export default {
  components: {
    BLink, BImg, BButton,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/not-authorized.svg'),
      title: '',
      content: '',
      go: '',
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/not-authorized-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.$router.currentRoute.params.code)
      store.dispatch('ship2u/activeAccount', { code: this.$router.currentRoute.params.code })
        .then(response => {
          if (response) {
            this.title = 'Congratulations!'
            this.content = 'Your account has been activated. Enjoy!'
            this.go = 'Login Now'
          } else {
            this.title = 'Sorry!'
            this.content = 'For some reasons, your account can not be activated now. Please contact us by email or phone. Thank you.'
            this.go = 'Back to Home'
          }
        })
    },
    loginRoute() {
      const user = JSON.parse(sessionStorage.getItem('userData'))
      return getHomeRouteForLoggedInUser(user ? user.role : null)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>

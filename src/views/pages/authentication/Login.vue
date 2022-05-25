<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <b-img
          :src="logoUrl"
          width="100"
          height="50"
          alt="logo"
        />
        <h2 class="brand-text text-primary ml-1" />
        <b-dropdown
          id="lang"
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          name="lang"
          block
          split
          right
          split-variant="outline-primary"
          variant="outline-primary"
        >
          <template #button-content>
            <b-img
              :src="currentLocale.img"
              height="14px"
              width="22px"
              :alt="currentLocale.locale"
            />
            <span class="ml-50 text-body">{{ currentLocale.name }}</span>
          </template>
          <b-dropdown-item
            v-for="localeObj in locales"
            :key="localeObj.locale"
            @click="ChangeLanguage(localeObj)"
          >
            <b-img
              :src="localeObj.img"
              height="14px"
              width="22px"
              :alt="localeObj.locale"
            />
            <span class="ml-50">{{ localeObj.name }}</span>
          </b-dropdown-item>
        </b-dropdown>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login abc"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-row
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-row>
            <b-col md="6" />
            <b-col md="6" />

          </b-row>
          <br><br><br>
          <b-card-title
            class="mb-1 font-weight-bold"
            title-tag="h2"
          >
            {{ $t('Welcome to') }} 👋
          </b-card-title>
          <b-card-text class="mb-2" />

          <!-- form -->
          <validation-observer
            ref="loginForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent="login"
            >
              <!-- email -->
              <b-form-group
                :label="$t('Email')"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">{{ $t('Password') }}</label>
                  <b-link :to="{name:'auth-forgot-password'}">
                    <small>{{ $t('Forgot Password?') }}</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  {{ $t('Remember Me') }}
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid"
              >
                {{ $t('Sign in') }}
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>{{ $t('New on our platform?') }} </span>
            <b-link :to="{name:'auth-register'}">
              <span>&nbsp;{{ $t('Create an account') }}</span>
            </b-link>
          </b-card-text>
        </b-col>
        <!-- /Login-->
      </b-row>
    </b-row></div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BDropdown, BDropdownItem, BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, VBTooltip,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import Ripple from 'vue-ripple-directive'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  components: {
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      logoUrl: null,
      company: null,
      status: '',
      password: '',
      userEmail: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),

      // validation rules
      required,
      email,
      locales: [
        {
          locale: 'en',
          img: require('@/assets/images/flags/en.png'),
          name: 'English',
        },
        {
          locale: 'ko',
          img: require('@/assets/images/flags/ko.png'),
          name: 'Korean',
        },
        {
          locale: 'zh_CN',
          img: require('@/assets/images/flags/cn.png'),
          name: 'China',
        },
      ],
    }
  },
  computed: {
    currentLocale() {
      if (localStorage.getItem('language')) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.$i18n.locale = localStorage.getItem('language')
      }
      return this.locales.find(l => l.locale === this.$i18n.locale)
    },
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  created() {
    this.getLogo()
  },
  methods: {
    ChangeLanguage(localeObj) {
      console.log('localeObj.locale', localeObj.locale)
      this.$i18n.locale = localeObj.locale
      localStorage.setItem('language', localeObj.locale)
    },
    async getLogo() {
      if (this.$store.state.ship2u.company) {
        this.company = this.$store.state.ship2u.company
      } else {
        this.company = await store.dispatch('ship2u/company')
      }
      if (this.company) {
        this.logoUrl = store.state.ship2u.apiHost + this.company.logo
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.logoUrl = require('@/assets/images/logo/logo.png')
      }
    },
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          store.dispatch('ship2u/login', {
            email: this.userEmail,
            password: this.password,
          })
            .then(response => {
              console.log(response)
              const { status, userData } = response
              if (status === 200) {
                sessionStorage.setItem('userData', JSON.stringify(userData))
                this.$ability.update(userData.ability)

                // ? This is just for demo purpose as well.
                // ? Because we are showing eCommerce app's cart items count in navbar
                // this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', userData.extras.eCommerceCartItemsCount)

                // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
                this.$router.push(getHomeRouteForLoggedInUser(userData.role))
                  .then(async () => {
                    await store.dispatch('ship2u/parcels', { forceRefresh: true })
                    await store.dispatch('ship2u/orders')
                    this.$toast({
                      component: ToastificationContent,
                      position: 'top-right',
                      props: {
                        title: `${this.$i18n.t('Welcome')} ${userData.fullName || userData.username}`,
                        icon: 'CoffeeIcon',
                        variant: 'success',
                        text: `${this.$i18n.t('You have successfully logged in as ')}${this.$i18n.t(userData.role)}.${this.$i18n.t('Now you can start to explore!')}`,
                      },
                    })
                  })
                  .catch(error => {
                  // this.$refs.loginForm.setErrors(error.response.data.error)
                    console.log(error)
                  })
              } else if (status === 400) {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: 'login fail',
                    icon: 'CoffeeIcon',
                    variant: 'warning',
                    text: response.error.msg,
                  },
                })
              }
              // useJwt.setToken(response.data.accessToken)
              // useJwt.setRefreshToken(response.data.refreshToken)
            }).catch(e => {
              console.log('e', e)
              // console.log(e.response.data.error.msg)
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>

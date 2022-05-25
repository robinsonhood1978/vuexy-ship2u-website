<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <b-img
          src="@/assets/images/logo/logo.png"
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
            @click="$i18n.locale = localeObj.locale"
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
            alt="Register V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title class="mb-1">
            {{ $t('Reset Password') }} 🚀
          </b-card-title>
          <b-media-body>
            {{ $t(title) }}
          </b-media-body>
          <!-- form -->
          <validation-observer
            ref="resetpwdForm"
            #default="{invalid}"
          >
            <b-form
              v-if="show"
              class="auth-register-form mt-2"
              @submit.prevent="resetpwd"
            >

              <!-- password -->
              <b-form-group
                label-for="register-password"
                :label="$t('Password')"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="Password"
                  rules="required|password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false:null"
                      name="register-password"
                      placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- re-password -->
              <b-form-group
                label-for="re-password"
                :label="$t('Confirm Password')"
              >
                <validation-provider
                  #default="{ errors }"
                  name="PasswordConfirm"
                  vid="PasswordConfirm"
                  rules="required|confirmed:Password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="re-password"
                      v-model="passwordCon"
                      class="form-control-merge"
                      name="re-password"
                      type="password"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Confirm Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                :disabled="invalid"
              >
                {{ $t('Submit') }}
              </b-button>
            </b-form>
          </validation-observer>

        </b-col>
      </b-col>
    <!-- /Register-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  VBTooltip, BDropdown, BDropdownItem, BForm, BLink, BImg, BButton, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BRow, BCol, BCardTitle, BMediaBody,
} from 'bootstrap-vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import { required } from '@validations'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  components: {
    BDropdown,
    BDropdownItem,
    BForm,
    BFormGroup,
    BLink,
    BImg,
    BButton,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BRow,
    BCol,
    BMediaBody,
    BCardTitle,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      downImg: require('@/assets/images/pages/not-authorized.svg'),
      code: '',
      show: true,
      title: '',
      password: '',
      passwordCon: '',
      required,
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
      return this.locales.find(l => l.locale === this.$i18n.locale)
    },
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
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
    resetpwd() {
      console.log(this.$i18n.locale)
      this.$refs.resetpwdForm.validate().then(success => {
        if (success) {
          console.log(this.password)
          store.dispatch('ship2u/resetpwd', {
            pwd: this.password, code: this.code,
          })
            .then(r => {
              if (r) {
                this.$bvModal.msgBoxOk(this.$i18n.t('Reset password successfully'), {
                  title: this.$i18n.t('Confirmation'),
                  okTitle: this.$i18n.t('OK'),
                  okVariant: 'success',
                  headerClass: 'p-2 border-bottom-0',
                  footerClass: 'p-2 border-top-0',
                })
                  .then(() => {
                    this.$router.push({ name: 'auth-login' })
                  })
                  .catch(err => {
                    console.log(err)
                  })
              } else {
                this.$bvModal.msgBoxOk(this.$i18n.t('Reset password failed. Please check your net connection and try again.'), {
                  title: this.$i18n.t('Confirmation'),
                  okTitle: this.$i18n.t('OK'),
                  okVariant: 'alert',
                  headerClass: 'p-2 border-bottom-0',
                  footerClass: 'p-2 border-top-0',
                })
              }
            })
            .catch(error => {
              console.log(error)
              this.$refs.registerForm.setErrors(error.response.data.error)
            })
        }
      })
    },
    init() {
      this.code = this.$router.currentRoute.params.code
      // console.log(this.$router.currentRoute.params.code)
      store.dispatch('ship2u/verifyEmail', { code: this.code })
        .then(response => {
          if (response) {
            this.show = true
            this.title = 'Now you can reset your password.'
          } else {
            this.show = false
            this.title = 'Unauthorized access. Identity authentication failed.'
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
@import '@core/scss/vue/pages/page-auth.scss';
</style>

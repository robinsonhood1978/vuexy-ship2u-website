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
            {{ $t('Register') }} 🚀
          </b-card-title>
          <!-- form -->
          <validation-observer
            ref="registerForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-register-form mt-2"
              @submit.prevent="register"
            >

              <b-form-group
                :label="$t('Preferred Language')"
                label-for="lang"
              >
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

              </b-form-group>
              <!-- email -->
              <b-form-group
                :label="$t('Email')"
                label-for="register-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="register-email"
                    v-model="userEmail"
                    name="register-email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

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

              <b-row>
                <b-col md="6">
                  <b-form-group
                    :label="$t('First Name')"
                    label-for="mc-first-name"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="First Name"
                      rules="required"
                    >
                      <b-form-input
                        id="mc-first-name"
                        v-model="firstName"
                        :state="errors.length > 0 ? false:null"
                        placeholder="First Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group
                    :label="$t('Last Name')"
                    label-for="mc-last-name"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Last Name"
                      rules="required"
                    >
                      <b-form-input
                        id="mc-last-name"
                        v-model="lastName"
                        :state="errors.length > 0 ? false:null"
                        placeholder="Last Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-form-group
                :label="$t('Phone Number')"
                label-for="phone"
              >
                <b-input-group>
                  <b-input-group-prepend is-text>
                    NZ (+64)
                  </b-input-group-prepend>
                  <cleave
                    id="phone"
                    v-model="phone"
                    class="form-control"
                    :raw="false"
                    :options="options.phone"
                    placeholder="02x xxx xxxxx"
                  />
                </b-input-group>

              </b-form-group>

              <b-form-group>
                <ValidationProvider
                  #default="{ errors }"
                  name="Terms"
                  :rules="{ required: { allowFalse: false } }"
                >
                  <b-form-checkbox
                    id="register-privacy-policy"
                    v-model="status"
                    name="terms"
                  >
                    {{ $t('I agree to') }}
                    <b-link>{{ $t('privacy policy & terms') }}</b-link>
                  </b-form-checkbox>
                  <span
                    v-show="errors[0]"
                    class="help text-danger"
                  >{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                :disabled="invalid"
              >
                {{ $t('Sign up') }}
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>{{ $t('Already have an account?') }}</span>
            <b-link :to="{name:'auth-login'}">
              <span>&nbsp;{{ $t('Sign in instead') }}</span>
            </b-link>
          </p>
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
  BDropdown, BDropdownItem,
  BRow, BCol, BLink, BButton, BForm, BFormCheckbox, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BInputGroupPrepend, BImg, BCardTitle,
} from 'bootstrap-vue'
import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.nz'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
// import Locale from '@/@core/layouts/components/app-navbar/components/Locale.vue'

export default {
  components: {
    BDropdown,
    BDropdownItem,
    Cleave,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    // validations
    ValidationProvider,
    ValidationObserver,
    // Locale,
  },
  directives: {
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      logoUrl: null,
      status: false,
      username: '',
      userEmail: '',
      password: '',
      passwordCon: '',
      phone: '',
      firstName: '',
      lastName: '',
      sideImg: require('@/assets/images/pages/register-v2.svg'),
      // validation
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
      options: {
        phone: {
          phone: true,
          phoneRegionCode: 'NZ',
        },
      },
    }
  },
  computed: {
    currentLocale() {
      // console.log('language', localStorage.getItem('language'))
      // console.log('$i18n.locale', this.$i18n.locale)
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
        this.sideImg = require('@/assets/images/pages/register-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  mounted() {
    // console.log(this.$i18n)
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
    register() {
      console.log(this.$i18n.locale)
      this.$refs.registerForm.validate().then(success => {
        if (success) {
          const tel = this.phone.replace(/\s*/g, '')
          store.dispatch('ship2u/register', {
            email: this.userEmail, password: this.password, first_name: this.firstName, last_name: this.lastName, tel, lang: this.$i18n.locale,
          })
            .then(r => {
              console.log(r)
              if (r.code === 0) {
                this.$bvModal.msgBoxOk(this.$i18n.t('Registered successfully'), {
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
                this.$bvModal.msgBoxOk(this.$i18n.t(r.msg), {
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
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>

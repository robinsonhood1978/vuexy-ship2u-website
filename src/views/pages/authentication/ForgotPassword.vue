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
            alt="Forgot password V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Forgot password-->
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
            {{ $t('Forgot Password') }}? 🔒
          </b-card-title>
          <b-card-text class="mb-2">
            {{ $t('Enter your email and we\'ll send you instructions to reset your password') }}
          </b-card-text>

          <!-- form -->
          <validation-observer ref="simpleRules">
            <b-form
              class="auth-forgot-password-form mt-2"
              @submit.prevent="validationForm"
            >
              <b-form-group
                :label="$t('Email')"
                label-for="forgot-password-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="forgot-password-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="forgot-password-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                block
              >
                {{ $t('Send reset link') }}
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <b-link :to="{name:'auth-login'}">
              <feather-icon icon="ChevronLeftIcon" /> {{ $t('Back to login') }}
            </b-link>
          </p>
        </b-col>
      </b-col>
      <!-- /Forgot password-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  VBTooltip, BDropdown, BDropdownItem, BRow, BCol, BLink, BCardTitle, BCardText, BImg, BForm, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BImg,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BCardTitle,
    BCardText,
    BDropdown,
    BDropdownItem,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      logoUrl: null,
      userEmail: '',
      sideImg: require('@/assets/images/pages/forgot-password-v2.svg'),
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
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/forgot-password-v2-dark.svg')
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
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          console.log(this.userEmail)
          store.dispatch('ship2u/forgotPwd', { email: this.userEmail })
            .then(response => {
              console.log(response)
              if (response) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: this.$i18n.t('Please check out your mailbox and follow the instruction of email to reset your password.'),
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: this.$i18n.t('Error occurred.'),
                    icon: 'EditIcon',
                    variant: 'warning',
                  },
                })
              }
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

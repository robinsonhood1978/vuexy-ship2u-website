<template>
  <validation-observer
    ref="registerForm"
    #default="{invalid}"
  >
    <section class="parcel-add-wrapper">

      <b-row
        class="parcel-add"
      >

        <!-- Col: Left (Parcel Container) -->
        <b-col
          cols="12"
          xl="9"
          md="8"
        >
          <b-form @submit.prevent>
            <b-card
              no-body
              class="parcel-preview-card"
            >
              <!-- Header -->
              <b-card-body class="parcel-padding pb-0">
                <b-row>
                  <b-col cols="12">
                    <validation-observer
                      ref="resetpwdForm"
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

                    </validation-observer>
                  </b-col>
                </b-row></b-card-body>

            </b-card>
          </b-form>

        </b-col>

        <!-- Right Col: Card -->
        <b-col
          cols="12"
          md="4"
          xl="3"
          class="parcel-actions"
        >

          <!-- Action Buttons -->
          <b-card>

            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="primary"
              block
              :disabled="invalid || pressed"
              @click="resetpwd"
            >
              {{ $t('Save') }}
            </b-button>

          </b-card>
        </b-col>
      </b-row>
    </section>
  </validation-observer>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
// import router from '@/router'
import {
  BInputGroup, BFormGroup, BInputGroupAppend, BRow, BCol, BCard, BCardBody, BButton, BForm, BFormInput, VBToggle,
} from 'bootstrap-vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'

export default {
  components: {
    BInputGroup,
    BFormGroup,
    BInputGroupAppend,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BButton,
    BForm,
    BFormInput,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      pressed: false,
      password: '',
      passwordCon: '',
      required,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },

  // Reset Tr Height if data changes
  watch: {
  },
  mounted() {
  },
  created() {
  },
  destroyed() {
  },
  methods: {
    resetpwd() {
      this.$refs.resetpwdForm.validate().then(success => {
        if (success) {
          console.log(this.password)
          store.dispatch('ship2u/modifyPwd', {
            pwd: this.password,
          })
            .then(r => {
              if (r.code === 0) {
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
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-parcel.scss";

.form-item-section {
background-color:$product-details-bg;
}

.form-item-action-col {
  width: 27px;
}

.repeater-form {
  // overflow: hidden;
  transition: .35s height;
}

.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}

.dark-layout {
  .form-item-section {
    background-color: $theme-dark-body-bg;

    .row .border {
      background-color: $theme-dark-card-bg;
    }

  }
}
</style>

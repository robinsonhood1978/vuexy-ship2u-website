<template>
  <validation-observer
    ref="registerForm"
    #default="{invalid}"
  >
    <section class="parcel-add-wrapper">
      <!-- Alert: No item found -->
      <b-alert
        variant="danger"
        :show="parcelData === undefined"
      >
        <h4 class="alert-heading">
          Error fetching parcel data
        </h4>
        <div class="alert-body">
          No parcel found with this parcel id. Check
          <b-link
            class="alert-link"
            :to="{ name: 'ship2u-parcel-list'}"
          >
            Parcel List
          </b-link>
          for other parcels.
        </div>
      </b-alert>

      <b-row
        v-if="parcelData"
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
                    <div class="logo-wrapper">
                      <span class="brand-logo">
                        <!-- <b-img
                          :src="appLogoImage"
                          alt="logo"
                        /> -->
                      </span>
                      <h3 class="text-primary parcel-logo">
                        <br>
                      </h3>
                    </div>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group
                      :label="`${$t('title')}`"
                      label-for="h-first-name"
                      label-cols-md="4"
                    >
                      <validation-provider
                        #default="{ errors }"
                        :name="$t('title')"
                        rules="required"
                      >
                        <b-input-group>
                          <template #prepend>
                            <b-input-group-text><strong class="text-danger">*</strong></b-input-group-text>
                          </template>
                          <b-form-input
                            id="title"
                            v-model="parcelData.title"
                            :state="errors.length > 0 ? false:null"
                            placeholder="Normal Input"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group
                      :label="$t('Transportation')"
                      label-cols-md="4"
                    >
                      <b-input-group>
                        <template #prepend>
                          <b-input-group-text><strong class="text-danger">*</strong></b-input-group-text>
                        </template>
                        <v-select
                          v-model="$store.state.ship2u.freightType"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :options="ftypes"
                          label="title"
                          @input="setFreightType"
                        >
                          <template #option="{ title, icon }">
                            <feather-icon
                              :icon="icon"
                              size="16"
                              class="align-middle mr-50"
                            />
                            <span> {{ title }}</span>
                          </template>
                        </v-select>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group
                      :label="$t('Local Courier Number')"
                      label-for="h-email"
                      label-cols-md="4"
                    >
                      <validation-provider
                        #default="{ errors }"
                        :name="$t('Local Courier Number')"
                        rules="required"
                      >
                        <b-input-group>
                          <template #prepend>
                            <b-input-group-text><strong class="text-danger">*</strong></b-input-group-text>
                          </template>
                          <b-form-input
                            id="lcno"
                            v-model="parcelData.local_courier_number"
                            :state="errors.length > 0 ? false:null"
                            placeholder="Normal Input"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group
                      :label="$t('Local Courier Name')"
                      label-for="h-first-name"
                      label-cols-md="4"
                    >
                      <b-form-input
                        id="lcname"
                        v-model="parcelData.local_courier_name"
                        placeholder="Normal Input"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-card-actions
                      :title="$t('Show Advanced')"
                      action-collapse
                      :collapsed="true"
                    >
                      <b-col cols="12">
                        <b-form-group
                          label="Expected Receiving Date"
                          label-for="h-email"
                          label-cols-md="4"
                        >
                          <flat-pickr
                            v-model="parcelData.signin_time"
                            class="form-control"
                            :config="{ enableTime: true,dateFormat: 'Y-m-d H:i'}"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col cols="12">
                        <b-form-group
                          :label="$t('Number of Items')"
                          label-for="h-first-name"
                          label-cols-md="4"
                        >
                          <b-input-group :append="$t('Pieces')">
                            <b-form-input
                              id="pieces"
                              v-model="parcelData.pieces"
                              placeholder="Normal Input"
                            />
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                      <b-col cols="12">
                        <b-form-group
                          :label="$t('Volume')"
                          label-for="h-email"
                          label-cols-md="4"
                        >
                          <b-input-group append="M3">
                            <b-form-input
                              id="volume"
                              v-model="parcelData.volume"
                              placeholder="Normal Input"
                            />
                          </b-input-group>
                        </b-form-group>
                      </b-col>

                      <b-col cols="12">
                        <b-form-group
                          :label="$t('Weight')"
                          label-for="h-first-name"
                          label-cols-md="4"
                        >
                          <b-input-group append="KG">
                            <b-form-input
                              id="weight"
                              v-model="parcelData.weight"
                              placeholder="Normal Input"
                            />
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                    </b-card-actions>
                  </b-col>
                </b-row></b-card-body>

              <!-- Spacer -->
              <hr class="parcel-spacing">

              <!-- Items Section -->
              <b-card no-body>
                <b-card-body>
                  <b-card-title>{{ $t('Clearance Items') }}</b-card-title>
                  <b-card-sub-title>{{ $t('Clearance Items Info') }}</b-card-sub-title>
                </b-card-body>
                <b-card-body class="parcel-padding form-item-section">
                  <div
                    ref="form"
                    class="repeater-form"
                    :style="{height: trHeight}"
                  >
                    <b-row
                      v-for="(item, index) in parcelData.orderdetail_set"
                      :key="index"
                      ref="row"
                      class="pb-2"
                    >

                      <!-- Item Form -->
                      <!-- ? This will be in loop => So consider below markup for single item -->
                      <b-col cols="12">

                        <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                        <div class="d-none d-lg-flex">
                          <b-row class="flex-grow-1 px-1">
                            <!-- Single Item Form Headers -->
                            <b-col
                              cols="12"
                              lg="3"
                            >
                              {{ $t('Item Name') }}
                            </b-col>
                            <b-col
                              cols="12"
                              lg="3"
                            >
                              {{ $t('Material') }}
                            </b-col>
                            <b-col
                              cols="12"
                              lg="2"
                            >
                              {{ $t('Unit Price') }}
                            </b-col>
                            <b-col
                              cols="12"
                              lg="2"
                            >
                              {{ $t('Pieces') }}
                            </b-col>
                            <b-col
                              cols="12"
                              lg="2"
                            >
                              {{ $t('Total Price') }}
                            </b-col>
                          </b-row>
                          <div class="form-item-action-col" />
                        </div>

                        <!-- Form Input Fields OR content inside bordered area  -->
                        <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                        <div class="d-flex border rounded">
                          <b-row class="flex-grow-1 p-2">
                            <!-- Single Item Form Headers -->
                            <b-col
                              cols="12"
                              lg="3"
                            >
                              <!-- <b-form-input
                                v-model="item.title"
                                class="mb-2"
                              /> -->
                              <vue-autosuggest
                                :suggestions="filteredOptions"
                                :limit="100"
                                :input-props="{id:'autosuggest_'+index,class:'form-control'}"
                                :get-suggestion-value="getSuggestionValue"
                                @input="onInputChange"
                                @focus="onFocus"
                              >
                                <template slot-scope="{suggestion}">
                                  <span class="my-suggestion-item">{{ suggestion.item.title }}</span>
                                </template>
                              </vue-autosuggest>
                            </b-col>
                            <b-col
                              cols="12"
                              lg="3"
                            >
                              <!-- <b-form-input
                                v-model="item.reference"
                                class="mb-2"
                              /> -->
                              <vue-autosuggest
                                :suggestions="filteredOptions2"
                                :limit="100"
                                :input-props="{id:'autosuggest2_'+index,class:'form-control'}"
                                :get-suggestion-value="getSuggestionValue2"
                                @input="onInputChange2"
                                @focus="onFocus2"
                              >
                                <template slot-scope="{suggestion}">
                                  <span class="my-suggestion-item">{{ suggestion.item.material }}</span>
                                </template>
                              </vue-autosuggest>
                            </b-col>
                            <b-col
                              cols="12"
                              lg="2"
                            >
                              <b-form-input
                                v-model="item.price"
                                type="number"
                                class="mb-2"
                                @update="priceUpdate"
                              />
                            </b-col>
                            <b-col
                              cols="12"
                              lg="2"
                            >
                              <b-form-input
                                v-model="item.quantity"
                                type="number"
                                class="mb-2"
                                @update="quantityUpdate"
                              />
                            </b-col>
                            <b-col
                              cols="12"
                              lg="2"
                            >
                              <b-form-input
                                v-model="item.subtotal"
                                type="number"
                                class="mb-2"
                                @update="subtotalUpdate"
                              />
                            </b-col>
                          </b-row>
                          <div class="d-flex flex-column justify-content-between border-left py-50 px-25">
                            <feather-icon
                              size="16"
                              icon="XIcon"
                              class="cursor-pointer"
                              @click="removeItem(index)"
                            />
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    size="sm"
                    variant="primary"
                    @click="addNewItemInItemForm"
                  >
                    {{ $t('Add Item') }}
                  </b-button>
                </b-card-body>
              </b-card>

              <!-- Parcel Description: Total -->
              <b-card-body class="parcel-padding pb-0">
                <b-row>

                  <!-- Col: Sales Persion -->
                  <b-col
                    cols="12"
                    md="6"
                    class="mt-md-0 mt-3"
                    order="2"
                    order-md="1"
                  />

                  <!-- Col: Total -->
                  <b-col
                    cols="12"
                    md="6"
                    class="mt-md-6 d-flex justify-content-end"
                    order="1"
                    order-md="2"
                  >
                    <div class="parcel-total-wrapper">
                      <hr class="my-50">
                      <div class="parcel-total-item">
                        <p class="parcel-total-title">
                          {{ $t('Total') }}:
                        </p>
                        <p class="parcel-total-amount">
                          {{ totalPrice }}
                        </p>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>

              <!-- Spacer -->
              <hr class="parcel-spacing">

              <!-- Note -->
              <b-card-body class="parcel-padding pt-0">
                <span class="font-weight-bold">{{ $t('Customer Note') }}: </span>
                <b-form-textarea v-model="parcelData.customer_note" />
              </b-card-body>
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
              @click="onPostParcel"
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
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
/* eslint-disable global-require */
import { VueAutosuggest } from 'vue-autosuggest'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import { $themeConfig } from '@themeConfig'
import { ref, computed } from '@vue/composition-api'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import flatPickr from 'vue-flatpickr-component'
import store from '@/store'
// import router from '@/router'
import {
  BInputGroup, BInputGroupText, BFormGroup, BRow, BCol, BCard, BCardTitle, BCardSubTitle, BCardBody, BButton, BForm, BFormInput, BFormTextarea, BAlert, BLink, VBToggle,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCardActions,
    VueAutosuggest,
    BInputGroup,
    BInputGroupText,
    BFormGroup,
    flatPickr,
    BRow,
    BCol,
    BCard,
    BCardTitle,
    BCardSubTitle,
    BCardBody,
    BButton,
    BForm,
    BFormInput,
    BFormTextarea,
    BAlert,
    BLink,
    ValidationProvider,
    ValidationObserver,
    vSelect,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  mixins: [heightTransition],
  data() {
    return {
      currentIndex: 0,
      currentIndex2: 0,
      pressed: false,
      ftypes: [
        {
          title: 'Ocean Freight',
          icon: 'ApertureIcon',
          code: 'S',
        },
        {
          title: 'Air Freight',
          icon: 'CodepenIcon',
          code: 'F',
        },
      ],
    }
  },

  // Reset Tr Height if data changes
  watch: {
    // eslint-disable-next-line func-names
    'parcelData.orderdetail_set': function () {
      this.initTrHeight()
    },
  },
  mounted() {
    this.addNewItemInItemForm()
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
    // this.$http.get('/autosuggest/data')
    //   .then(res => { this.datasuggest = res })
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    quantityUpdate() {
      this.parcelData.orderdetail_set[this.currentIndex].subtotal = this.parcelData.orderdetail_set[this.currentIndex].price * this.parcelData.orderdetail_set[this.currentIndex].quantity
    },
    subtotalUpdate() {
      this.parcelData.orderdetail_set[this.currentIndex].price = (this.parcelData.orderdetail_set[this.currentIndex].subtotal / this.parcelData.orderdetail_set[this.currentIndex].quantity).toFixed(2)
    },
    priceUpdate() {
      this.parcelData.orderdetail_set[this.currentIndex].subtotal = this.parcelData.orderdetail_set[this.currentIndex].price * this.parcelData.orderdetail_set[this.currentIndex].quantity
    },
    getSuggestionValue(suggestion) {
      this.parcelData.orderdetail_set[this.currentIndex].title = suggestion.item.title
      // console.log(suggestion)
      return suggestion.item.title
    },
    getSuggestionValue2(suggestion) {
      this.parcelData.orderdetail_set[this.currentIndex2].reference = suggestion.item.material
      return suggestion.item.material
    },
    onFocus(e) {
      const autosuggestId = e.target.id
      // eslint-disable-next-line prefer-destructuring
      this.currentIndex = parseInt(autosuggestId.split('_')[1], 10)
    },
    onFocus2(e) {
      console.log(e.target.id)
      const autosuggestId = e.target.id
      // eslint-disable-next-line prefer-destructuring
      this.currentIndex2 = parseInt(autosuggestId.split('_')[1], 10)
      console.log('robin', this.currentIndex2)
    },
    onInputChange(text) {
      if (text === '' || text === undefined) {
        return
      }
      /* Full control over filtering. Maybe fetch from API?! Up to you!!! */
      const filteredTitles = this.datasuggest.titles.filter(item => item.title.toLowerCase().indexOf(text.toLowerCase()) > -1)
      this.filteredOptions = [{
        data: filteredTitles,
      }]
    },
    onInputChange2(text) {
      if (text === '' || text === undefined) {
        return
      }
      /* Full control over filtering. Maybe fetch from API?! Up to you!!! */
      const filteredMaterials = this.datasuggest.materials.filter(item => item.material.toLowerCase().indexOf(text.toLowerCase()) > -1)
      this.filteredOptions2 = [{
        data: filteredMaterials,
      }]
    },
    setFreightType(value) {
      console.log(value)
      if (value) {
        // store.commit('ship2u/setFreightType', value)
      }
    },
    addNewItemInItemForm() {
      this.$refs.form.style.overflow = 'hidden'
      this.parcelData.orderdetail_set.push(JSON.parse(JSON.stringify(this.itemFormBlankItem)))

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
        setTimeout(() => {
          this.$refs.form.style.overflow = null
        }, 350)
      })
    },
    removeItem(index) {
      this.parcelData.orderdetail_set.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form ? this.$refs.form.scrollHeight : 0)
      })
    },
  },
  setup() {
    const datasuggest = ref({})
    const filteredOptions = ref([])
    const filteredOptions2 = ref([])
    const { appLogoImage } = $themeConfig.app
    const parcelData = ref({
      state: 'D',
      customer_add: true,
      title: '',
      signin_time: '',
      local_courier_name: '',
      local_courier_number: '',
      pieces: 0,
      volume: 0,
      weight: 0,
      customer_note: '',
      orderdetail_set: [],
    })

    const itemFormBlankItem = {
      title: null,
      reference: '',
      price: 0,
      quantity: 0,
      subtotal: 0,
    }

    const totalPrice = computed(() => {
      let total = 0
      parcelData.value.orderdetail_set.forEach(i => {
        total += (parseFloat(i.subtotal) || 0)
      })

      return total.toFixed(2)
    })

    const formData = computed(() => {
      const data = {
        // title: parcelData.value.title,
        // customer_note: parcelData.value.customer_note,
        ...parcelData.value,
        freight_type: store.state.ship2u.freightType ? store.state.ship2u.freightType.code : 'S',
        titles: [],
        prices: [],
        quantities: [],
        totals: [],
        materials: [],
      }
      parcelData.value.orderdetail_set.forEach(i => {
        data.titles.push(i.title)
        data.prices.push(i.price)
        data.quantities.push(i.quantity)
        data.materials.push(i.reference)
        data.totals.push(i.subtotal)
      })
      data.titles = JSON.stringify(data.titles)
      data.prices = JSON.stringify(data.prices)
      data.quantities = JSON.stringify(data.quantities)
      data.materials = JSON.stringify(data.materials)
      data.totals = JSON.stringify(data.totals)
      return data
    })

    store.dispatch('ship2u/parcelNames')
      .then(res => {
        if (res.obj) {
          datasuggest.value = res.obj
          filteredOptions.value = [{
            data: res.obj.titles,
          }]
          filteredOptions2.value = [{
            data: res.obj.materials,
          }]
          // console.log(promotions.value)
        }
      })

    function onPostParcel(e) {
      this.pressed = true
      console.log('e', e)
      console.log(formData.value)
      console.log(parcelData.value)
      if (!store.state.ship2u.freightType) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Please choose Transportation.',
            icon: 'EditIcon',
            variant: 'warning',
          },
        })
      } else {
        // 将运输方式存入state
        store.dispatch('ship2u/saveParcel', { obj: formData.value, parcel: parcelData.value })
          .then(response => {
            console.log(response)
            this.$bvModal.msgBoxOk('Data was submitted successfully', {
              title: 'Confirmation',
              okVariant: 'success',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
            })
              .then(() => {
                this.$router.go(-1)
                this.pressed = false
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(error => {
            if (error.response.status === 404) {
              parcelData.value = undefined
            }
          })
      }
    }

    return {
      datasuggest,
      filteredOptions,
      filteredOptions2,
      required,
      parcelData,
      totalPrice,
      onPostParcel,
      itemFormBlankItem,
      appLogoImage,
    }
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
<style lang="scss">
@import '@core/scss/vue/libs/vue-autosuggest.scss';
</style>

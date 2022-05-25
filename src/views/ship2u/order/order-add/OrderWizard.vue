<template>
  <div>
    <form-wizard
      ref="wizard"
      color="#7367F0"
      :title="null"
      :subtitle="null"
      class="steps-transparent mb-3"
      @on-change="tabChange"
    >
      <!-- account detail tab -->
      <b-row>
        <b-col cols="12">
          <brief-group
            v-if="currentStep>0"
            :key="briefKey"
            :items="bItems"
            :tab="currentStep"
          />
        </b-col>
      </b-row>
      <tab-content
        :title="$t('Type')"
        icon="feather icon-file-text"
        :before-change="validationType"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              {{ $t('Freight Order Type') }}
            </h5>
            <small class="text-muted">
              {{ $t('Choose Your Freight Order Type.') }}
            </small>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <div class="demo-vertical-spacing">
                <b-form-radio
                  v-model="order.freight_type"
                  name="some-radios"
                  value="S"
                >
                  {{ $t('Ocean Shipping') }}
                </b-form-radio>
                <b-form-radio
                  v-model="order.freight_type"
                  name="some-radios"
                  value="F"
                >
                  {{ $t('Air Transport') }}
                </b-form-radio>
                <b-form-radio
                  v-model="order.freight_type"
                  name="some-radios"
                  value="C"
                >
                  {{ $t('Return') }}
                </b-form-radio>

              </div>
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- personal details -->
      <tab-content
        :title="$t('Parcels')"
        icon="feather icon-user"
        :before-change="validationParcel"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              {{ $t('Parcels') }}
            </h5>
            <small class="text-muted">{{ $t('Choose Your Parcels.') }}</small>
          </b-col>
          <b-col md="12">
            <check-parcel @changeOrderParcels="changeParcel" />
          </b-col>
        </b-row>
      </tab-content>

      <!-- address -->
      <tab-content
        :title="$t('Address')"
        icon="feather icon-map-pin"
        :before-change="validationAddress"
      >
        <b-row>
          <b-col
            v-if="vouchers"
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              {{ $t('Vouchers') }}
            </h5>
            <small class="text-muted">{{ $t('Choose your vouchers.') }}</small>
            <b-card
              class="mb-4"
            >

              <v-select
                v-model="defaultVoucher"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="promotions"
                label="title"
              >
                <template
                  #option="{ title, price }"
                >
                  <span> {{ title }}--{{ price }}</span>
                </template>
              </v-select>
            </b-card>
          </b-col>
          <hr class="parcel-spacing">
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              {{ $t('Address') }}
            </h5>
            <small class="text-muted">{{ $t('Enter Your Address.') }}</small>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <div class="demo-inline-spacing">
                <b-form-radio
                  v-model="isRedeliver"
                  name="is_redeliver"
                  value="true"
                  @change="changeRedeliver"
                >
                  {{ $t('Transit') }}
                </b-form-radio>
                <feather-icon
                  id="T_help"
                  icon="HelpCircleIcon"
                  size="24"
                />
                <b-popover
                  target="T_help"
                  triggers="hover focus"
                  custom-class="wide-popover"
                >
                  {{ $t('Transit Help') }}
                </b-popover>
                <b-form-radio
                  v-model="isRedeliver"
                  name="is_redeliver"
                  value="false"
                  @change="changeRedeliver"
                >
                  {{ $t('Direct Delivery') }}
                </b-form-radio>
                <feather-icon
                  id="DD_help"
                  icon="HelpCircleIcon"
                  size="24"
                />
                <b-popover
                  target="DD_help"
                  triggers="hover focus"
                  custom-class="wide-popover"
                >
                  {{ $t('Direct Delivery Help') }}
                </b-popover>

              </div>
              <div v-show="!isRedeliver">
                <hr>
                <b-modal
                  id="shipper_address"
                  ok-only
                  :ok-title="$t('OK')"
                  centered
                  size="xl"
                  :title="$t('Choose the shipper\'s address')"
                  @ok="handleShipperOk"
                >
                  <sender-address-list
                    :is-modal="true"
                    @changeShipperAddress="changeShipper"
                  />
                </b-modal>
                <b-modal
                  id="shipper_address_add2"
                  ok-only
                  :ok-title="$t('OK')"
                  centered
                  size="xl"
                  :title="$t('Add the shipper\'s address')"
                >
                  <address-add
                    :is-modal="true"
                    :is-sender="true"
                    @changeShipperAddress="changeShipper"
                  />
                </b-modal>
                <b-card
                  v-show="defaultSenderAddress"
                  :header="$t('Shipper\'s Address')"
                  :title="defaultSenderAddress && defaultSenderAddress.title"
                  class="mb-4"
                >
                  <b-card-text>
                    {{ defaultSenderAddress && defaultSenderAddress.address }}, {{ defaultSenderAddress && defaultSenderAddress.suburb }}, {{ defaultSenderAddress && defaultSenderAddress.city }} {{ defaultSenderAddress && defaultSenderAddress.postcode }}
                  </b-card-text>
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    v-b-modal.shipper_address
                    variant="outline-primary"
                  >
                    {{ $t('Change') }}
                  </b-button>
                </b-card>
                <b-card
                  v-show="!defaultSenderAddress"
                  :header="$t('Shipper\'s Address')"
                  class="mb-4"
                >
                  <b-card-text>
                    {{ $t('No Shipper Address') }}
                  </b-card-text>
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    v-b-modal.shipper_address_add2
                    variant="outline-primary"
                  >
                    {{ $t('Add Sender Address') }}
                  </b-button>
                </b-card>
              </div>
              <hr>
              <b-card
                v-show="defaultShippingAddress"
                :header="$t('Receiver\'s Address')"
                :title="defaultShippingAddress && defaultShippingAddress.title"
                class="mb-4"
              >
                <b-card-text>
                  {{ defaultShippingAddress && defaultShippingAddress.address }}, {{ defaultShippingAddress && defaultShippingAddress.suburb }}, {{ defaultShippingAddress && defaultShippingAddress.city }} {{ defaultShippingAddress && defaultShippingAddress.postcode }}
                </b-card-text>
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  v-b-modal.shipping_address
                  variant="outline-primary"
                >
                  {{ $t('Change') }}
                </b-button>
                <b-modal
                  id="shipping_address"
                  ok-only
                  :ok-title="$t('OK')"
                  centered
                  size="xl"
                  :title="$t('Choose the receiver\'s address')"
                  @ok="handleShippingOk"
                >
                  <shipping-address-list
                    :is-modal="true"
                    @changeShippingAddress="changeShipping"
                  />
                </b-modal>
              </b-card>
              <b-card
                v-if="!defaultShippingAddress"
                :header="$t('Receiver\'s Address')"
                class="mb-4"
              >
                <b-card-text>
                  {{ $t('No Shipping Address') }}
                </b-card-text>
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  v-b-modal.shipping_address_add2
                  variant="outline-primary"
                >
                  {{ $t('Add Shipping Address') }}
                </b-button>
                <b-modal
                  id="shipping_address_add2"
                  ok-only
                  :ok-title="$t('OK')"
                  centered
                  size="xl"
                  :title="$t('Add the receiver\'s address')"
                >
                  <address-add
                    :is-modal="true"
                    :is-sender="false"
                    @changeShippingAddress="changeShipping"
                  />
                </b-modal>
              </b-card>
              <hr>

              <!-- Note -->
              <b-card :title="$t('Customer Note')">
                <b-form-textarea v-model="order.customer_note" />
              </b-card>
              <!-- Spacer -->
              <hr class="parcel-spacing">
              <b-card :title="$t('Whether to pick up the goods by myself')">
                <!-- checkbox -->
                <b-form-checkbox
                  v-model="order.is_pickup"
                  @change="changePickup"
                >
                  {{ $t('Pick up by Myself') }}
                </b-form-checkbox>
                <div
                  v-for="(item) in pickup_adds"
                  v-show="order.is_pickup"
                  :key="item.id"
                  class="demo-vertical-spacing"
                >
                  <hr class="parcel-spacing">
                  <b-form-radio
                    v-model="order.locate_address_id"
                    name="some-radios"
                    :value="item.id"
                    @change="changeLocateAddress"
                  >
                    {{ item.title }}
                    {{ item.firstname }} {{ item.lastname }} <br>
                    {{ item.tel }}<br>
                    {{ item.address }}, {{ item.suburb }}<br>{{ item.city }}, {{ item.country }} {{ item.postcode }}
                  </b-form-radio>
                </div>
              </b-card>
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- social link -->
      <tab-content
        :title="$t('Services')"
        icon="feather icon-link"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              {{ $t('Services') }}
            </h5>
            <small class="text-muted">{{ $t('Choose Services') }}</small>
          </b-col>
          <b-col md="12">
            <charge-type
              v-if="currentStep===3"
              :key="chargeKey"
              :items="bItems"
              @changeChargeType="changeCType"
            />
          </b-col>
        </b-row>
      </tab-content>
      <template
        slot="footer"
        slot-scope="props"
      >
        <div class="wizard-footer-left">
          <wizard-button
            v-if="props.activeTabIndex > 0"
            :style="props.fillButtonStyle"
            @click.native="props.prevTab()"
          >
            {{ $t('Previous') }}
          </wizard-button>
        </div>
        <div class="wizard-footer-right">
          <wizard-button
            v-if="!props.isLastStep"
            class="wizard-footer-right"
            :style="props.fillButtonStyle"
            @click.native="props.nextTab()"
          >
            {{ $t('Next') }}
          </wizard-button>

          <wizard-button
            v-else
            class="wizard-footer-right finish-button"
            :style="props.fillButtonStyle"
            :disabled="!agree || pressed"
            @click.native="formSubmitted"
          >
            {{ props.isLastStep ? $t('Submit') : $t('Next') }}
          </wizard-button>
        </div>
      </template>
    </form-wizard>

  </div>
</template>

<script>
import { FormWizard, TabContent, WizardButton } from 'vue-form-wizard'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import store from '@/store'
import vSelect from 'vue-select'
import { ref, computed } from '@vue/composition-api'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormRadio,
  BFormCheckbox,
  BCard,
  BCardText,
  BButton,
  BFormTextarea,
  VBPopover,
  BPopover,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { EventBus } from '@/ship2u/utils/global'
import AddressAdd from '@/views/ship2u/address/address-add/AddressAdd.vue'
import CheckParcel from './CheckParcel.vue'
import ChargeType from './ChargeType.vue'
import BriefGroup from './BriefGroup.vue'
import SenderAddressList from '../../address/shipping-list/SenderAddressList.vue'
import ShippingAddressList from '../../address/shipping-list/ShippingAddressList.vue'

export default {
  components: {
    FormWizard,
    TabContent,
    WizardButton,
    BFormRadio,
    BRow,
    BCol,
    BFormGroup,
    BFormCheckbox,
    BCard,
    BCardText,
    BButton,
    BriefGroup,
    BFormTextarea,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    CheckParcel,
    SenderAddressList,
    ShippingAddressList,
    ChargeType,
    vSelect,
    AddressAdd,
    BPopover,
  },
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  data() {
    return {
      pressed: false,
      quote: null,
      briefKey: 0,
      // chargeTypeId: -1,
      // bItems: null,
      chargeKey: 0,
      agree: false,
    }
  },
  computed: {
    pickup_adds() {
      return this.$store.state.ship2u.userProfile.company.pickup_addresses
    },
  },
  created() {
    EventBus.$on('listenAgree', e => {
      this.agree = e
    })
    EventBus.$on('listenOperations', e => {
      this.order.operations = e
    })
  },
  mounted() {
    // console.log(this.currentStep)
  },
  methods: {
    handleShipperOk() {
      this.defaultSenderAddress = null
      store
        .dispatch('ship2u/defaultSenderAddress')
        .then(response => {
          if (response) {
            this.defaultSenderAddress = response
            this.order.sender_address_id = this.defaultSenderAddress.id
          }
        })
    },
    handleShippingOk() {
      this.defaultShippingAddress = null
      store
        .dispatch('ship2u/defaultShippingAddress')
        .then(response => {
          if (response) {
            this.defaultShippingAddress = response
            this.order.receiver_address_id = this.defaultShippingAddress.id
          }
        })
    },
    isLastStep() {
      if (this.$refs.wizard) {
        return this.$refs.wizard.isLastStep
      }
      return false
    },
    validationAddress() {
      let boo = false
      // console.log(this.order.sender_address_id)
      // console.log(this.order.receiver_address_id)
      if (this.order.sender_address_id === -1 || this.order.receiver_address_id === -1) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: this.$i18n.t('Warning'),
            icon: 'BellIcon',
            text: this.$i18n.t('The address information is incorrect.'),
            variant: 'warning',
          },
        }, { position: 'top-center' })
      } else {
        if (this.defaultVoucher) {
          this.order.voucher_id = this.defaultVoucher.id
        }
        this.order.lang = this.$i18n.locale
        if (this.isRedeliver) {
          delete this.order.sender_address_id
        }
        store.dispatch('ship2u/quote', { order: this.order })
          .then(res => {
            this.quote = res
            // console.log(res)
          })
        boo = true
      }
      return boo
    },
    validationParcel() {
      let boo = false
      // console.log(this.order.parcel_ids.length)
      if (this.order.parcel_ids.length === 0) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: this.$i18n.t('Warning'),
            icon: 'BellIcon',
            text: this.$i18n.t('No parcel selected.'),
            variant: 'warning',
          },
        }, { position: 'top-center' })
      } else {
        boo = true
      }
      return boo
    },
    changeParcel(val) {
      this.order.parcel_ids = val
      // console.log(this.order.parcel_ids)
      this.briefKey += 1
    },
    // getBrief(val) {
    //   this.bItems = val
    //   console.log(this.bItems)
    //   this.chargeKey += 1
    // },
    async validationType() {
      let boo = false
      if (this.order.freight_type === '') {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: this.$i18n.t('Warning'),
            icon: 'BellIcon',
            text: this.$i18n.t('No type selected.'),
            variant: 'warning',
          },
        }, { position: 'top-center' })
      } else {
        boo = true
      }
      // console.log(this.currentStep)
      return boo
    },
    formSubmitted() {
      this.pressed = true
      if (this.agree && this.quote) {
        // Object.defineProperty(this.order, 'charge_type', this.quote[this.chargeTypeId].charge_type.id)
        // eslint-disable-next-line prefer-const,prefer-destructuring
        // let order = this.order
        // console.log(this.chargeTypeId)
        this.order.charge_type = this.quote[this.chargeTypeId].charge_type.id
        // console.log(this.order)
        if (this.isRedeliver) {
          delete this.order.sender_address_id
        }
        this.$store.dispatch('ship2u/newOrder', { order: this.order })
          .then(res => {
            console.log(res)
            if (res) {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: this.$i18n.t('Form Submitted'),
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })

              setTimeout(() => {
                this.$router.push({
                  name: 'draft_order',
                })
                this.pressed = false
              }, 3000)
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: this.$i18n.t('Warning'),
                  icon: 'BellIcon',
                  text: this.$i18n.t('Fail.'),
                  variant: 'warning',
                },
              }, { position: 'top-center' })
            }
          })
        // console.log(this.chargeTypeId)
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: this.$i18n.t('Warning'),
            icon: 'BellIcon',
            text: this.$i18n.t('If you cannot agree to the above precautions, we will not be able to generate a new freight order for you.'),
            variant: 'warning',
          },
        }, { position: 'top-center' })
      }
    },
    tabChange(prevIndex, nextIndex) {
      // console.log(`${prevIndex},${nextIndex}`)
      // console.log(this.$refs.wizard.activeTabIndex)
      this.currentStep = nextIndex
    },
  },
  setup() {
    const vouchers = ref(null)
    const promotions = ref([])
    const defaultVoucher = ref(null)
    const isRedeliver = ref(false)
    const defaultSenderAddress = ref(null)
    const defaultShippingAddress = ref(null)
    const order = ref({
      // charge_type: -1,
      lang: 'en-us',
      title: '',
      freight_type: '',
      parcel_ids: [],
      is_pickup: false,
      locate_address_id: 0,
      receiver_address_id: -1,
      sender_address_id: -1,
      operations: [],
      customer_note: '',
    })
    store.dispatch('ship2u/vouchers')
      .then(res => {
        if (res.obj?.length > 0) {
          vouchers.value = res.obj
          res.obj.forEach(o => {
            const v = {}
            v.id = o.id
            v.title = o.promotion.title
            v.price = o.promotion.price_text
            promotions.value.push(v)
          })
          // console.log(promotions.value)
        }
      })
    store
      .dispatch('ship2u/defaultSenderAddress')
      .then(response => {
        if (response) {
          defaultSenderAddress.value = response
          order.value.sender_address_id = defaultSenderAddress.value.id
        }
        // console.log(defaultSenderAddress.value)
      })
    store
      .dispatch('ship2u/defaultShippingAddress')
      .then(response => {
        if (response) {
          defaultShippingAddress.value = response
          order.value.receiver_address_id = defaultShippingAddress.value.id
        // console.log(defaultShippingAddress.value)
        }
      })
    const chargeTypeId = ref(0)
    const currentStep = ref(0)
    const bItems = computed(() => {
      const items = [
        {
          icon: 'ArchiveIcon',
          color: 'light-primary',
          title: '0',
          unit: 'P',
          subtitle: 'Parcels',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'BoxIcon',
          color: 'light-info',
          title: '0',
          unit: 'M3',
          subtitle: 'Volume',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'AnchorIcon',
          color: 'light-danger',
          title: '0',
          unit: 'KG',
          subtitle: 'Weight',
          customClass: 'mb-2 mb-sm-0',
        },
        {
          icon: 'PackageIcon',
          color: 'light-warning',
          title: '0',
          unit: 'KG',
          subtitle: 'Material. Volume',
          customClass: '',
        },
        {
          icon: 'DollarSignIcon',
          color: 'light-success',
          title: '0',
          unit: 'NZD',
          subtitle: 'Price',
          customClass: '',
        },
      ]
      // console.log(currentStep.value)
      const { parcels, quote } = store.state.ship2u
      // console.log(parcels)
      // console.log(props.pids)
      if (parcels) {
        const selectedParcels = parcels.filter(p => order.value.parcel_ids.includes(p.id))

        if (selectedParcels.length > 0) {
          let pieces = 0
          let volume = 0
          let weight = 0
          let price = 0
          selectedParcels.forEach(i => {
            pieces += i.pieces
            volume += i.volume
            weight += i.weight
            price += i.total
          })
          items[0].title = pieces
          items[1].title = volume.toFixed(3)
          items[2].title = weight.toFixed(1)
          let av = (volume / 0.005).toFixed(1)
          if (quote && chargeTypeId.value > -1 && pieces > 0 && currentStep.value === 3) {
            av = quote[chargeTypeId.value].weight.toFixed(1)
          }
          items[3].title = av
          items[4].title = price.toFixed(2)
          // console.log(chargeTypeId.value)

          // console.log(av)
        }

      // emit('briefItems', items.value)
      }
      return items
    })

    function changeCType(ctId) {
      this.chargeTypeId = ctId
      console.log(ctId)
      this.briefKey += 1
    }
    function changeShipper(id) {
      console.log('changeShipper', id)
      store.dispatch('ship2u/fetchAddress', { id, isSender: true })
        .then(response => {
          defaultSenderAddress.value = response
          order.value.sender_address_id = defaultSenderAddress.value.id
          // console.log(order.value.sender_address_id)
        })
    }
    function changeShipping(id) {
      console.log(id)
      store.dispatch('ship2u/fetchAddress', { id, isSender: false })
        .then(response => {
          console.log(`robin: ${response}`)
          defaultShippingAddress.value = response
          order.value.receiver_address_id = defaultShippingAddress.value.id
          // console.log(order.value.receiver_address_id)
        })
    }
    function changePickup() {
      // if (order.value.is_pickup) {
      order.value.locate_address_id = 0
      // }
    }
    function changeLocateAddress(e) {
      console.log(e)
    }
    function changeRedeliver(e) {
      isRedeliver.value = (e === 'true')
      // console.log(typeof isRedeliver.value)
      // console.log(isRedeliver.value)
    }
    return {
      currentStep,
      bItems,
      order,
      defaultSenderAddress,
      defaultShippingAddress,
      changeShipper,
      changeShipping,
      changePickup,
      changeLocateAddress,
      changeRedeliver,
      isRedeliver,
      changeCType,
      chargeTypeId,
      vouchers,
      promotions,
      defaultVoucher,
    }
  },
}
</script>

<template>
  <section class="invoice-preview-wrapper">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="invoiceData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching invoice data
      </h4>
      <div class="alert-body">
        No invoice found with this invoice id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-invoice-list'}"
        >
          Invoice List
        </b-link>
        for other invoices.
      </div>
    </b-alert>

    <b-row
      class="invoice-preview"
    >

      <!-- Col: Left (Invoice Container) -->
      <b-col
        cols="12"
        xl="9"
        md="8"
      >
        <b-card
          no-body
          class="invoice-preview-card"
        >
          <b-card-header class="p-1">
            <b-card-title class="font-medium-2">
              <feather-icon
                icon="FileTextIcon"
                size="18"
              />
              <span class="align-middle ml-50">{{ $t('Invoice Detail') }}</span>
            </b-card-title>
          </b-card-header>
          <div v-if="orderData && orderData.invoices">
            <div
              v-for="invoice in orderData.invoices"
              :key="invoice.id"
            >

              <b-card-actions
                :title="invoice.title"
                action-collapse
                :collapsed="false"
              >
                <b-table-lite
                  responsive
                  :items="invoice.invoicedetail_set"
                  :fields="ItemColumns"
                >
                  <template #cell(title)="data">
                    <b-card-text
                      class="font-weight-bold mb-25"
                    >
                      <a
                        href="javascript:void(0)"
                        class="card-link"
                        @click="$router.push({ name: 'ship2u-parcel-preview', params: { id: data.item.id }})"
                      > {{ data.item.title }} </a>
                    </b-card-text>
                  </template>
                </b-table-lite>

                <!-- Invoice Description: Total -->
                <b-card-body class="invoice-padding pb-0">
                  <b-row>
                    <b-col
                      cols="12"
                      md="6"
                      class="mt-md-0 mt-3"
                      order="2"
                      order-md="1"
                    >
                      <b-card-text class="mb-0">
                        <!-- <span class="font-weight-bold">Salesperson:</span>
                        <span class="ml-75">Alfie Solomons</span> -->
                      </b-card-text>
                    </b-col>
                    <!-- Col: Total -->
                    <b-col
                      cols="12"
                      md="6"
                      class="mt-md-6 d-flex justify-content-end"
                      order="1"
                      order-md="2"
                    >
                      <div
                        class="invoice-total-wrapper"
                      >
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            {{ $t('Subtotal') }}:
                          </p>
                          <p class="invoice-total-amount">
                            {{ invoice.total.toFixed(2) }}
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            {{ $t('GST') }} (15%):
                          </p>
                          <p class="invoice-total-amount">
                            {{ invoice.tax }}
                          </p>
                        </div>
                        <hr class="my-50">
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            {{ $t('Total') }}:
                          </p>
                          <p class="invoice-total-amount">
                            {{ invoice.total.toFixed(2) }}
                          </p>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-card-actions>

            </div>
          </div>

          <!-- Spacer -->
          <hr class="invoice-spacing">

          <b-card-body class="invoice-padding pb-0">

            <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">

              <!-- Header: Left Content -->
              <div>
                <div class="logo-wrapper">
                  <span class="text-primary">
                    {{ $t('Payments Detail') }}
                  </span>
                </div>
              </div>

            </div>
          </b-card-body>

          <b-table-lite
            responsive
            :items="paymentsDescription"
            :fields="PaymentColumns"
          >
            <template #cell(title)="data">
              <b-card-text
                class="font-weight-bold mb-25"
              >
                <a
                  href="javascript:void(0)"
                  class="card-link"
                  @click="$router.push({ name: 'ship2u-parcel-preview', params: { id: data.item.id }})"
                > {{ data.item.title }} </a>
              </b-card-text>
            </template>

            <template #cell(created)="data">
              <span class="text-nowrap">
                {{ $DateFormat(data.item.created) }}
              </span>
            </template>
          </b-table-lite>

          <!-- Invoice Description: Total -->
          <b-card-body class="invoice-padding pb-0">
            <b-row>
              <b-col
                cols="12"
                md="6"
                class="mt-md-0 mt-3"
                order="2"
                order-md="1"
              >
                <b-card-text class="mb-0">
                  <!-- <span class="font-weight-bold">Salesperson:</span>
                  <span class="ml-75">Alfie Solomons</span> -->
                </b-card-text>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- Right Col: Card -->
      <b-col
        cols="12"
        md="4"
        xl="3"
        class="invoice-actions"
      >
        <b-card>

          <!-- Button: DOwnload -->
          <b-button
            v-if="orderData && orderData.invoices.length>0"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            @click="showModal"
          >
            {{ $t('Download') }}
          </b-button>

          <!-- Button: Print -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            @click="printInvoice"
          >
            {{ $t('Print') }}
          </b-button>
        </b-card>
      </b-col>
    </b-row>

    <b-modal
      v-if="orderData && orderData.invoices"
      ref="my-modal"
      centered
      hide-footer
      :title="$t('Download Invoices')"
    >
      <div class="d-block text-center">
        <h3>{{ $t('Please select the invoice you need to download') }}</h3>
      </div>
      <b-button
        v-for="invoice in orderData.invoices"
        :key="invoice.id"
        v-ripple.400="'rgba(186, 191, 199, 0.15)'"
        variant="primary"
        class="mt-2"
        block
        @click="DownloadInvoice(invoice.invoice_file)"
      >
        {{ invoice.title }}
      </b-button>
    </b-modal>

  </section>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import { ref, computed } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import i18n from '@/libs/i18n'
import {
  BCardHeader, BCardTitle, BRow, BCol, BCard, BCardBody, BTableLite, BCardText, BButton, BAlert, BLink, VBToggle,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  components: {
    BCardActions,
    BCardHeader,
    BCardTitle,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BTableLite,
    BCardText,
    BButton,
    BAlert,
    BLink,
  },
  setup() {
    const orderData = ref(null)
    function trans(val) {
      return i18n.t(val)
    }
    function showModal() {
      this.$refs['my-modal'].show()
    }
    function DownloadInvoice(file) {
      console.log(file)
      window.open(file, '_blank', 'width=1000,height=800,menubar=no,toolbar=no,status=no,scrollbars=yes')
    }

    const ItemColumns = computed(() => [
      { key: 'title', label: trans('Item'), sortable: true },
      { key: 'price', label: trans('Price'), sortable: false },
      { key: 'quantity', label: trans('Quantity'), sortable: true },
      { key: 'discount', label: trans('Discount'), sortable: true },
      { key: 'tax', label: trans('Tax'), sortable: true },
      { key: 'subtotal', label: trans('Subtotal'), sortable: true },
    ])

    const PaymentColumns = computed(() => [
      { key: 'total', label: trans('Amount'), sortable: true },
      { key: 'currency', label: trans('Currency'), sortable: false },
      { key: 'variant', label: trans('Variant'), sortable: true },
      { key: 'description', label: trans('Description'), sortable: true },
      { key: 'created', label: trans('Created Time'), sortable: true },
    ])

    // Order Description
    // ? Your real data will contain this information
    const invoiceDescription = computed(() => orderData.value?.invoices[0].invoicedetail_set)
    const paymentsDescription = computed(() => orderData.value?.payments)

    const totalPrice = computed(() => {
      let total = 0
      invoiceDescription.value.forEach(i => {
        total += (parseFloat(i.total) || 0)
      })

      return total.toFixed(2)
    })

    const invoiceData = ref(null)
    const paymentDetails = ref({})

    store.dispatch('ship2u/order', { id: router.currentRoute.params.id })
      .then(response => {
        orderData.value = response
      // invoiceDescription.value = response.orderdetail_set
      })
      .catch(error => {
        if (error.response.status === 404) {
          orderData.value = undefined
        }
      })

    const printInvoice = () => {
      window.print()
    }

    return {
      invoiceData,
      paymentDetails,
      invoiceDescription,
      paymentsDescription,
      printInvoice,
      ItemColumns,
      PaymentColumns,
      totalPrice,
      orderData,
      showModal,
      DownloadInvoice,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
</style>

<style lang="scss">
@media print {

  // Global Styles
  body {
    background-color: transparent !important;
  }
  nav.header-navbar {
    display: none;
  }
  .main-menu {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .content.app-content {
    margin-left: 0;
    padding-top: 2rem !important;
  }
  footer.footer {
    display: none;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }

  // Invoice Specific Styles
  .invoice-preview-wrapper {
    .row.invoice-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .invoice-preview-card {
        .card-body:nth-of-type(2) {
          .row {
              > .col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
            }
          }
        }
      }
    }

    // Action Right Col
    .invoice-actions {
      display: none;
    }
  }
}
</style>

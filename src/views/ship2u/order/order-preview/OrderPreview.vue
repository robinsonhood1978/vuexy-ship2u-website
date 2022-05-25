<template>
  <section class="order-preview-wrapper">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="orderData === undefined"
    >
      <h4 class="alert-heading">
        {{ $t('Error fetching order data') }}
      </h4>
      <div class="alert-body">
        {{ $t('No order found with this order id.') }} {{ $t('Check') }}
        <b-link
          class="alert-link"
          :to="{ name: 'ship2u-order-list'}"
        >
          {{ $t('Order List') }}
        </b-link>
        {{ $t('for other orders.') }}
      </div>
    </b-alert>

    <b-row
      v-if="orderData"
      class="order-preview"
    >

      <!-- Col: Left (Order Container) -->
      <b-col
        cols="12"
        xl="9"
        md="8"
      >
        <b-card
          no-body
          class="order-preview-card"
        >
          <!-- Header -->
          <b-card-body class="order-padding pb-0">

            <div class="d-flex justify-content-between flex-md-row flex-column order-spacing mt-0">

              <!-- Header: Left Content -->
              <div>
                <div class="logo-wrapper">
                  <h3 class="text-primary order-logo">
                    {{ orderData.title }}
                  </h3>
                </div>
                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Date Created') }}:
                  </p>
                  <p class="order-date">
                    {{ $DateFormat(orderData.create_time) }}
                  </p>
                </div>
                <div
                  v-if="orderData.charge_type"
                  class="order-date-wrapper"
                >
                  <p class="order-date-title">
                    {{ $t('Charge Type') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.charge_type.title_en_us }}
                  </p>
                </div>

                <div
                  v-if="orderData.state"
                  class="order-date-wrapper"
                >
                  <p class="order-date-title">
                    {{ $t('state') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.state }}
                  </p>
                </div>

                <div
                  v-if="orderData.freight && orderData.freight.title"
                  class="order-date-wrapper"
                >
                  <p class="order-date-title">
                    {{ $t('Freight NO.') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.freight.title }}
                  </p>
                </div>

                <div
                  v-if="orderData.tracking_number"
                  class="order-date-wrapper"
                >
                  <p class="order-date-title">
                    {{ $t('Tracking Number') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.tracking_number }}
                  </p>
                </div>

                <div
                  v-for="(item, index) in orderData.operations"
                  :key="index"
                  class="order-date-wrapper"
                >
                  <p class="order-date-title">
                    {{ item.type.title }}:
                  </p>
                  <p class="order-date">
                    NZD ${{ item.amount }}
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Transportation Costs') }}:
                  </p>
                  <p class="order-date">
                    NZD ${{ orderData.shipping_cost }} (Including Delivery Fee: NZD ${{ orderData.dest_shipping_cost.toFixed(2) }})
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Overall Price') }}:
                  </p>
                  <p class="order-date">
                    NZD ${{ orderData.total }}
                  </p>
                </div>

                <div
                  v-if="orderData.locate_address"
                  class="order-date-wrapper"
                >
                  <p class="order-date-title">
                    {{ $t('Self Pickup Address') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.locate_address.title }}<br>
                    {{ orderData.locate_address.firstname }} {{ orderData.locate_address.lastname }} <br>
                    {{ orderData.locate_address.tel }}<br>
                    {{ orderData.locate_address.address }}, {{ orderData.locate_address.suburb }}<br>{{ orderData.locate_address.city }}, {{ orderData.locate_address.country }} {{ orderData.locate_address.postcode }}
                  </p>
                </div>

              </div>

              <!-- Header: Right Content -->
              <div class="mt-md-0 mt-2">
                <h4 class="order-title">
                  {{ $t('Order') }}
                  <span class="order-number">#{{ orderData.id }}</span>
                </h4>
              </div>
            </div>
          </b-card-body>

          <hr
            v-if="orderData.tracking_info.length>0"
            class="order-spacing"
          >
          <timeline :order="orderData" />

          <!-- Spacer -->
          <hr class="order-spacing">

          <!-- Note -->
          <b-card-body class="order-padding pb-0">

            <div class="d-flex justify-content-between flex-md-row flex-column order-spacing mt-0">

              <!-- Header: Left Content -->
              <div>
                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Number of Items') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.pieces }} {{ $t('Pieces') }}
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Declared value') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.price }}
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Volume') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.volume.toFixed(3) }} M3
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Weight') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.net_weight }} KG
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Material Volume') }}:
                  </p>
                  <p class="order-date">
                    {{ $VolWeightFlight(orderData.volume) }} KG
                  </p>
                </div>

                <div class="order-date-wrapper">
                  <p class="order-date-title">
                    {{ $t('Chargeable Weight') }}:
                  </p>
                  <p class="order-date">
                    {{ orderData.weight.toFixed(2) }} KG
                  </p>
                </div>
              </div>

            </div>
          </b-card-body>

          <!-- Spacer -->
          <hr
            v-if="orderData.dest_address || orderData.source_address || orderData.billing_address || orderData.clearance_address"
            class="order-spacing"
          >

          <!-- Sender Address -->
          <b-card-actions
            v-if="orderData.dest_address || orderData.source_address || orderData.billing_address || orderData.clearance_address"
            :title="$t('Address Detail')"
            action-collapse
            :collapsed="true"
          >
            <b-card
              v-if="orderData.dest_address"
              :title="$t('Receiver\'s Address')"
            >
              <b-col cols="12">
                <b-card>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('Address Description') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.dest_address.title }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('First Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.dest_address.firstname }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('Last Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.dest_address.lastname }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Contact Number') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.dest_address.tel }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Street No.') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.dest_address.address }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Suburb') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.dest_address.suburb }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('City') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.dest_address.city }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Country') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.dest_address.country }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Postcode') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.dest_address.postcode }}
                    </dd>
                  </dl>
                  <dl
                    v-if="!orderData.dest_address.is_sender && orderData.dest_address.business_name"
                    class="row"
                  >
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Business Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.dest_address.business_name }}
                    </dd>
                  </dl>
                  <dl
                    v-if="!orderData.dest_address.is_sender && orderData.dest_address.custom_code"
                    class="row"
                  >
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Custom Code') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.dest_address.custom_code }}
                    </dd>
                  </dl>
                </b-card>
              </b-col>
            </b-card>

            <b-card
              v-if="orderData.source_address"
              :title="$t('Shipper\'s Address')"
            >
              <b-col cols="12">
                <b-card>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('Address Description') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.source_address.title }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('First Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.source_address.firstname }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('Last Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.source_address.lastname }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Contact Number') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.source_address.tel }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Street No.') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.source_address.address }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Suburb') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.source_address.suburb }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('City') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.source_address.city }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Country') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.source_address.country }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Postcode') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.source_address.postcode }}
                    </dd>
                  </dl>
                  <dl
                    v-if="!orderData.source_address.is_sender && orderData.source_address.business_name"
                    class="row"
                  >
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Business Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.source_address.business_name }}
                    </dd>
                  </dl>
                  <dl
                    v-if="!orderData.source_address.is_sender && orderData.source_address.custom_code"
                    class="row"
                  >
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Custom Code') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.source_address.custom_code }}
                    </dd>
                  </dl>
                </b-card>
              </b-col>
            </b-card>

            <b-card
              v-if="orderData.billing_address"
              :title="$t('Billing Address')"
            >
              <b-col cols="12">
                <b-card>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('Address Description') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.billing_address.title }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('First Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.billing_address.firstname }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('Last Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.billing_address.lastname }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Contact Number') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.billing_address.tel }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Street No.') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.billing_address.address }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Suburb') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.billing_address.suburb }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('City') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.billing_address.city }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Country') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.billing_address.country }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Postcode') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.billing_address.postcode }}
                    </dd>
                  </dl>
                  <dl
                    v-if="!orderData.billing_address.is_sender && orderData.billing_address.business_name"
                    class="row"
                  >
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Business Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.billing_address.business_name }}
                    </dd>
                  </dl>
                  <dl
                    v-if="!orderData.billing_address.is_sender && orderData.billing_address.custom_code"
                    class="row"
                  >
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Custom Code') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.billing_address.custom_code }}
                    </dd>
                  </dl>
                </b-card>
              </b-col>
            </b-card>

            <b-card
              v-if="orderData.clearance_address"
              :title="$t('Clearance Address')"
            >
              <b-col cols="12">
                <b-card>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('Address Description') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.clearance_address.title }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('First Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.clearance_address.firstname }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('Last Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.clearance_address.lastname }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Contact Number') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.clearance_address.tel }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Street No.') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.clearance_address.address }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Suburb') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.clearance_address.suburb }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('City') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.clearance_address.city }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Country') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.clearance_address.country }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Postcode') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.clearance_address.postcode }}
                    </dd>
                  </dl>
                  <dl
                    v-if="!orderData.clearance_address.is_sender && orderData.clearance_address.business_name"
                    class="row"
                  >
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Business Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.clearance_address.business_name }}
                    </dd>
                  </dl>
                  <dl
                    v-if="!orderData.clearance_address.is_sender && orderData.clearance_address.custom_code"
                    class="row"
                  >
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Custom Code') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.clearance_address.custom_code }}
                    </dd>
                  </dl>
                </b-card>
              </b-col>
            </b-card>
          </b-card-actions>
          <b-card-actions
            v-if="orderData.locate_address"
            :title="$t('Pick up by Myself')"
            action-collapse
            :collapsed="true"
          >
            <b-card
              v-if="orderData.locate_address"
              :title="$t('Self Pickup Address')"
            >
              <b-col cols="12">
                <b-card>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('Address Description') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.locate_address.title }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('First Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.locate_address.firstname }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right">
                      {{ $t('Last Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.locate_address.lastname }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Contact Number') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.locate_address.tel }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Street No.') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.locate_address.address }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Suburb') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.locate_address.suburb }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('City') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.locate_address.city }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Country') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.locate_address.country }}
                    </dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Postcode') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.locate_address.postcode }}
                    </dd>
                  </dl>
                  <dl
                    v-if="!orderData.locate_address.is_sender && orderData.locate_address.business_name"
                    class="row"
                  >
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Business Name') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.locate_address.business_name }}
                    </dd>
                  </dl>
                  <dl
                    v-if="!orderData.locate_address.is_sender && orderData.locate_address.custom_code"
                    class="row"
                  >
                    <dt class="col-sm-4 text-right text-truncate">
                      {{ $t('Custom Code') }}:
                    </dt>
                    <dd class="col-sm-8">
                      {{ orderData.locate_address.custom_code }}
                    </dd>
                  </dl>
                </b-card>
              </b-col>
            </b-card>
          </b-card-actions>
          <!-- Spacer -->
          <hr class="order-spacing">

          <!-- Order Description: Table -->
          <b-table-lite
            responsive
            :items="orderDescription"
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

          <!-- Order Description: Total -->
          <b-card-body class="order-padding pb-0">
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
                <div class="order-total-wrapper">
                  <hr class="my-50">
                  <div class="order-total-item">
                    <p class="order-total-title">
                      {{ $t('Total') }}:
                    </p>
                    <p class="order-total-amount">
                      {{ totalPrice }}
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-body>

          <!-- Spacer -->
          <hr class="order-spacing">

          <!-- Note -->
          <b-card-body class="order-padding pt-0">
            <span class="font-weight-bold">{{ $t('Customer Note') }}: </span>
            <span>{{ orderData.customer_note }}</span>
          </b-card-body>

        </b-card>
      </b-col>

      <!-- Right Col: Card -->
      <b-col
        cols="12"
        md="4"
        xl="3"
        class="order-actions"
      >
        <b-card>
          <b-button
            v-if="!orderData.paid && orderData.ready_to_pay"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            @click="showModal"
          >
            {{ $t('Pay') }}
          </b-button>

          <b-button
            v-if="orderData.invoices.length>0"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            @click="$router.push({ name: 'ship2u-invoice-preview', params: { id: orderData.id }})"
          >
            {{ $t('Invoice') }}
          </b-button>

          <b-button
            v-if="orderData.customer_certificate"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            @click="download(orderData.customer_certificate.path)"
          >
            {{ $t('Customer Certificate') }}
          </b-button>

          <b-button
            v-if="orderData.bacc_file"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            @click="download(orderData.bacc_file.path)"
          >
            {{ $t('BACC File') }}
          </b-button>
          <!-- Button: Print -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            @click="printOrder"
          >
            {{ $t('Print') }}
          </b-button>

          <!-- Button: Add Payment -->
          <b-button
            v-b-toggle.sidebar-order-add-payment
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mb-75"
            block
            @click="$router.go(-1)"
          >
            {{ $t('Back') }}
          </b-button>
        </b-card>
      </b-col>
    </b-row>

    <!-- modal -->
    <b-modal
      ref="my-modal"
      centered
      hide-footer
      :title="$t('Online payments')"
    >
      <div class="d-block text-center">
        <h3>{{ $t('Please select the payment method') }}</h3>
      </div>
      <b-button
        v-ripple.400="'rgba(186, 191, 199, 0.15)'"
        variant="primary"
        class="mt-2"
        block
        @click="CreditPay"
      >
        Credit Card
      </b-button>
      <b-button
        v-ripple.400="'rgba(186, 191, 199, 0.15)'"
        variant="primary"
        class="mt-2"
        block
        @click="Polipay"
      >
        Polipay
      </b-button>
      <b-button
        v-ripple.400="'rgba(186, 191, 199, 0.15)'"
        variant="primary"
        class="mt-2"
        block
        @click="Alipay"
      >
        Alipay
      </b-button>
    </b-modal>

  </section>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ref, computed } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import i18n from '@/libs/i18n'
import {
  BRow, BCol, BCard, BCardBody, BTableLite, BCardText, BButton, BAlert, BLink, VBToggle,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { $themeConfig } from '@themeConfig'
import Timeline from '../Timeline.vue'
// import orderStoreModule from '../orderStoreModule'

export default {
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  components: {
    BCardActions,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BTableLite,
    BCardText,
    BButton,
    BAlert,
    BLink,
    Timeline,
  },
  methods: {
    download(file) {
      // console.log(file)
      const url = store.state.ship2u.apiHost + file.substring(4)
      // console.log(url)
      // const aaa = 'http://127.0.0.1:8098/static/packgo/wx/helpProcess.jpg'
      window.open(url)
    },
  },
  setup() {
    const orderData = ref(null)
    const paymentDetails = ref({})
    // App Name
    const { appName, appLogoImage } = $themeConfig.app

    function trans(val) {
      return i18n.t(val)
    }

    const ItemColumns = computed(() => [
      { key: 'title', label: trans('Item Name'), sortable: true },
      { key: 'local_courier_number', label: trans('Local Courier Number'), sortable: false },
      // { key: 'orderStatus', sortable: true },
      { key: 'pieces', label: trans('Pieces'), sortable: true },
      { key: 'volumn', label: trans('Volume'), sortable: true },
      { key: 'weight', label: trans('Weight'), sortable: true },
      { key: 'total', label: trans('Total Price'), sortable: true },
    ])

    // Order Description
    // ? Your real data will contain this information
    const orderDescription = computed(() => orderData.value.parcels)

    const totalPrice = computed(() => {
      let total = 0
      orderDescription.value.forEach(i => {
        total += (parseFloat(i.total) || 0)
      })

      return total.toFixed(2)
    })

    // const INVOICE_APP_STORE_MODULE_NAME = 'ship2u-orders'

    // // Register module
    // if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, orderStoreModule)

    // // UnRegister on leave
    // onUnmounted(() => {
    //   if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    // })
    // console.log(typeof router.currentRoute.params.id)
    store.dispatch('ship2u/order', { id: router.currentRoute.params.id })
      .then(response => {
        orderData.value = response
      // orderDescription.value = response.orderdetail_set
      })
      .catch(error => {
        if (error.response.status === 404) {
          orderData.value = undefined
        }
      })

    const printOrder = () => {
      window.print()

      // store.dispatch('ship2u/ifOrderPaid', { id: router.currentRoute.params.id }).then(res => {
      //   console.log('robin:', res)
      // })
    }
    function showModal() {
      this.$refs['my-modal'].show()
    }
    function CreditPay() {
      this.$refs['my-modal'].hide()
      // eslint-disable-next-line no-template-curly-in-string
      // const url = `https://packgo.test.yun.co.nz/pack/pay/request/?key=${orderData.value.key}&type=alipay`
      const url = store.getters['ship2u/creditpayUrl'](orderData.value.key)
      console.log(url)
      window.open(url, '_blank', 'width=1000,height=800,menubar=no,toolbar=no,status=no,scrollbars=yes')
      this.$bvModal
        .msgBoxConfirm(this.$i18n.t('Please confirm whether you have successfully paid.'), {
          title: this.$i18n.t('Please Confirm'),
          // size: 'lg',
          okVariant: 'primary',
          okTitle: this.$i18n.t('I have successfully paid'),
          cancelTitle: this.$i18n.t('Problem with payment'),
          cancelVariant: 'outline-secondary',
          hideHeaderClose: false,
          centered: true,
        })
        .then(value => {
          console.log(value)
          if (value) {
            store.dispatch('ship2u/ifOrderPaid', { id: router.currentRoute.params.id }).then(res => {
              const paid = res
              console.log(paid)
              if (paid) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: this.$i18n.t('Congratulations'),
                    icon: 'EditIcon',
                    text: this.$i18n.t('You have successfully paid.'),
                    variant: 'success',
                  },
                })
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: this.$i18n.t('Unpaid order'),
                    icon: 'EditIcon',
                    text: this.$i18n.t('Your order has not been paid.'),
                    variant: 'warning',
                  },
                })
              }
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: this.$i18n.t('Operation terminated'),
                icon: 'EditIcon',
                text: this.$i18n.t('If you can not pay now due to network issues, you can try again later.'),
                variant: 'warning',
              },
            })
          }
        })
    }
    function Alipay() {
      this.$refs['my-modal'].hide()
      // eslint-disable-next-line no-template-curly-in-string
      // const url = `https://packgo.test.yun.co.nz/pack/pay/request/?key=${orderData.value.key}&type=alipay`
      const url = store.getters['ship2u/alipayUrl'](orderData.value.key)
      console.log(url)
      window.open(url, '_blank', 'width=1000,height=800,menubar=no,toolbar=no,status=no,scrollbars=yes')
      this.$bvModal
        .msgBoxConfirm(this.$i18n.t('Please confirm whether you have successfully paid.'), {
          title: this.$i18n.t('Please Confirm'),
          // size: 'lg',
          okVariant: 'primary',
          okTitle: this.$i18n.t('I have successfully paid'),
          cancelTitle: this.$i18n.t('Problem with payment'),
          cancelVariant: 'outline-secondary',
          hideHeaderClose: false,
          centered: true,
        })
        .then(value => {
          console.log(value)
          if (value) {
            store.dispatch('ship2u/ifOrderPaid', { id: router.currentRoute.params.id }).then(res => {
              const paid = res
              console.log(paid)
              if (paid) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: this.$i18n.t('Congratulations'),
                    icon: 'EditIcon',
                    text: this.$i18n.t('You have successfully paid.'),
                    variant: 'success',
                  },
                })
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: this.$i18n.t('Unpaid order'),
                    icon: 'EditIcon',
                    text: this.$i18n.t('Your order has not been paid.'),
                    variant: 'warning',
                  },
                })
              }
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: this.$i18n.t('Operation terminated'),
                icon: 'EditIcon',
                text: this.$i18n.t('If you can not pay now due to network issues, you can try again later.'),
                variant: 'warning',
              },
            })
          }
        })
    }
    function Polipay() {
      this.$refs['my-modal'].hide()
      // console.log(orderData.value)
      store.dispatch('ship2u/pay', { id: router.currentRoute.params.id, type: 'polipay' })
        .then(response => {
          const { obj } = response
          console.log(obj)
          if (obj.code === 0) {
            console.log(obj.object)
            window.open(obj.object, '_blank', 'width=1000,height=800,menubar=no,toolbar=no,status=no,scrollbars=yes')
            this.$bvModal
              .msgBoxConfirm(this.$i18n.t('Please confirm whether you have successfully paid.'), {
                title: this.$i18n.t('Please Confirm'),
                // size: 'lg',
                okVariant: 'primary',
                okTitle: this.$i18n.t('I have successfully paid'),
                cancelTitle: this.$i18n.t('Problem with payment'),
                cancelVariant: 'outline-secondary',
                hideHeaderClose: false,
                centered: true,
              })
              .then(value => {
                console.log(value)
                if (value) {
                  store.dispatch('ship2u/ifOrderPaid', { id: router.currentRoute.params.id }).then(res => {
                    const paid = res
                    console.log(paid)
                    if (paid) {
                      this.$toast({
                        component: ToastificationContent,
                        props: {
                          title: this.$i18n.t('Congratulations'),
                          icon: 'EditIcon',
                          text: this.$i18n.t('You have successfully paid.'),
                          variant: 'success',
                        },
                      })
                    } else {
                      this.$toast({
                        component: ToastificationContent,
                        props: {
                          title: this.$i18n.t('Unpaid order'),
                          icon: 'EditIcon',
                          text: this.$i18n.t('Your order has not been paid.'),
                          variant: 'warning',
                        },
                      })
                    }
                  })
                } else {
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: this.$i18n.t('Operation terminated'),
                      icon: 'EditIcon',
                      text: this.$i18n.t('If you can not pay now due to network issues, you can try again later.'),
                      variant: 'warning',
                    },
                  })
                }
              })
          }
        })
    }

    return {
      orderData,
      paymentDetails,
      orderDescription,
      printOrder,
      // App Name
      appName,
      appLogoImage,
      ItemColumns,
      totalPrice,
      Polipay,
      Alipay,
      CreditPay,
      showModal,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-order.scss";
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

  // Order Specific Styles
  .order-preview-wrapper {
    .row.order-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .order-preview-card {
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
    .order-actions {
      display: none;
    }
  }
}
</style>

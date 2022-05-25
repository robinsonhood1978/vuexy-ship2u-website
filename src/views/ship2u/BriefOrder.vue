<template>
  <b-card
    :img-src="require('@/assets/images/banner/banner-17.jpg')"
    img-alt="Profile Cover Photo"
    img-top
    class="card-profile"
  >
    <div class="profile-image-wrapper">
      <div class="profile-image p-0">
        <b-avatar
          size="114"
          variant="light"
          :src="require('@/assets/images/banner/banner-39.jpg')"
        />
      </div>
    </div>
    <h3>{{ $t('Freight Orders') }}</h3>
    <h6 class="text-muted">
      {{ $t('Create freight orders') }}
    </h6>
    <b-badge
      class="profile-badge"
      variant="light-primary"
      :to="{ name: 'ship2u-order-add'}"
    >
      {{ $t('Create') }}
    </b-badge>
    <hr class="mb-2">

    <!-- follower projects rank -->
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h6 class="text-muted font-weight-bolder">
          <b-badge
            class="profile-badge"
            variant="light-primary"
            :to="{ name: 'draft_order'}"
          >
            {{ $t('Draft') }}
          </b-badge>
        </h6>
        <h3 class="mb-0">
          <b-badge
            variant="light-success"
            :to="{ name: 'draft_order'}"
          >
            {{ $store.getters['ship2u/orders']({ orderState: 'D' }) }}
          </b-badge>
        </h3>
      </div>
      <div>
        <h6 class="text-muted font-weight-bolder">
          <b-badge
            class="profile-badge"
            variant="light-primary"
            :to="{ name: 'processing_order'}"
          >{{ $t('Processing') }}</b-badge>
        </h6>
        <h3 class="mb-0">
          <b-badge
            variant="light-success"
            :to="{ name: 'processing_order'}"
          >
            {{ $store.getters['ship2u/orders']({ orderState: 'P' }) }}
          </b-badge>
        </h3>
      </div>
      <div>
        <h6 class="text-muted font-weight-bolder">
          <b-badge
            class="profile-badge"
            variant="light-primary"
            :to="{ name: 'transit_order'}"
          >{{ $t('In Transit') }}</b-badge>
        </h6>
        <h3 class="mb-0">
          <b-badge
            variant="light-success"
            :to="{ name: 'transit_order'}"
          >
            {{ $store.getters['ship2u/orders']({ orderState: 'T' }) }}
          </b-badge>
        </h3>
      </div>
    </div>
    <!--/ follower projects rank -->
  </b-card>
</template>

<script>
import { BCard, BAvatar, BBadge } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BBadge,
    BAvatar,
  },
}
</script>

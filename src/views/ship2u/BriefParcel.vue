<template>
  <b-card
    :img-src="require('@/assets/images/banner/banner-13.jpg')"
    img-alt="Profile Cover Photo"
    img-top
    class="card-profile"
  >
    <div class="profile-image-wrapper">
      <div class="profile-image p-0">
        <b-avatar
          size="114"
          variant="light"
          :src="require('@/assets/images/banner/banner-34.jpg')"
        />
      </div>
    </div>
    <h3>{{ $t('Parcels') }}</h3>
    <h6 class="text-muted">
      {{ $t('Parcels list') }}
    </h6>
    <b-badge
      class="profile-badge"
      variant="light-primary"
      :to="{ name: 'ship2u-parcel-add'}"
    >
      {{ $t('Add') }}
    </b-badge>
    <hr class="mb-2">

    <!-- follower projects rank -->
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h6
          class="text-muted font-weight-bolder"
        >
          <b-badge
            class="profile-badge"
            variant="light-primary"
            :to="{ name: 'draft_parcels'}"
          >{{ $t('Draft') }}</b-badge>
        </h6>
        <h3 class="mb-0">
          <b-badge
            variant="light-warning"
            :to="{ name: 'draft_parcels'}"
          >
            {{ $store.getters['ship2u/parcels']({ parcelState: 'D' }) }}
          </b-badge>
        </h3>
      </div>
      <div>
        <h6 class="text-muted font-weight-bolder">
          <b-badge
            class="profile-badge"
            variant="light-primary"
            :to="{ name: 'waiting_parcels'}"
          >
            {{ $t('In warehouse') }}</b-badge>
        </h6>
        <h3 class="mb-0">
          <b-badge
            variant="light-warning"
            :to="{ name: 'waiting_parcels'}"
          >
            {{ $store.getters['ship2u/parcels']({ parcelState: 'P', unsent: 1 }) }}
          </b-badge>
        </h3>
      </div>
      <div>
        <h6 class="text-muted font-weight-bolder">
          <b-badge
            class="profile-badge"
            variant="light-primary"
            :to="{ name: 'processing_parcels'}"
          >
            {{ $t('Processing') }}
          </b-badge>
        </h6>
        <h3 class="mb-0">
          <b-badge
            variant="light-warning"
            :to="{ name: 'processing_parcels'}"
          >
            {{ $store.getters['ship2u/parcels']({ parcelState: 'P', unsent: 0 }) }}
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

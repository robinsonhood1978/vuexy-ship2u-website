<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      {{ $t('COPYRIGHT') }}  © {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href="/"
        target="_blank"
      >Ship2u</b-link>
      <span class="d-none d-sm-inline-block">, {{ $t('All rights Reserved') }}</span>
    </span>

  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>

<template>
  <b-card
    v-if="images.length>0"
    title="Parcel Images"
  >
    <swiper
      class="swiper-responsive-breakpoints"
      :options="swiperOptions"
      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
    >
      <swiper-slide
        v-for="(data,index) in images"
        :key="index"
      >
        <b-img
          :id="`image_${index}`"
          :src="data.thumb"
          fluid
        />
        <b-popover
          :target="`image_${index}`"
          triggers="hover focus"
          custom-class="wide-popover"
        >
          <b-img
            :id="`image_${index}`"
            :src="data.url"
            fluid-grow
          />
        </b-popover>
      </swiper-slide>

      <div
        slot="pagination"
        class="swiper-pagination"
      />
    </swiper>
  </b-card>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import {
  BCard, BImg, VBPopover, BPopover,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    BCard,
    BImg,
    BPopover,
  },
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  props: {
    images: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {

      /* eslint-disable global-require */
      // swiperData: [
      //   { img: require('@/assets/images/banner/banner-30.jpg') },
      //   { img: require('@/assets/images/banner/banner-31.jpg') },
      // ],
      /* eslint-disable global-require */

      swiperOptions: {
        slidesPerView: 5,
        spaceBetween: 50,
        pagination: {
          // el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
    }
  },
}
</script>
<style lang="scss">
.wide-popover { max-width: 100%; }
</style>

<template>
  <b-card
    v-if="order.tracking_info.length>0"
    :title="$t('Processing progress')"
  >
    <app-timeline>
      <app-timeline-item
        v-for="(item,index) in order.tracking_info"
        :key="index"
        :title="item.event"
        :time="$DateFormat(item.create_time)"
      />
      <app-timeline-item
        v-if="order.freight && order.freight.eta_time"
        :title="$t('Expected delivery')"
        :time="$DateFormat(order.freight.eta_time)"
        variant="success"
      />

    </app-timeline>
  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'

export default {
  components: {
    BCard,
    AppTimeline,
    AppTimelineItem,
  },
  props: {
    order: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      color: ['primary', 'warning', 'danger', 'info', 'secondary', 'success'],
    }
  },
}
</script>

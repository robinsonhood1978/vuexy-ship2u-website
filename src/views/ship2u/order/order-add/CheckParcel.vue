<template>
  <b-card
    no-body
    class="business-card"
  >

    <b-card-header
      v-if="parcelsList.length>0"
      class="p-1"
    >
      <b-card-title class="font-medium-2">
        <b-form-checkbox
          v-model="allSelected"
          @change="toggleAll"
        >
          {{ allSelected ? $t('Un-select All') : $t('Select All') }}
        </b-form-checkbox>
      </b-card-title>
    </b-card-header>
    <b-card-body>
      <b-card
        v-if="parcelsList.length==0"
        border-variant="warning"
        bg-variant="transparent"
        class="shadow-none"
      >
        <b-card-text>
          {{ $t('No parcels available.') }}
        </b-card-text>
      </b-card>
      <div class="business-items">
        <b-form-checkbox-group
          id="checkbox-group"
          v-model="selected"
          name="flavour"
        >
          <div
            v-for="Item in parcelsList"
            :key="Item.id"
            class="business-item"
          >
            <b-row>
              <b-col>
                <b-form-checkbox
                  :value="Item.id"
                  checked="false"
                  @change="changeCheck"
                >
                  {{ Item.title }}
                </b-form-checkbox>
              </b-col>
              <b-col>
                {{ Item.weight.toFixed(2) }} KG
              </b-col>
              <b-col>

                <b-button variant="light">
                  {{ $t('Value of Goods') }}
                  <b-badge variant="primary">
                    $ {{ Item.total }}
                  </b-badge>
                </b-button>
              </b-col>
            </b-row>
          </div>
        </b-form-checkbox-group>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BFormCheckbox, BBadge, BRow, BCol, BButton, BFormCheckboxGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { ref } from '@vue/composition-api'
import store from '@/store'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BRow,
    BFormCheckboxGroup,
    BButton,
    BCol,
    BBadge,
    BCardBody,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      allSelected: false,
      selected: [],
    }
  },
  methods: {
    toggleAll(checked) {
      this.selected = checked ? this.allParcelIds : []
      this.changeCheck()
    },
  },
  setup() {
    const parcelsList = ref([])
    const allParcelIds = ref([])
    function changeCheck() {
      // console.log(e.toString())
      // console.log(this.selected.toString())
      this.$emit('changeOrderParcels', this.selected)
    }
    store
      .dispatch('ship2u/refreshParcels', {
        state: 'P',
        filed: 1,
        unsent: 1,
        count: 0,
      })
      .then(parcels => {
        parcelsList.value = parcels
        parcels.forEach(i => {
          allParcelIds.value.push(i.id)
        })
        // console.log(allParcelIds.value)
      })
    return {
      parcelsList,
      changeCheck,
      allParcelIds,
    }
  },
}
</script>

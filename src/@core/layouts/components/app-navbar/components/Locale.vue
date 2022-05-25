<template>
  <b-nav-item-dropdown
    id="dropdown-grouped"
    variant="link"
    class="dropdown-language"
    right
  >
    <template #button-content>
      <b-img
        :src="currentLocale.img"
        height="14px"
        width="22px"
        :alt="currentLocale.locale"
      />
      <span class="ml-50 text-body">{{ currentLocale.name }}</span>
    </template>
    <b-dropdown-item
      v-for="localeObj in locales"
      :key="localeObj.locale"
      @click="ChangeLanguage(localeObj)"
    >
      <b-img
        :src="localeObj.img"
        height="14px"
        width="22px"
        :alt="localeObj.locale"
      />
      <span class="ml-50">{{ localeObj.name }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { BNavItemDropdown, BDropdownItem, BImg } from 'bootstrap-vue'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BImg,
  },
  // ! Need to move this computed property to comp function once we get to Vue 3
  computed: {
    currentLocale() {
      if (localStorage.getItem('language')) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.$i18n.locale = localStorage.getItem('language')
      }
      return this.locales.find(l => l.locale === this.$i18n.locale)
    },
  },
  methods: {
    ChangeLanguage(localeObj) {
      console.log('localeObj.locale', localeObj.locale)
      this.$i18n.locale = localeObj.locale
      localStorage.setItem('language', localeObj.locale)
    },
  },
  setup() {
    /* eslint-disable global-require */
    const locales = [
      {
        locale: 'en',
        img: require('@/assets/images/flags/en.png'),
        name: 'English',
      },
      {
        locale: 'ko',
        img: require('@/assets/images/flags/ko.png'),
        name: 'Korean',
      },
      {
        locale: 'zh_CN',
        img: require('@/assets/images/flags/cn.png'),
        name: 'China',
      },
    ]
    /* eslint-disable global-require */

    return {
      locales,
    }
  },
}
</script>

<style>

</style>

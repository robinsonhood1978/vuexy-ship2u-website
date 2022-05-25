<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ userData.fullName || userData.username }}
        </p>
      </div>
      <b-avatar
        size="40"
        :src="userData.avatar"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon
          v-if="!userData.fullName"
          icon="UserIcon"
          size="22"
        />
      </b-avatar>
    </template>

    <b-dropdown-item
      :to="{ name: 'ship2u-personal'}"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="UserIcon"
        class="mr-50"
      />
      <span>{{ $t('Profile') }}</span>
    </b-dropdown-item>

    <b-dropdown-divider />

    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="logout"
    >
      <feather-icon
        size="16"
        icon="LogOutIcon"
        class="mr-50"
      />
      <span>{{ $t('Logout') }}</span>
    </b-dropdown-item></b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  },
  data() {
    return {
      userData: JSON.parse(sessionStorage.getItem('userData')),
      avatarText,
    }
  },
  methods: {
    logout() {
      // Remove userData from sessionStorage
      // ? You just removed token from sessionStorage. If you like, you can also make API call to backend to blacklist used token
      sessionStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      sessionStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from sessionStorage
      sessionStorage.removeItem('userData')

      // Reset ability
      this.$ability.update(initialAbility)
      sessionStorage.clear()

      // Redirect to login page
      this.$router.push({ name: 'auth-login' })
      window.location.reload()
    },
  },
}
</script>

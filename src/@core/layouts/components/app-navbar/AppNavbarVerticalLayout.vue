<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">

      <!-- Bookmarks Container -->
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <locale />
      <span
        v-if="!$store.state.ship2u.active"
        class="ml-50"
      >
        <b-badge
          id="email_verify"
          variant="light-warning"
        >
          {{ $t('Email Address Not Verified') }}
        </b-badge>
        <b-popover
          target="email_verify"
          triggers="hover focus"
          custom-class="wide-popover"
        >
          <b-card
            border-variant="warning"
            bg-variant="transparent"
            class="shadow-none"
          >
            <b-card-text>
              {{ $t('Email Address Not Verified Hint') }}
            </b-card-text>
          </b-card>
        </b-popover>
      </span>
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BBadge, VBPopover, BPopover, BCard, BCardText,
} from 'bootstrap-vue'
// import Bookmarks from './components/Bookmarks.vue'
import Locale from './components/Locale.vue'
import DarkToggler from './components/DarkToggler.vue'
// import NotificationDropdown from './components/NotificationDropdown.vue'
import UserDropdown from './components/UserDropdown.vue'

export default {
  components: {
    BLink,
    BBadge,
    // Navbar Components
    BNavbarNav,
    // Bookmarks,
    Locale,
    DarkToggler,
    // NotificationDropdown,
    UserDropdown,
    BPopover,
    BCard,
    BCardText,
  },
  directives: {
    'b-popover': VBPopover,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
